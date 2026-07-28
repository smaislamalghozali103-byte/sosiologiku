import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI client server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "dummy-key",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply: "Halo! Saya Asisten Sosiologi AI. Maaf, API Key Gemini belum dikonfigurasi di Settings > Secrets, namun Anda tetap dapat menjelajahi seluruh materi Kurikulum Sosiologi Kelas 10, 11, dan 12 serta fitur Kuis dan Modul PDF di aplikasi ini!"
        });
      }

      const chat = ai.chats.create({
        model: "gemini-3.6-flash",
        config: {
          systemInstruction: "Anda adalah seorang Guru Sosiologi SMA yang bijak, ramah, dan komunikatif. Berikan penjelasan materi sosiologi (Kelas 10, 11, 12) dengan bahasa yang mudah dipahami, bernas, dan mendidik menggunakan konsep-konsep sosiologis yang tepat (seperti interaksi sosial, stratifikasi, konflik, perubahan sosial, dll.).",
        }
      });

      const response = await chat.sendMessage({ message });
      res.json({ reply: response.text || "Mohon maaf, terjadi kendala saat memproses jawaban." });
    } catch (error: any) {
      console.error("Gemini Chat Error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  app.post("/api/ai-summarize", async (req, res) => {
    try {
      const { topic, content } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          summary: `Ringkasan Materi untuk topik: ${topic || 'Sosiologi'}.\n\n1. Konsep Utama: Mempelajari interaksi sosial dan struktur masyarakat.\n2. Analisis Fungsionalis & Konflik: Melihat dinamika kelompok sosial.\n3. Kesimpulan: Sosiologi membantu memahami realitas sosial secara objektif.`
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Buatlah ringkasan materi sosiologi yang padat, terstruktur, dan mudah dipahami siswa SMA untuk topik berikut:\nTopik: ${topic}\nIsi Materi: ${content || topic}`,
        config: {
          systemInstruction: "Anda adalah kurikulum desainer Sosiologi SMA. Buat ringkasan dalam format poin-poin yang rapi (Konsep Utama, Poin Penting, Studi Kasus Singkat)."
        }
      });

      res.json({ summary: response.text });
    } catch (error: any) {
      console.error("Gemini Summarize Error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  app.post("/api/ai-quiz", async (req, res) => {
    try {
      const { topic, grade } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          questions: [
            {
              question: `Apakah definisi utama dari objek kajian sosiologi untuk ${topic || 'materi sosiologi'}?`,
              options: ["Mempelajari perilaku hewan", "Mempelajari interaksi antarmanusia dalam masyarakat", "Mempelajari cuaca dan iklim", "Mempelajari rumus kimia"],
              correctIndex: 1,
              explanation: "Sosiologi berfokus pada studi tentang masyarakat dan interaksi sosial antarindividu maupun kelompok."
            }
          ]
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Buatlah 3 soal pilihan ganda latihan sosiologi kelas ${grade || '10'} tentang topik: ${topic}. Format JSON dengan array objek berisi: question, options (array 4 string), correctIndex (0-3), explanation.`,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "Anda adalah pembuat soal ujian sosiologi SMA yang profesional. Berikan soal dalam format JSON murni."
        }
      });

      const data = JSON.parse(response.text || "[]");
      res.json({ questions: data });
    } catch (error: any) {
      console.error("Gemini Quiz Error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite middleware setup for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SosiologiKu server running on http://localhost:${PORT}`);
  });
}

startServer();
