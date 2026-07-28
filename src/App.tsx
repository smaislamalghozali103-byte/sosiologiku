import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardHome } from './components/DashboardHome';
import { ClassMaterials } from './components/ClassMaterials';
import { PdfManager } from './components/PdfManager';
import { QuizSection } from './components/QuizSection';
import { DiscussionRoom } from './components/DiscussionRoom';
import { AiAssistantModal } from './components/AiAssistantModal';
import { AdvancedSearchModal } from './components/AdvancedSearchModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatInitialPrompt, setAiChatInitialPrompt] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleOpenAiChatWithPrompt = (prompt: string) => {
    setAiChatInitialPrompt(prompt);
    setIsAiChatOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome setActiveTab={setActiveTab} onOpenAiChat={() => { setAiChatInitialPrompt(''); setIsAiChatOpen(true); }} />;
      case 'grade-10':
        return <ClassMaterials grade={10} setActiveTab={setActiveTab} onOpenAiChatWithPrompt={handleOpenAiChatWithPrompt} />;
      case 'grade-11':
        return <ClassMaterials grade={11} setActiveTab={setActiveTab} onOpenAiChatWithPrompt={handleOpenAiChatWithPrompt} />;
      case 'grade-12':
        return <ClassMaterials grade={12} setActiveTab={setActiveTab} onOpenAiChatWithPrompt={handleOpenAiChatWithPrompt} />;
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
    <div className="min-h-screen bg-slate-100 flex font-sans antialiased text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onOpenAiChat={() => { setAiChatInitialPrompt(''); setIsAiChatOpen(true); }}
      />

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(true)}
          activeTab={activeTab}
          onOpenAiChat={() => { setAiChatInitialPrompt(''); setIsAiChatOpen(true); }}
          onOpenSearch={() => setIsSearchModalOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
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
