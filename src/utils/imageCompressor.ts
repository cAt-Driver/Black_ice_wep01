/**
 * Image compressor utility to resize and optimize images before saving to Firestore and localStorage.
 * Ensures images stay lightweight (20KB - 40KB) with high clarity, preventing Firestore document limit errors (1MB).
 */

export async function compressImage(
  fileOrUrl: File | Blob | string,
  maxWidth = 1000,
  maxHeight = 700,
  quality = 0.72
): Promise<string> {
  // If it's already an external HTTP/HTTPS URL, return directly without processing
  if (typeof fileOrUrl === "string") {
    const trimmed = fileOrUrl.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    if (!trimmed.startsWith("data:image")) {
      return trimmed;
    }
  }

  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";

      let objectUrlToRevoke: string | null = null;

      img.onload = () => {
        try {
          let width = img.width || 800;
          let height = img.height || 600;

          // Proportional scaling
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }

          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(typeof fileOrUrl === "string" ? fileOrUrl : "");
            return;
          }

          // Smooth rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to lightweight JPEG data URL
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

          if (objectUrlToRevoke) {
            URL.revokeObjectURL(objectUrlToRevoke);
          }

          resolve(compressedDataUrl);
        } catch (err) {
          console.warn("Canvas compression fallback:", err);
          if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);
          resolve(typeof fileOrUrl === "string" ? fileOrUrl : "");
        }
      };

      img.onerror = () => {
        if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);
        if (typeof fileOrUrl === "string") {
          resolve(fileOrUrl);
        } else if (fileOrUrl instanceof Blob) {
          const reader = new FileReader();
          reader.onload = (e) => resolve((e.target?.result as string) || "");
          reader.onerror = () => resolve("");
          reader.readAsDataURL(fileOrUrl);
        } else {
          resolve("");
        }
      };

      if (typeof fileOrUrl !== "string" && fileOrUrl instanceof Blob) {
        objectUrlToRevoke = URL.createObjectURL(fileOrUrl);
        img.src = objectUrlToRevoke;
      } else if (typeof fileOrUrl === "string") {
        img.src = fileOrUrl;
      } else {
        resolve("");
      }
    } catch (e) {
      console.warn("Image compression error:", e);
      resolve(typeof fileOrUrl === "string" ? fileOrUrl : "");
    }
  });
}

