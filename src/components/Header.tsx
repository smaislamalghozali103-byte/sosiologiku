import React from 'react';
import { Menu, Sparkles, Search, Bell, BookOpen } from 'lucide-react';
import { DAILY_QUOTES } from '../data/sosiologiData';

interface HeaderProps {
  onToggleSidebar: () => void;
  activeTab: string;
  onOpenAiChat: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onToggleSidebar, 
  activeTab, 
  onOpenAiChat,
  onOpenSearch
}) => {
  const [quoteIndex, setQuoteIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % DAILY_QUOTES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const currentQuote = DAILY_QUOTES[quoteIndex];

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Beranda Dashboard Utama';
      case 'grade-10': return 'Materi Sosiologi Kelas 10';
      case 'grade-11': return 'Materi Sosiologi Kelas 11';
      case 'grade-12': return 'Materi Sosiologi Kelas 12';
      case 'pdf-modules': return 'Modul PDF & Unggah Dokumen';
      case 'quizzes': return 'Latihan Soal & Kuis Interaktif';
      case 'discussions': return 'Ruang Diskusi & Tanya Jawab';
      default: return 'Media Pembelajaran Sosiologi';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h2 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
            {getTabTitle(activeTab)}
          </h2>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 italic mt-0.5">
            <span className="font-semibold text-indigo-600 not-italic">Quote Sosiologi:</span>
            <span>"{currentQuote.quote}" — <strong className="font-semibold">{currentQuote.figure}</strong></span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Advanced Search Bar Trigger */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-medium transition-all w-64 border border-slate-200"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span>Cari materi, PDF, atau kuis...</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
          title="Pencarian"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* AI Assistant Quick Button */}
        <button
          onClick={onOpenAiChat}
          className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="hidden md:inline">Tanya Sosiolog AI</span>
          <span className="md:hidden">AI</span>
        </button>

        <div className="w-px h-6 bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shadow-xs">
            SM
          </div>
        </div>
      </div>
    </header>
  );
};
