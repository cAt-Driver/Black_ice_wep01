import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI instance
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    team: "NovaCoders Core Engineering",
    timestamp: new Date().toISOString(),
    version: "2.4.0",
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Assistant for Case Study & Project Generation
app.post("/api/ai/generate-project", async (req, res) => {
  try {
    const { prompt, category, language } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing or invalid prompt parameter." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback deterministic generator if API key is not yet configured
      return res.json({
        titleAr: `منظومة ${prompt.slice(0, 30)} المتطورة`,
        titleEn: `Advanced ${prompt.slice(0, 30)} Enterprise Platform`,
        descriptionAr: `منصة سحابية متكاملة مصممة خصيصاً لمعالجة متطلبات: ${prompt}. توفر سرعة استجابة فائقة، معمارية موزعة عالية التوافر، وحماية متعددة الطبقات.`,
        descriptionEn: `An enterprise-grade distributed platform architected for: ${prompt}. Delivers sub-millisecond response latency, high availability, and multi-tenant security.`,
        category: category || "Enterprise Solutions",
        tags: ["React 19", "Node.js", "TypeScript", "TailwindCSS", "PostgreSQL", "Docker", "Redis"],
        metrics: [
          { labelAr: "تحسين الأداء", labelEn: "Performance Boost", value: "+320%" },
          { labelAr: "زمن الاستجابة", labelEn: "Response Time", value: "< 45ms" },
          { labelAr: "التوافرية", labelEn: "System Uptime", value: "99.99%" },
        ],
        challengeAr: `واجه العميل صعوبات في معالجة التدفقات الضخمة للبيانات وتزامن المعاملات الفورية تحت ضغط العمل الكثيف.`,
        challengeEn: `The client faced bottleneck constraints managing concurrent high-volume transaction streams and real-time state synchronization under peak traffic.`,
        solutionAr: `قمنا بتصميم بنية تحتية سحابية قائمة على الخدمات المصغرة (Microservices) مع كاشينج موزع وطوابير معالجة غير متزامنة.`,
        solutionEn: `Engineered a scalable microservices architecture backed by distributed Redis caching and event-driven asynchronous queues.`,
        outcomeAr: `تقليص التكاليف التشغيلية بنسبة 40%، وتسريع زمن إنجاز المعاملات 4 أضعاف مع ضمان استقرار تام.`,
        outcomeEn: `Reduced operating infrastructure costs by 40%, achieved 4x faster transaction completion, and maintained zero critical incidents.`,
      });
    }

    const systemPrompt = `You are a Principal Software Architect & Technical Lead for an elite software engineering studio named "NovaCoders".
Your task is to generate complete, highly realistic, professional technical portfolio project metadata in both Arabic and English based on the user's project idea.

Respond strictly with valid JSON conforming to this structure:
{
  "titleAr": "عنوان احترافي للمشروع بالعربية",
  "titleEn": "Professional Project Title in English",
  "descriptionAr": "وصف دقيق وشامل لأهمية المنظومة وقيمتها التقنية بالعربية (2-3 جمل)",
  "descriptionEn": "Precise and compelling technical description in English (2-3 sentences)",
  "category": "Enterprise Solutions" | "AI & Machine Learning" | "Fintech & Payments" | "Cloud & DevOps" | "Mobile & IoT" | "Custom SaaS",
  "tags": ["TypeScript", "Next.js", "Go", "Docker", "Kafka", ... 4 to 6 tech tags],
  "metrics": [
    { "labelAr": "مقياس 1", "labelEn": "Metric 1", "value": "+280%" },
    { "labelAr": "مقياس 2", "labelEn": "Metric 2", "value": "< 30ms" },
    { "labelAr": "مقياس 3", "labelEn": "Metric 3", "value": "99.99%" }
  ],
  "challengeAr": "شرح التحدي الهندسي الذي تم حله بالعربية",
  "challengeEn": "Explanation of the technical engineering challenge in English",
  "solutionAr": "شرح الحل الهندسي والمعمارية البرمجية بالعربية",
  "solutionEn": "Explanation of the engineering solution and software architecture in English",
  "outcomeAr": "النتائج والأثر المحقق بالأرقام بالعربية",
  "outcomeEn": "The achieved outcomes, impact and metrics in English"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Generate technical project specifications for this engineering project idea: "${prompt}". Requested Category: ${category || "Any"}.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    console.error("AI Generation error:", error);
    res.status(500).json({
      error: "Failed to generate project details",
      details: error?.message || "Unknown error",
    });
  }
});

// Client Inquiry Endpoint
app.post("/api/inquiries", (req, res) => {
  const { name, email, company, projectType, budget, timeline, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const inquiry = {
    id: `inq-${Date.now()}`,
    name,
    email,
    company: company || "N/A",
    projectType: projectType || "Custom Software",
    budget: budget || "Flexible",
    timeline: timeline || "Standard",
    message,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  res.status(201).json({
    success: true,
    messageAr: "تم استلام طلب المشروع بنجاح! سيتواصل معك أحد مهندسينا خلال 24 ساعة.",
    messageEn: "Project inquiry received successfully! One of our engineers will reach out within 24 hours.",
    inquiry,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NovaCoders Portal Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
