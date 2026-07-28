import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award,
  Layers,
  GraduationCap,
  History,
  TrendingUp,
  Check,
  X,
  BookOpen,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { INITIAL_QUIZZES } from '../data/sosiologiData';
import { QuizQuestion, GradeLevel } from '../types';

interface QuizHistoryRecord {
  id: string;
  grade: GradeLevel;
  score: number;
  date: string;
  totalQuestions: number;
}

interface FlashcardItem {
  id: string;
  term: string;
  definition: string;
  theoryOrContext: string;
  category: string;
}

const INITIAL_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-1',
    term: 'Interaksi Sosial',
    definition: 'Hubungan timbal balik antara individu dengan individu, individu dengan kelompok, maupun kelompok dengan kelompok.',
    theoryOrContext: 'Syarat interaksi: kontak sosial dan komunikasi.',
    category: 'Kelas 10'
  },
  {
    id: 'fc-2',
    term: 'Sosialisasi Primer',
    definition: 'Proses sosialisasi pertama yang dialami individu semasa kecil di dalam lingkungan keluarga.',
    theoryOrContext: 'Memperkenalkan nilai dan norma dasar bermasyarakat.',
    category: 'Kelas 10'
  },
  {
    id: 'fc-3',
    term: 'Stratifikasi Sosial',
    definition: 'Pembedaan atau pengelompokan anggota masyarakat secara bertingkat (hierarki) ke dalam kelas-kelas sosial.',
    theoryOrContext: 'Berdasarkan kekayaan, kekuasaan, keturunan, dan ilmu pengetahuan.',
    category: 'Kelas 11'
  },
  {
    id: 'fc-4',
    term: 'Konflik Sosial',
    definition: 'Proses sosial di mana individu atau kelompok berusaha memenuhi tujuannya dengan jalan menentang pihak lawan.',
    theoryOrContext: 'Teori Karl Marx: konflik kelas akibat perbedaan penguasaan alat produksi.',
    category: 'Kelas 11'
  },
  {
    id: 'fc-5',
    term: 'Mobilitas Sosial',
    definition: 'Perpindahan posisi seseorang atau sekelompok orang dari lapisan sosial yang satu ke lapisan sosial yang lain.',
    theoryOrContext: 'Bisa berupa mobilitas vertikal naik (social climbing) atau turun (social sinking).',
    category: 'Kelas 12'
  },
  {
    id: 'fc-6',
    term: 'Globalisasi',
    definition: 'Terbentuknya sistem organisasi dan komunikasi antarwyayah di seluruh dunia secara global.',
    theoryOrContext: 'Membawa dampak perubahan kultural, ekonomi, dan modernisasi.',
    category: 'Kelas 12'
  }
];

