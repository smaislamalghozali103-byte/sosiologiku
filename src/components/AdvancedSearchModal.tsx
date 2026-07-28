import React, { useState } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  Filter, 
  GraduationCap 
} from 'lucide-react';
import { SOCIOLOGY_CURRICULUM, INITIAL_PDF_MODULES, INITIAL_QUIZZES } from '../data/sosiologiData';
import { GradeLevel } from '../types';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
  onSelectChapter?: (grade: GradeLevel, chapterId: string) => void;
}

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  isOpen,
  onClose,
  setActiveTab,
}) => {
  const [query, setQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [contentType, setContentType] = useState<'all' | 'chapters' | 'pdf' | 'quizzes'>('all');

  if (!isOpen) return null;

  // Gather all searchable items
  const allChapters = SOCIOLOGY_CURRICULUM.flatMap(curr => 
    curr.chapters.map(chap => ({
      ...chap,
      grade: curr.grade,
      type: 'chapter' as const,
      categoryTitle: curr.title
    }))
  );

  const allPdfs = INITIAL_PDF_MODULES.map(pdf => ({
    ...pdf,
    type: 'pdf' as const
  }));

  const allQuizzes = INITIAL_QUIZZES.map(quiz => ({
    ...quiz,
    type: 'quiz' as const,
    title: `Kuis Kelas ${quiz.grade}: ${quiz.topic}`
  }));

  // Filter items based on query, grade, and type
  const filteredChapters = (contentType === 'all' || contentType === 'chapters') ? allChapters.filter(item => {
    const matchesGrade = selectedGrade === 'all' || item.grade.toString() === selectedGrade;
    const matchesQuery = !query || 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase()) ||
      item.keyConcepts.some(c => c.toLowerCase().includes(query.toLowerCase()));
    return matchesGrade && matchesQuery;
  }) : [];

  const filteredPdfs = (contentType === 'all' || contentType === 'pdf') ? allPdfs.filter(item => {
    const matchesGrade = selectedGrade === 'all' || item.grade.toString() === selectedGrade;
    const matchesQuery = !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.chapterTitle.toLowerCase().includes(query.toLowerCase()) ||
      item.summary.toLowerCase().includes(query.toLowerCase());
    return matchesGrade && matchesQuery;
  }) : [];

  const filteredQuizzes = (contentType === 'all' || contentType === 'quizzes') ? allQuizzes.filter(item => {
    const matchesGrade = selectedGrade === 'all' || item.grade.toString() === selectedGrade;
    const matchesQuery = !query ||
      item.question.toLowerCase().includes(query.toLowerCase()) ||
      item.topic.toLowerCase().includes(query.toLowerCase()) ||
      item.explanation.toLowerCase().includes(query.toLowerCase());
    return matchesGrade && matchesQuery;
  }) : [];

  const totalResults = filteredChapters.length + filteredPdfs.length + filteredQuizzes.length;

  const handleResultClick = (grade: GradeLevel, type: string) => {
    if (type === 'chapter') {
      setActiveTab(`grade-${grade}`);
    } else if (type === 'pdf') {
      setActiveTab('pdf-modules');
    } else if (type === 'quiz') {
      setActiveTab('quizzes');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-fadeIn">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Pencarian Lanjutan SosiologiHub</h3>
                <p className="text-xs text-slate-500">Cari kata kunci di seluruh bab materi, modul PDF, dan kuis</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Masukkan kata kunci (contoh: Mobilitas, Stratifikasi, Sosialisasi, Konflik)..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs lg:text-sm text-slate-800 focus:outline-hidden focus:border-indigo-500 shadow-xs font-medium"
              autoFocus
            />
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">Kelas:</span>
              <button
                onClick={() => setSelectedGrade('all')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${selectedGrade === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                Semua
              </button>
              <button
                onClick={() => setSelectedGrade('10')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${selectedGrade === '10' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                Kelas 10
              </button>
              <button
                onClick={() => setSelectedGrade('11')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${selectedGrade === '11' ? 'bg-amber-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                Kelas 11
              </button>
              <button
                onClick={() => setSelectedGrade('12')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${selectedGrade === '12' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                Kelas 12
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setContentType('all')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${contentType === 'all' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
              >
                Semua Tipe
              </button>
              <button
                onClick={() => setContentType('chapters')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${contentType === 'chapters' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
              >
                Bab Materi
              </button>
              <button
                onClick={() => setContentType('pdf')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${contentType === 'pdf' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
              >
                Modul PDF
              </button>
              <button
                onClick={() => setContentType('quizzes')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${contentType === 'quizzes' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
              >
                Kuis
              </button>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Ditemukan {totalResults} hasil pencarian</span>
            <span>{query ? `Kata kunci: "${query}"` : 'Menampilkan semua konten'}</span>
          </div>

          {/* Chapters Results */}
          {filteredChapters.map(chap => (
            <div
              key={chap.id}
              onClick={() => handleResultClick(chap.grade, 'chapter')}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-indigo-700">Bab Materi • Kelas {chap.grade}</span>
                </div>
                <span className="text-[11px] text-slate-400">{chap.readingTime} baca</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors mb-1">
                {chap.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                {chap.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                {chap.keyConcepts.map((concept, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                    #{concept}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* PDF Results */}
          {filteredPdfs.map(pdf => (
            <div
              key={pdf.id}
              onClick={() => handleResultClick(pdf.grade, 'pdf')}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-red-50 text-red-600">
                    <FileText className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-red-700">Modul PDF • Kelas {pdf.grade}</span>
                </div>
                <span className="text-[11px] text-slate-400">{pdf.fileSize}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors mb-1">
                {pdf.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2">
                {pdf.summary}
              </p>
            </div>
          ))}

          {/* Quiz Results */}
          {filteredQuizzes.map(quiz => (
            <div
              key={quiz.id}
              onClick={() => handleResultClick(quiz.grade, 'quiz')}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-emerald-700">Kuis Latihan • Kelas {quiz.grade}</span>
                </div>
                <span className="text-[11px] text-slate-400">{quiz.topic}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors mb-1">
                {quiz.question}
              </h4>
              <p className="text-xs text-slate-500 italic">
                Pembahasan: {quiz.explanation}
              </p>
            </div>
          ))}

          {totalResults === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800 text-base">Tidak Ada Hasil Ditemukan</h4>
              <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci lain atau ubah filter tingkat kelas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
