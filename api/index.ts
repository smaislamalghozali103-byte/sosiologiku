import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
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
        reply: "Halo! Saya Asisten Sosiologi AI. API Key Gemini belum dikonfigurasi di Vercel Environment Variables (GEMINI_API_KEY), namun Anda tetap dapat menjelajahi seluruh materi Kurikulum Sosiologi Kelas 10, 11, dan 12 serta fitur Kuis dan Modul PDF di aplikasi ini!"
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
    console.error("Gemini Chat Error / Quota Exhausted:", error);
    res.json({
      reply: "Halo! Saat ini kuota API Gemini sedang padat atau mencapai batas maksimal (Quota Exhausted). Namun jangan khawatir, sebagai Guru Sosiologi AI cadangan, saya jelaskan bahwa dalam sosiologi, setiap fenomena interaksi sosial, kelompok sosial, dan stratifikasi dapat dianalisis secara objektif dan empiris. Silakan jelajahi materi dan kuis yang tersedia!"
    });
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
    console.error("Gemini Summarize Error / Quota Exhausted:", error);
    res.json({
      summary: `Ringkasan Materi Sosiologi (${req.body.topic || 'Materi Sosiologi'}):\n\n1. Hakikat & Konsep: Mengkaji hubungan timbal balik antarmanusia dalam kelompok sosial.\n2. Analisis Kritis: Memahami struktur sosial, nilai, norma, serta proses integrasi dan disintegrasi sosial.\n3. Penerapan Kurikulum Merdeka: Studi kasus nyata di masyarakat untuk membangun pemahaman kritis siswa.`
    });
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
    console.error("Gemini Quiz Error / Quota Exhausted:", error);
    res.json({
      questions: [
        {
          question: `Dalam kajian Sosiologi Kelas ${req.body.grade || 10} (${req.body.topic || 'Dinamika Sosial'}), manakah yang merupakan bentuk interaksi sosial asosiatif?`,
          options: ["Pertikaian antarkelompok", "Kerjasama dan akomodasi", "Kompetisi tidak sehat", "Konflik terbuka"],
          correctIndex: 1,
          explanation: "Kerja sama (cooperation), akomodasi, asimilasi, dan akulturasi adalah bentuk interaksi sosial asosiatif yang mengarah pada persatuan."
        },
        {
          question: "Apa tujuan utama dari penerapan norma sosial di dalam masyarakat?",
          options: ["Membatasi kebebasan individu secara mutlak", "Menciptakan keteraturan, ketertiban, dan kedamaian sosial", "Menghapuskan hukum formal di negara", "Memicu konflik antargenerasi"],
          correctIndex: 1,
          explanation: "Norma sosial berfungsi sebagai pedoman bertingkah laku untuk menjaga ketertiban dan keteraturan sosial."
        },
        {
          question: "Perubahan sosial yang terjadi secara cepat dan mendasar pada sendi-sendi pokok kehidupan disebut...",
          options: ["Evolusi sosial", "Revolusi sosial", "Krisis moral", "Asimilasi budaya"],
          correctIndex: 1,
          explanation: "Revolusi adalah perubahan sosial yang berlangsung secara cepat dan menyangkut dasar atau sendi-sendi pokok kehidupan masyarakat."
        }
      ]
    });
  }
});

export default app;
