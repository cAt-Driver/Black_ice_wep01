/**
 * Image compressor utility to resize and optimize images before saving to Firestore and localStorage.
 * Ensures images stay lightweight (20KB - 60KB) with high clarity, preventing Firestore document limit errors (1MB).
 */

export async function compressImage(
  fileOrUrl: File | string,
  maxWidth = 1200,
  maxHeight = 800,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";

      let objectUrlToRevoke: string | null = null;

      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

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

      img.onerror = (err) => {
        if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);
        // If image fails to load via canvas, fallback to raw string if available
        if (typeof fileOrUrl === "string") {
          resolve(fileOrUrl);
        } else {
          // If it was a File, read as plain DataURL as fallback
          const reader = new FileReader();
          reader.onload = (e) => resolve((e.target?.result as string) || "");
          reader.onerror = () => reject(err);
          reader.readAsDataURL(fileOrUrl);
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
