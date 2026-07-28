import React from 'react';
import { 
  BookOpen, 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Sparkles, 
  Menu, 
  X,
  Compass,
  Briefcase
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onOpenAiChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen,
  onOpenAiChat
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Beranda Utama', icon: LayoutDashboard },
    { id: 'admin-guru', label: 'Administrasi Guru', icon: Briefcase, badge: 'Baru' },
    { id: 'grade-10', label: 'Sosiologi Kelas 10', icon: GraduationCap, badge: 'Kelas 10' },
    { id: 'grade-11', label: 'Sosiologi Kelas 11', icon: BookOpen, badge: 'Kelas 11' },
    { id: 'grade-12', label: 'Sosiologi Kelas 12', icon: Compass, badge: 'Kelas 12' },
    { id: 'pdf-modules', label: 'Modul PDF & Upload', icon: FileText },
    { id: 'quizzes', label: 'Latihan Soal & Kuis', icon: HelpCircle },
    { id: 'discussions', label: 'Ruang Diskusi', icon: MessageSquare },
  ];


  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-100 flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        border-r border-slate-800 shadow-xl
      `}>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white">SosiologiKu</h1>
              <p className="text-xs text-slate-400 font-medium">Media Pembelajaran SMA</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu Utama
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* AI Assistant Banner Card */}
        <div className="p-4 mx-4 mb-6 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-800 border border-indigo-500/30 shadow-inner">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">AI Sosiolog</span>
          </div>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Butuh penjelasan materi atau kuis kilat? Tanya Guru Sosiologi AI sekarang.
          </p>
          <button
            onClick={onOpenAiChat}
            className="w-full py-2 px-3 bg-gradient-to-r from-indigo-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Tanya Sosiolog AI
          </button>
        </div>

        {/* User Footer info */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold border border-slate-700">
            SK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">Siswa Sosiologi</p>
            <p className="text-xs text-slate-400 truncate">Kurikulum Merdeka SMA</p>
          </div>
        </div>
      </aside>
    </>
  );
};