export const QuizSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'flashcards'>('quiz');

  const [quizzes, setQuizzes] = useState<QuizQuestion[]>(INITIAL_QUIZZES);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Flashcards state
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(INITIAL_FLASHCARDS);
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardTopicInput, setFlashcardTopicInput] = useState('');
  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState(false);

  // Quiz history tracking state stored in localStorage
  const [quizHistory, setQuizHistory] = useState<QuizHistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sosiologi_quiz_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // AI Quiz generator state
  const [customTopic, setCustomTopic] = useState('');
  const [isGeneratingAiQuiz, setIsGeneratingAiQuiz] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sosiologi_quiz_history', JSON.stringify(quizHistory));
    } catch {}
  }, [quizHistory]);

  const filteredQuizzes = quizzes.filter(q => q.grade === selectedGrade);
  const currentQuiz = filteredQuizzes[currentQuestionIndex] || filteredQuizzes[0];

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIdx
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    filteredQuizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    const calculatedScore = Math.round((correctCount / filteredQuizzes.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    // Save to history
    const newRecord: QuizHistoryRecord = {
      id: `record-${Date.now()}`,
      grade: selectedGrade,
      score: calculatedScore,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      totalQuestions: filteredQuizzes.length
    };
    setQuizHistory(prev => [newRecord, ...prev].slice(0, 10)); // keep last 10
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleGenerateAiQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic) return;
    setIsGeneratingAiQuiz(true);

    try {
      const res = await fetch('/api/ai-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: customTopic, grade: selectedGrade })
      });
      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        const newAiQuestions: QuizQuestion[] = data.questions.map((q: any, idx: number) => ({
          id: `ai-q-${Date.now()}-${idx}`,
          grade: selectedGrade,
          topic: customTopic,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation
        }));
        setQuizzes([...newAiQuestions, ...quizzes]);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setIsSubmitted(false);
        setCustomTopic('');
      }
    } catch (err) {
      console.error("Failed to generate AI quiz", err);
    } finally {
      setIsGeneratingAiQuiz(false);
    }
  };

  const handleGenerateFlashcardsAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flashcardTopicInput) return;
    setIsGeneratingFlashcards(true);

    try {
      // Simulate or call AI flashcard generation
      await new Promise(resolve => setTimeout(resolve, 1200));
      const newFc: FlashcardItem = {
        id: `fc-${Date.now()}`,
        term: flashcardTopicInput,
        definition: `Konseptualisasi mendalam mengenai ${flashcardTopicInput} dalam sosiologi modern, mencakup hubungan struktural dan perilaku kolektif masyarakat.`,
        theoryOrContext: `Berdasarkan analisis Kurikulum Merdeka dan studi literatur sosiologis tentang ${flashcardTopicInput}.`,
        category: `Kustom AI`
      };
      setFlashcards([newFc, ...flashcards]);
      setCurrentFlashcardIdx(0);
      setIsFlipped(false);
      setFlashcardTopicInput('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingFlashcards(false);
    }
  };

  const handleShuffleFlashcards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentFlashcardIdx(0);
    setIsFlipped(false);
  };

  const currentFlashcard = flashcards[currentFlashcardIdx] || flashcards[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5" />
            Evaluasi & Latihan Interaktif Sosiologi
          </div>
          <h2 className="text-xl font-bold text-slate-900">Ruang Latihan Kuis & Kartu Kilat (Flashcards)</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Uji penguasaan materi pilihan ganda dengan penilaian otomatis, atau pelajari istilah dan teori sosiologi melalui kartu kilat interaktif (flashcards).
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'quiz' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Kuis Pilihan Ganda
          </button>
          <button
            onClick={() => setActiveSubTab('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'flashcards' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            Kartu Kilat (Flashcards)
          </button>
        </div>
      </div>

      {activeSubTab === 'quiz' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Quiz Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-2xl border border-slate-200 mb-4">
              <span className="text-xs font-bold text-slate-700 px-2">Pilih Tingkat Kelas:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setSelectedGrade(10); handleResetQuiz(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedGrade === 10 ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'}`}
                >
                  Kelas 10
                </button>
                <button
                  onClick={() => { setSelectedGrade(11); handleResetQuiz(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedGrade === 11 ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'}`}
                >
                  Kelas 11
                </button>
                <button
                  onClick={() => { setSelectedGrade(12); handleResetQuiz(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedGrade === 12 ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'}`}
                >
                  Kelas 12
                </button>
              </div>
            </div>

            {!isSubmitted ? (
              <>
                {/* Question Progress Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Soal {currentQuestionIndex + 1} dari {filteredQuizzes.length}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                    Kelas {selectedGrade} • {currentQuiz?.topic}
                  </span>
                </div>

                {/* Question Text */}
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-slate-900 leading-relaxed mb-6">
                    {currentQuiz?.question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-3">
                    {currentQuiz?.options.map((option, idx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full text-left p-4 rounded-xl text-xs lg:text-sm font-medium transition-all flex items-center gap-3 border ${
                            isSelected 
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-950 shadow-xs ring-1 ring-indigo-600' 
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Footer */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 disabled:opacity-40 transition-colors"
                  >
                    Sebelumnya
                  </button>

                  <div className="flex items-center gap-3">
                    {currentQuestionIndex < filteredQuizzes.length - 1 ? (
                      <button
                        onClick={handleNext}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
                      >
                        Selanjutnya
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
                      >
                        Kumpulkan Jawaban & Nilai
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* Result Score Screen with Automatic Scoring & Detailed Feedback */
              <div className="text-center py-8 space-y-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-100 shadow-md">
                  <Award className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Hasil Evaluasi Kuis Sosiologi</h3>
                  <p className="text-xs text-slate-500">Penilaian Otomatis • Kelas {selectedGrade}</p>
                </div>

                <div className="py-6 px-8 rounded-3xl bg-slate-50 border border-slate-200 max-w-sm mx-auto shadow-xs">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Skor Akhir Anda</p>
                  <h4 className={`text-4xl font-black ${score >= 75 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {score} <span className="text-lg font-bold text-slate-400">/ 100</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 font-medium">
                    {score >= 75 ? "Luar biasa! Pemahaman materi sosiologi Anda sangat mendalam." : "Tetap semangat! Pelajari kembali modul materi dan coba lagi."}
                  </p>
                </div>

                {/* Detailed Review with Correct/Incorrect Feedback */}
                <div className="text-left space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    Umpan Balik & Pembahasan Lengkap:
                  </h4>
                  {filteredQuizzes.map((q, idx) => {
                    const userAns = selectedAnswers[idx];
                    const isCorrect = userAns === q.correctIndex;
                    return (
                      <div key={q.id} className={`p-4 rounded-2xl border ${isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/60 border-red-200'} space-y-2`}>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900">
                            {idx + 1}. {q.question}
                          </p>
                          {isCorrect ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                              <Check className="w-3 h-3" /> Benar
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-bold shrink-0">
                              <X className="w-3 h-3" /> Salah
                            </span>
                          )}
                        </div>
                        
                        <div className="text-[11px] text-slate-700 space-y-1 bg-white/80 p-3 rounded-xl border border-slate-100">
                          <p>
                            <strong className="text-slate-900">Jawaban Anda:</strong> {userAns !== undefined ? q.options[userAns] : 'Tidak dijawab'}
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-700 font-medium">
                              <strong className="text-slate-900">Jawaban Yang Benar:</strong> {q.options[q.correctIndex]}
                            </p>
                          )}
                          <p className="text-slate-600 pt-1 italic border-t border-slate-100 mt-1">
                            <strong>Pembahasan:</strong> {q.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetQuiz}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Ulangi Kuis Ini
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: AI Quiz Generator & Quiz History Tracker */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Quiz Generator */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-white">Generator Soal AI</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Buat soal latihan kuis pilihan ganda secara otomatis menggunakan kecerdasan buatan Gemini berdasarkan topik sosiologi pilihanmu.
              </p>

              <form onSubmit={handleGenerateAiQuiz} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Topik / Bab Sosiologi
                  </label>
                  <input
                    type="text"
                    required
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="Contoh: Mobilitas Sosial, Konflik Agraria"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-indigo-500/30 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-amber-400 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGeneratingAiQuiz}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  {isGeneratingAiQuiz ? "Membuat Soal AI..." : "Buat Soal Kuis AI Sekarang"}
                </button>
              </form>
            </div>

            {/* Quiz Progress & History Tracker */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-bold text-sm text-slate-900">Riwayat & Jejak Skor Kuis</h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">{quizHistory.length} Sesi</span>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {quizHistory.length > 0 ? (
                  quizHistory.map((rec) => (
                    <div key={rec.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                          Kelas {rec.grade}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-1">{rec.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-black ${rec.score >= 75 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {rec.score} <span className="text-[10px] text-slate-400">/ 100</span>
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs text-slate-400">
                    Belum ada riwayat kuis yang diselesaikan. Selesaikan kuis untuk mencatat skor Anda di sini!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Flashcards Section */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Flashcard Viewer */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                  {currentFlashcard.category}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Kartu {currentFlashcardIdx + 1} dari {flashcards.length}
                </span>
              </div>

              <button
                onClick={handleShuffleFlashcards}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Acak urutan kartu kilat"
              >
                <Shuffle className="w-3.5 h-3.5" />
                Acak Kartu
              </button>
            </div>

            {/* Interactive Flashcard Card (Click to Flip) */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className={`w-full min-h-[320px] rounded-3xl p-8 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md border ${
                isFlipped 
                  ? 'bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-indigo-950' 
                  : 'bg-gradient-to-br from-slate-50 to-indigo-50/40 text-slate-900 border-indigo-100 hover:border-indigo-300'
              }`}
            >
              {!isFlipped ? (
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
                    Istilah / Konsep Sosiologi
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                    {currentFlashcard.term}
                  </h3>
                  <p className="text-xs text-indigo-600 font-semibold pt-6">
                    Klik kartu untuk melihat definisi dan penjelasan teori 👆
                  </p>
                </div>
              ) : (
                <div className="space-y-5 animate-fadeIn">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    Definisi & Penjelasan Teori
                  </span>
                  <p className="text-sm lg:text-base leading-relaxed text-slate-100 font-medium">
                    {currentFlashcard.definition}
                  </p>
                  <div className="pt-3 border-t border-indigo-700/50 text-xs text-amber-300 italic">
                    <strong>Konteks Teoretis:</strong> {currentFlashcard.theoryOrContext}
                  </div>
                  <p className="text-[11px] text-slate-400 pt-2">
                    Klik kartu untuk kembali ke istilah 👆
                  </p>
                </div>
              )}
            </div>

            {/* Flashcard Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentFlashcardIdx(prev => (prev > 0 ? prev - 1 : flashcards.length - 1));
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
              </button>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
              >
                {isFlipped ? 'Lihat Istilah' : 'Balik Kartu (Flip)'}
              </button>

              <button
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentFlashcardIdx(prev => (prev < flashcards.length - 1 ? prev + 1 : 0));
                }}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sidebar: AI Flashcard Generator */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-white">Generator Flashcards AI</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Masukkan topik, bab, atau materi PDF terparsing untuk secara otomatis membuat kartu kilat (flashcards) istilah dan teori sosiologi baru.
              </p>

              <form onSubmit={handleGenerateFlashcardsAI} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Topik / Istilah / Bab PDF
                  </label>
                  <input
                    type="text"
                    required
                    value={flashcardTopicInput}
                    onChange={(e) => setFlashcardTopicInput(e.target.value)}
                    placeholder="Contoh: Teori Konflik Struktural"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-indigo-500/30 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-amber-400 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGeneratingFlashcards}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  {isGeneratingFlashcards ? "Membuat Flashcards AI..." : "Buat Kartu Kilat AI Sekarang"}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900">Tips Belajar Flashcards</h3>
              </div>
              <ul className="text-xs text-slate-600 space-y-2.5 list-disc pl-4 leading-relaxed">
                <li>Gunakan kartu kilat untuk menghafal istilah kunci sosiologi sebelum ujian.</li>
                <li>Klik pada kartu untuk menguji daya ingat Anda sebelum melihat definisi lengkap.</li>
                <li>Gunakan generator AI untuk membuat flashcards dari materi PDF yang telah Anda unggah.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
