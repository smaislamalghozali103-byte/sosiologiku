import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  Clock, 
  Layers, 
  HelpCircle,
  FileText,
  ChevronRight,
  Share2,
  Volume2,
  Square,
  Play,
  Pause
} from 'lucide-react';
import { SOCIOLOGY_CURRICULUM } from '../data/sosiologiData';
import { GradeLevel, Chapter } from '../types';

interface ClassMaterialsProps {
  grade: GradeLevel;
  setActiveTab: (tab: string) => void;
  onOpenAiChatWithPrompt: (prompt: string) => void;
}

export const ClassMaterials: React.FC<ClassMaterialsProps> = ({ 
  grade, 
  setActiveTab,
  onOpenAiChatWithPrompt 
}) => {
  const curriculumData = SOCIOLOGY_CURRICULUM.find(c => c.grade === grade) || SOCIOLOGY_CURRICULUM[0];
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(curriculumData.chapters[0]);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  // Text-to-Speech states
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);

  // When grade changes, reset selected chapter to first chapter of that grade
  React.useEffect(() => {
    const curr = SOCIOLOGY_CURRICULUM.find(c => c.grade === grade);
    if (curr && curr.chapters.length > 0) {
      setSelectedChapter(curr.chapters[0]);
      setAiSummary(null);
    }
    // Stop speech when changing grade or chapter
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    }
  }, [grade]);

  // Stop speech when chapter changes
  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    }
  }, [selectedChapter]);

  const handleToggleSpeech = () => {
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

    const textToSpeak = `${selectedChapter.title}. ${selectedChapter.subtitle}. ${selectedChapter.content}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
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

  const handleGenerateSummary = async () => {
    setIsSummarizing(true);
    setAiSummary(null);
    try {
      const res = await fetch('/api/ai-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: selectedChapter.title, 
          content: selectedChapter.content 
        })
      });
      const data = await res.json();
      setAiSummary(data.summary || "Gagal membuat ringkasan AI.");
    } catch (err) {
      setAiSummary("Terjadi kesalahan saat menghubungi server AI.");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Grade Selector Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Pilih Kelas:</span>
          <button
            onClick={() => setActiveTab('grade-10')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${grade === 10 ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Kelas 10
          </button>
          <button
            onClick={() => setActiveTab('grade-11')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${grade === 11 ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Kelas 11
          </button>
          <button
            onClick={() => setActiveTab('grade-12')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${grade === 12 ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Kelas 12
          </button>
        </div>
        <div className="text-xs font-semibold text-slate-500 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
          {curriculumData.title} • Kurikulum Merdeka
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chapters Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              Daftar Bab Pembahasan
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {curriculumData.chapters.length} Bab
            </span>
          </div>

          <div className="space-y-2">
            {curriculumData.chapters.map((chapter) => {
              const isSelected = selectedChapter.id === chapter.id;
              return (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setSelectedChapter(chapter);
                    setAiSummary(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl text-xs font-medium transition-all flex items-start justify-between group ${
                    isSelected 
                      ? 'bg-indigo-50 border-2 border-indigo-500 text-indigo-950 shadow-xs' 
                      : 'bg-slate-50/70 hover:bg-slate-100 text-slate-700 border border-slate-100'
                  }`}
                >
                  <div className="pr-2">
                    <p className={`font-bold mb-0.5 ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                      {chapter.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate max-w-[240px]">
                      {chapter.subtitle}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 mt-1 transition-transform ${isSelected ? 'text-indigo-600 translate-x-0.5' : 'text-slate-400 group-hover:translate-x-1'}`} />
                </button>
              );
            })}
          </div>

          {/* Quick Quiz Shortcut */}
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('quizzes')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              Latihan Kuis Bab Ini
            </button>
          </div>
        </div>

        {/* Chapter Main Reader Content */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {curriculumData.title}
              </span>
              
              <div className="flex items-center gap-2 flex-wrap">
                {/* Text to Speech Audio Player Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleToggleSpeech}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                      isPlayingAudio 
                        ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                    title="Baca teks materi secara nyaring menggunakan suara"
                  >
                    {isPlayingAudio ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlayingAudio ? 'Berhentikan Suara' : '🔊 Baca Nyaring (Audio)'}</span>
                  </button>

                  {isPlayingAudio && (
                    <button
                      onClick={handlePauseResumeSpeech}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold flex items-center gap-1 transition-all shadow-xs"
                      title={isPausedAudio ? 'Lanjutkan suara' : 'Jeda suara'}
                    >
                      {isPausedAudio ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                      <span>{isPausedAudio ? 'Lanjut' : 'Jeda'}</span>
                    </button>
                  )}
                </div>

                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium px-2 py-1 bg-slate-50 rounded-lg">
                  <Clock className="w-3.5 h-3.5" /> {selectedChapter.readingTime}
                </span>
              </div>
            </div>

            <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">
              {selectedChapter.title}
            </h2>
            <p className="text-sm font-medium text-indigo-600">
              {selectedChapter.subtitle}
            </p>
          </div>

          {/* Key Concepts Tags */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Konsep Penting Sosiologi:</p>
            <div className="flex flex-wrap gap-2">
              {selectedChapter.keyConcepts.map((concept, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                  #{concept}
                </span>
              ))}
            </div>
          </div>

          {/* Main Reading Text */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm lg:text-base leading-relaxed space-y-4 whitespace-pre-line bg-slate-50/60 p-6 rounded-2xl border border-slate-100">
            {selectedChapter.content}
          </div>

          {/* AI Summary Card Section */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 p-6 text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Ringkasan Pintar AI Sosiolog</h4>
                  <p className="text-[11px] text-slate-400">Ringkas materi bab ini secara instan</p>
                </div>
              </div>
              <button
                onClick={handleGenerateSummary}
                disabled={isSummarizing}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isSummarizing ? "Meringkas..." : "Buat Ringkasan AI"}
              </button>
            </div>

            {aiSummary && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-slate-200 text-xs lg:text-sm leading-relaxed whitespace-pre-line animate-fadeIn">
                {aiSummary}
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => onOpenAiChatWithPrompt(`Tolong jelaskan lebih lanjut mengenai materi: ${selectedChapter.title}`)}
              className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors flex items-center gap-2 border border-indigo-200"
            >
              <Sparkles className="w-4 h-4" />
              Diskusikan Bab Ini dengan AI
            </button>

            <button
              onClick={() => setActiveTab('quizzes')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
            >
              Lanjut ke Latihan Kuis Soal
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
