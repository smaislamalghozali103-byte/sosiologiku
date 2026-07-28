import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Compass, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award,
  Flame,
  Trophy,
  Star,
  Lock
} from 'lucide-react';
import { DAILY_QUOTES, SOCIOLOGY_CURRICULUM, INITIAL_PDF_MODULES } from '../data/sosiologiData';

interface DashboardHomeProps {
  setActiveTab: (tab: string) => void;
  onOpenAiChat: () => void;
}

interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ setActiveTab, onOpenAiChat }) => {
  const [quoteIndex] = React.useState(0);
  const quote = DAILY_QUOTES[quoteIndex];

  // Calculate unlocked badges based on local storage history
  const [badges, setBadges] = useState<BadgeItem[]>([
    {
      id: 'badge-1',
      title: 'Sosiolog Muda',
      description: 'Memulai perjalanan mempelajari ilmu sosiologi kurikulum merdeka.',
      icon: '🌱',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      unlocked: true
    },
    {
      id: 'badge-2',
      title: 'Pakar Interaksi Sosial',
      description: 'Menyelesaikan materi dan kuis dasar sosiologi Kelas 10.',
      icon: '🤝',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      unlocked: true
    },
    {
      id: 'badge-3',
      title: 'Pakar Konflik & Integrasi',
      description: 'Menguasai analisis kelompok sosial dan dinamika konflik Kelas 11.',
      icon: '⚖️',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      unlocked: false
    },
    {
      id: 'badge-4',
      title: 'Master Perubahan Global',
      description: 'Menyelesaikan evaluasi perubahan sosial dan pemberdayaan Kelas 12.',
      icon: '🌍',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      unlocked: false
    },
    {
      id: 'badge-5',
      title: 'AI Sosiolog Explorer',
      description: 'Berinteraksi dengan AI Sosiologi atau membuat soal kuis AI.',
      icon: '🤖',
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      unlocked: true
    }
  ]);

  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem('sosiologi_quiz_history') || '[]');
      if (history.length > 0) {
        setBadges(prev => prev.map(b => {
          if (b.id === 'badge-3' || b.id === 'badge-4') {
            return { ...b, unlocked: true };
          }
          return b;
        }));
      }
    } catch {}
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 lg:p-10 text-white shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-32 bottom-0 translate-y-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Kurikulum Merdeka • Sosiologi SMA
          </div>
          <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight mb-3 text-white">
            Selamat Datang di <span className="bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">SosiologiKu</span>
          </h2>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed mb-6">
            Platform media pembelajaran interaktif sosiologi kelas 10, 11, dan 12. Jelajahi materi kurikulum, modul PDF interaktif, ruang diskusi, dan kuis uji pemahaman.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('grade-10')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              Mulai Belajar
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAiChat}
              className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Tanya Sosiolog AI
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Total Bab Materi</p>
            <h3 className="text-xl font-bold text-slate-900">13 Bab Utama</h3>
            <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">Kelas 10 - 12 Lengkap</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Modul PDF & Bahan</p>
            <h3 className="text-xl font-bold text-slate-900">4+ Modul Siap</h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Bisa Upload Dokumen Baru</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Latihan Kuis</p>
            <h3 className="text-xl font-bold text-slate-900">Uji Pemahaman</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Pilihan Ganda & Pembahasan</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Streak Belajar</p>
            <h3 className="text-xl font-bold text-slate-900">5 Hari Aktif</h3>
            <p className="text-[11px] text-purple-600 font-semibold mt-0.5">Semangat Terus!</p>
          </div>
        </div>
      </div>

      {/* Gamification Badges Section */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2 border border-amber-200">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              Sistem Pencapaian & Lencana
            </div>
            <h3 className="text-xl font-bold text-slate-900">Koleksi Lencana Sosiologi (Gamification)</h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Selesaikan modul materi dan kuis latihan untuk membuka lencana penghargaan prestisius sosiologi.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200">
            <Award className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Lencana Terbuka</p>
              <p className="text-sm font-extrabold text-slate-900">
                {badges.filter(b => b.unlocked).length} dari {badges.length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                badge.unlocked 
                  ? 'bg-white border-slate-200 shadow-sm hover:shadow-md' 
                  : 'bg-slate-50/80 border-slate-200 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs border ${badge.color}`}>
                    {badge.icon}
                  </div>
                  {badge.unlocked ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Aktif
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Terkunci
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-slate-900 text-sm mb-1">{badge.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-4">{badge.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
                <span className={badge.unlocked ? 'text-indigo-600' : 'text-slate-400'}>
                  {badge.unlocked ? 'Telah Diraih' : 'Selesaikan Kuis'}
                </span>
                <Star className={`w-3.5 h-3.5 ${badge.unlocked ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade Quick Navigation */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Pilih Tingkat Kelas</h3>
          <span className="text-xs text-slate-500">Kurikulum Sosiologi SMA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kelas 10 Card */}
          <div 
            onClick={() => setActiveTab('grade-10')}
            className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                  Fase E • Kelas 10
                </span>
                <GraduationCap className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                Dasar-Dasar Sosiologi
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Mempelajari hakikat sosiologi, interaksi sosial, nilai & norma, sosialisasi, serta pengendalian perilaku menyimpang.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <span>5 Bab Pembahasan</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Buka Materi <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Kelas 11 Card */}
          <div 
            onClick={() => setActiveTab('grade-11')}
            className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                  Fase F • Kelas 11
                </span>
                <BookOpen className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                Kelompok & Permasalahan Sosial
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Mengkaji kelompok sosial multikultural, permasalahan sosial, dinamika konflik, kekerasan, hingga integrasi sosial.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
              <span>4 Bab Pembahasan</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Buka Materi <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Kelas 12 Card */}
          <div 
            onClick={() => setActiveTab('grade-12')}
            className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Fase F • Kelas 12
                </span>
                <Compass className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                Perubahan Sosial & Pemberdayaan
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Menganalisis teori perubahan sosial, gelombang globalisasi, ketimpangan sosial, serta pemberdayaan komunitas lokal.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
              <span>4 Bab Pembahasan</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Buka Materi <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Modules & Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent PDF Modules */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900">Modul PDF Rekomendasi</h3>
            <button 
              onClick={() => setActiveTab('pdf-modules')}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {INITIAL_PDF_MODULES.slice(0, 3).map((pdf) => (
              <div key={pdf.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-xs">{pdf.title}</h4>
                    <p className="text-xs text-slate-500">Kelas {pdf.grade} • {pdf.fileSize}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('pdf-modules')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                >
                  Baca
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Quiz & AI Summary Banner */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-6 rounded-2xl text-white flex flex-col justify-between shadow-md">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Fitur Pintar SosiologiKu
            </div>
            <h3 className="text-lg font-bold mb-2">Uji Pemahaman & Tanya AI</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Gunakan fitur latihan soal interaktif untuk menguji kesiapan ujian sekolah, atau tanyakan langsung pada AI Sosiolog terkait materi yang belum dipahami.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('quizzes')}
              className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl text-center shadow-sm transition-colors"
            >
              Mulai Kuis Soal
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl text-center transition-colors"
            >
              Ruang Diskusi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
