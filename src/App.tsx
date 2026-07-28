import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardHome } from './components/DashboardHome';
import { ClassMaterials } from './components/ClassMaterials';
import { PdfManager } from './components/PdfManager';
import { QuizSection } from './components/QuizSection';
import { DiscussionRoom } from './components/DiscussionRoom';
import { TeacherAdmin } from './components/TeacherAdmin';
import { AiAssistantModal } from './components/AiAssistantModal';
import { AdvancedSearchModal } from './components/AdvancedSearchModal';
import { EyeOff, Minimize2, Eye } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatInitialPrompt, setAiChatInitialPrompt] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const handleToggleFocusMode = () => {
    setIsFocusMode(prev => !prev);
  };

  // Listen for Escape key to exit focus mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode]);

  const handleOpenAiChatWithPrompt = (prompt: string) => {
    setAiChatInitialPrompt(prompt);
    setIsAiChatOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome setActiveTab={setActiveTab} onOpenAiChat={() => { setAiChatInitialPrompt(''); setIsAiChatOpen(true); }} />;
      case 'admin-guru':
        return <TeacherAdmin />;
      case 'grade-10':

        return (
          <ClassMaterials 
            grade={10} 
            setActiveTab={setActiveTab} 
            onOpenAiChatWithPrompt={handleOpenAiChatWithPrompt} 
            isFocusMode={isFocusMode}
            onToggleFocusMode={handleToggleFocusMode}
          />
        );
      case 'grade-11':
        return (
          <ClassMaterials 
            grade={11} 
            setActiveTab={setActiveTab} 
            onOpenAiChatWithPrompt={handleOpenAiChatWithPrompt} 
            isFocusMode={isFocusMode}
            onToggleFocusMode={handleToggleFocusMode}
          />
        );
      case 'grade-12':
        return (
          <ClassMaterials 
            grade={12} 
            setActiveTab={setActiveTab} 
            onOpenAiChatWithPrompt={handleOpenAiChatWithPrompt} 
            isFocusMode={isFocusMode}
            onToggleFocusMode={handleToggleFocusMode}
          />
        );
      case 'pdf-modules':
        return <PdfManager />;
      case 'quizzes':
        return <QuizSection />;
      case 'discussions':
        return <DiscussionRoom />;
      default:
        return <DashboardHome setActiveTab={setActiveTab} onOpenAiChat={() => { setAiChatInitialPrompt(''); setIsAiChatOpen(true); }} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans antialiased text-slate-900 relative">
      {/* Sidebar Navigation - Hidden in Focus Mode */}
      {!isFocusMode && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          onOpenAiChat={() => { setAiChatInitialPrompt(''); setIsAiChatOpen(true); }}
        />
      )}

      {/* Main Wrapper */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isFocusMode ? 'pl-0' : 'lg:pl-72'}`}>
        {/* Floating Focus Mode Banner Bar when active */}
        {isFocusMode ? (
          <div className="sticky top-0 z-50 bg-slate-900 text-white px-4 py-2.5 shadow-md flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs lg:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] uppercase tracking-wider font-bold">
                Mode Fokus Aktif
              </span>
              <span className="hidden sm:inline text-slate-300 font-medium">
                — Sidebar & Header tersembunyi untuk pengalaman belajar bebas distraksi.
              </span>
            </div>

            <button
              onClick={handleToggleFocusMode}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs hover:scale-105"
              title="Keluar dari Mode Fokus (Atau tekan Esc)"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Keluar Mode Fokus</span>
              <span className="hidden md:inline-block px-1.5 py-0.2 bg-indigo-800 rounded-md text-[10px] text-indigo-200">ESC</span>
            </button>
          </div>
        ) : (
          <Header
            onToggleSidebar={() => setIsSidebarOpen(true)}
            activeTab={activeTab}
            onOpenAiChat={() => { setAiChatInitialPrompt(''); setIsAiChatOpen(true); }}
            onOpenSearch={() => setIsSearchModalOpen(true)}
            isFocusMode={isFocusMode}
            onToggleFocusMode={handleToggleFocusMode}
          />
        )}

        <main className={`flex-1 p-4 lg:p-8 w-full mx-auto transition-all ${isFocusMode ? 'max-w-5xl py-6 lg:py-10' : 'max-w-7xl'}`}>
          {renderContent()}
        </main>
      </div>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiChatOpen}
        onClose={() => { setIsAiChatOpen(false); setAiChatInitialPrompt(''); }}
        initialPrompt={aiChatInitialPrompt}
      />

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

