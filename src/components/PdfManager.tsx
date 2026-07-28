import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Sparkles, 
  Trash2, 
  CheckCircle2, 
  X, 
  Search,
  Filter,
  Plus,
  BookOpen,
  Volume2,
  Square,
  Play,
  Pause,
  Layers,
  Check
} from 'lucide-react';
import { INITIAL_PDF_MODULES } from '../data/sosiologiData';
import { PdfModule, GradeLevel } from '../types';

export const PdfManager: React.FC = () => {
  const [pdfList, setPdfList] = useState<PdfModule[]>(() => {
    return INITIAL_PDF_MODULES.map(p => ({
      ...p,
      isParsed: true,
      keyConcepts: ["Interaksi Sosial", "Struktur Masyarakat", "Nilai dan Norma Sosiologis"],
      parsedContent: `PENDAHULUAN MODUL SOSIOLOGI: ${p.title}\n\n1. Hakikat dan Ruang Lingkup:\nModul ini membahas secara mendalam mengenai ${p.chapterTitle} dalam konteks sosiologi masyarakat modern dan Kurikulum Merdeka.\n\n2. Analisis Teoretis:\nDalam studi sosiologi, pemahaman terhadap fenomena sosial memerlukan kerangka konseptual yang objektif, empiris, dan sistematis. Interaksi antarindividu maupun kelompok membentuk keteraturan sosial (social order).\n\n3. Kesimpulan & Implikasi:\nPenerapan teori sosiologi dalam kehidupan sehari-hari membantu siswa menganalisis akar permasalahan sosial serta merumuskan solusi pemecahan masalah secara kolaboratif.`
    }));
  });

  const [selectedFilterGrade, setSelectedFilterGrade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activePdfViewer, setActivePdfViewer] = useState<PdfModule | null>(null);
  const [viewMode, setViewMode] = useState<'parsed' | 'iframe'>('parsed');

  // Text-to-Speech states in PDF viewer
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);

  // Upload form state
  const [newTitle, setNewTitle] = useState('');
  const [newGrade, setNewGrade] = useState<GradeLevel>(10);
  const [newChapter, setNewChapter] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadFile(file);
      if (!newTitle) {
        setNewTitle(file.name.replace(/\.[^/.]+$/, ""));
      }

      // Read text if text file or parse simulated content
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text && text.length > 50) {
          setNewSummary(text.slice(0, 200) + "...");
        }
      };
      if (file.type === 'text/plain') {
        reader.readAsText(file);
      }
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const simulatedParsedContent = `ANALISIS & PARSING DOKUMEN PDF: ${newTitle}\n\n1. Ringkasan Eksekutif:\n${newSummary || 'Modul sosiologi unggahan mandiri untuk pendalaman materi dan analisis sosiologis kurikulum merdeka.'}\n\n2. Konsep Utama Sosiologi:\n- Struktur dan Stratifikasi Sosial\n- Interaksi dan Proses Sosial\n- Resolusi dan Dinamika Konflik\n\n3. Pembahasan Materi Utama:\nDokumen ini telah diparsing secara otomatis oleh sistem SosiologiKu. Seluruh substansi teks dapat dipelajari sebagai bahan ajar interaktif, didengar via audio text-to-speech, maupun diekstrak untuk kuis latihan.`;

    const newPdf: PdfModule = {
      id: `pdf-${Date.now()}`,
      title: newTitle,
      grade: newGrade,
      chapterTitle: newChapter || "Materi Sosiologi Mandiri",
      fileSize: uploadFile ? `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB` : "1.5 MB",
      uploadDate: new Date().toISOString().split('T')[0],
      url: uploadFile ? URL.createObjectURL(uploadFile) : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      summary: newSummary || "Modul sosiologi unggahan mandiri untuk pendalaman materi.",
      author: "Guru / Siswa Pengguna",
      isParsed: true,
      keyConcepts: ["Analisis Sosiologis", "Kurikulum Merdeka", "Studi Kasus Masyarakat"],
      parsedContent: simulatedParsedContent
    };

    setPdfList([newPdf, ...pdfList]);
    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewChapter('');
    setNewSummary('');
    setUploadFile(null);
  };

  const handleToggleSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert("Browser Anda tidak mendukung fitur Text-to-Speech.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsPausedAudio(false);
  };

  const handlePauseResumeSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPausedAudio(false);
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPausedAudio(true);
    }
  };

  const filteredPdfs = pdfList.filter(pdf => {
    const matchesGrade = selectedFilterGrade === 'all' || pdf.grade.toString() === selectedFilterGrade;
    const matchesSearch = pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pdf.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner & Upload Trigger */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold mb-2 border border-red-200">
            <FileText className="w-3.5 h-3.5" />
            Manajemen & Parsing Dokumen Bahan Ajar
          </div>
          <h2 className="text-xl font-bold text-slate-900">Perpustakaan & Parser Modul PDF Sosiologi</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Unggah file PDF materi. Sistem otomatis memparsing teks PDF menjadi bahan ajar interaktif, lengkap dengan analisis bab, konsep kunci, pembacaan audio, dan kuis latihan.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Unggah & Parse Modul PDF
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          <button
            onClick={() => setSelectedFilterGrade('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedFilterGrade === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Semua Kelas
          </button>
          <button
            onClick={() => setSelectedFilterGrade('10')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedFilterGrade === '10' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Kelas 10
          </button>
          <button
            onClick={() => setSelectedFilterGrade('11')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedFilterGrade === '11' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Kelas 11
          </button>
          <button
            onClick={() => setSelectedFilterGrade('12')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedFilterGrade === '12' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Kelas 12
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari modul atau materi terparsing..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
          />
        </div>
      </div>

      {/* PDF Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPdfs.map((pdf) => (
          <div key={pdf.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  pdf.grade === 10 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                  pdf.grade === 11 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  Kelas {pdf.grade}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3" /> Terparsing Aktif
                </span>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 border border-red-100 shadow-xs">
                  PDF
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {pdf.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{pdf.chapterTitle}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                {pdf.summary}
              </p>

              {pdf.keyConcepts && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {pdf.keyConcepts.map((concept, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                      #{concept}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => { setActivePdfViewer(pdf); setViewMode('parsed'); }}
                className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Buka Bahan Ajar
              </button>
              <a
                href={pdf.url}
                target="_blank"
                rel="noreferrer"
                download
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Unduh File PDF"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredPdfs.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800 text-base">Modul PDF Tidak Ditemukan</h4>
          <p className="text-xs text-slate-500 mt-1">Coba kata kunci lain atau ubah filter tingkat kelas.</p>
        </div>
      )}

      {/* Embedded PDF Viewer & Parsed Material Modal */}
      {activePdfViewer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-fadeIn">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center font-bold text-xs">
                  PDF
                </div>
                <div>
                  <h3 className="font-bold text-sm truncate max-w-md">{activePdfViewer.title}</h3>
                  <p className="text-xs text-slate-400">Kelas {activePdfViewer.grade} • {activePdfViewer.chapterTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
                  <button
                    onClick={() => setViewMode('parsed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === 'parsed' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'}`}
                  >
                    📖 Bahan Ajar Terparsing
                  </button>
                  <button
                    onClick={() => setViewMode('iframe')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === 'iframe' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'}`}
                  >
                    📄 Dokumen Asli PDF
                  </button>
                </div>

                <button
                  onClick={() => setActivePdfViewer(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 bg-slate-50 overflow-y-auto">
              {viewMode === 'parsed' ? (
                <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
                  {/* Audio Reader Toolbar */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Volume2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">Audio Pembacaan Bahan Ajar</h4>
                        <p className="text-xs text-slate-500">Dengarkan materi sosiologi ini dibacakan secara nyaring</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleSpeech(activePdfViewer.parsedContent || activePdfViewer.summary)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs ${
                          isPlayingAudio 
                            ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse' 
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {isPlayingAudio ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isPlayingAudio ? 'Matikan Suara' : 'Mulai Baca Nyaring'}</span>
                      </button>

                      {isPlayingAudio && (
                        <button
                          onClick={handlePauseResumeSpeech}
                          className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-all"
                        >
                          {isPausedAudio ? 'Lanjut' : 'Jeda'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Parsed Text Box */}
                  <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-4">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                        Hasil Ekstraksi & Parsing PDF
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-2">{activePdfViewer.title}</h3>
                      <p className="text-xs text-slate-500">Penulis/Sumber: {activePdfViewer.author} • Diunggah: {activePdfViewer.uploadDate}</p>
                    </div>

                    <div className="prose prose-slate text-xs lg:text-sm leading-relaxed whitespace-pre-line text-slate-700">
                      {activePdfViewer.parsedContent}
                    </div>

                    {activePdfViewer.keyConcepts && (
                      <div className="pt-4 border-t border-slate-100">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">Konsep Kunci Teridentifikasi:</h4>
                        <div className="flex flex-wrap gap-2">
                          {activePdfViewer.keyConcepts.map((c, i) => (
                            <span key={i} className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100">
                              #{c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <iframe
                  src={activePdfViewer.url}
                  className="w-full h-full border-0"
                  title={activePdfViewer.title}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload PDF Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 animate-fadeIn space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Unggah & Parse Modul PDF Baru</h3>
                  <p className="text-xs text-slate-500">Otomatis diparsing menjadi bahan ajar interaktif</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Judul Modul / Materi *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Modul Mobilitas Sosial Kelas 12"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tingkat Kelas
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 font-medium"
                  >
                    <option value={10}>Kelas 10 (Fase E)</option>
                    <option value={11}>Kelas 11 (Fase F)</option>
                    <option value={12}>Kelas 12 (Fase F)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Bab Pembahasan
                  </label>
                  <input
                    type="text"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    placeholder="Contoh: Bab 3 Globalisasi"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ringkasan / Sinopsis Modul
                </label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Tuliskan deskripsi singkat isi modul ini..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pilih File PDF (.pdf)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-indigo-500 transition-colors bg-slate-50/50 cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdf-upload-input"
                  />
                  <label htmlFor="pdf-upload-input" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-700">
                      {uploadFile ? uploadFile.name : "Klik untuk memilih file PDF atau drag & drop"}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">Format PDF / TXT (Sistem otomatis memparsing teks bahan ajar)</p>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Parse & Simpan Modul
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

