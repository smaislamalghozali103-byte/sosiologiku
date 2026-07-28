# SosiologiKu - Platform Pembelajaran Sosiologi SMA Islam Al-Ghozali

Aplikasi web interaktif pembelajaran Sosiologi SMA (Kelas X, XI, XII) berbasis Kurikulum Merdeka dengan integrasi AI (Gemini 3.6 Flash), ATP & CP Resmi BSKAP 32/2024, Modul Ajar, Kuis Interaktif, dan Dashboard Guru.

---

## 🚀 Panduan Panduan Integrasi & Deplikasi ke Vercel

Aplikasi ini sudah dikonfigurasi secara mutakhir agar dapat di-deploy ke **Vercel** dengan 1x klik.

### Langkah-langkah Deploy di Vercel:

1. **Push ke GitHub**:
   - Push seluruh kode repository ini ke akun GitHub Anda.

2. **Import ke Vercel**:
   - Buka [dashboard.vercel.com](https://dashboard.vercel.com).
   - Klik **"Add New"** > **"Project"**.
   - Pilih repository GitHub aplikasi ini.

3. **Atur Environment Variables (Opsional untuk AI Gemini)**:
   - Pada bagian **Environment Variables** di Vercel, tambahkan:
     - `GEMINI_API_KEY`: *(Isikan API Key dari Google AI Studio)*

4. **Deploy**:
   - Klik **Deploy**.
   - Vercel akan otomatis mengenali konfigurasi `vercel.json`, membangun frontend Vite, dan mengaktifkan Serverless API (`/api/*`).

---

## 📁 Struktur Konfigurasi Vercel
- `vercel.json` : Konfigurasi routing untuk Frontend SPA Vite & Serverless API Express.
- `/api/index.ts` : Handler Serverless Function Vercel untuk API AI Gemini (`/api/ai-chat`, `/api/ai-summarize`, `/api/ai-quiz`).
- `.env.example` : Panduan environment variable.
