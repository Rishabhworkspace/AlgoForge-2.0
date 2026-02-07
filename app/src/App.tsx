import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/custom/Navigation';
import { Hero } from '@/sections/Hero';
import { Roadmaps } from '@/sections/Roadmaps';
import { Features } from '@/sections/Features';
import { HowItWorks } from '@/sections/HowItWorks';
import { Testimonials } from '@/sections/Testimonials';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { Dashboard } from '@/sections/Dashboard';
import { TopicDetail } from '@/sections/TopicDetail';
import { Problems } from '@/sections/Problems';
import { Notes } from '@/sections/Notes';
import { Leaderboard } from '@/sections/Leaderboard';
import { AuthModal } from '@/components/custom/AuthModal';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

type View = 'home' | 'dashboard' | 'topic' | 'problems' | 'notes' | 'leaderboard';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Check for hash-based navigation
    const hash = window.location.hash.slice(1);
    if (hash) {
      if (hash.startsWith('topic/')) {
        const topicId = hash.replace('topic/', '');
        setSelectedTopicId(topicId);
        setCurrentView('topic');
      } else if (hash === 'dashboard' && user) {
        setCurrentView('dashboard');
      } else if (hash === 'problems') {
        setCurrentView('problems');
      } else if (hash === 'notes' && user) {
        setCurrentView('notes');
      } else if (hash === 'leaderboard') {
        setCurrentView('leaderboard');
      }
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: View, topicId?: string) => {
    if ((view === 'dashboard' || view === 'notes') && !user) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      toast.info('Please sign in to access this feature');
      return;
    }

    setCurrentView(view);
    if (topicId) {
      setSelectedTopicId(topicId);
      window.location.hash = `topic/${topicId}`;
    } else {
      window.location.hash = view === 'home' ? '' : view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTopicClick = (topicId: string) => {
    handleNavigate('topic', topicId);
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'topic':
        return selectedTopicId ? (
          <TopicDetail
            topicId={selectedTopicId}
            onBack={() => handleNavigate('home')}
          />
        ) : (
          <Roadmaps onTopicClick={handleTopicClick} />
        );
      case 'problems':
        return <Problems />;
      case 'notes':
        return <Notes />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'home':
      default:
        return (
          <>
            <Hero onGetStarted={() => handleAuthClick('signup')} />
            <Roadmaps onTopicClick={handleTopicClick} />
            <Features />
            <HowItWorks />
            <Testimonials />
            <CTA onGetStarted={() => handleAuthClick('signup')} />
          </>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-2 border-[#a088ff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navigation
        currentView={currentView}
        onNavigate={handleNavigate}
        onAuthClick={handleAuthClick}
      />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (selectedTopicId || '')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentView === 'home' && <Footer onNavigate={handleNavigate} />}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-[#a088ff] text-white shadow-lg z-50 hover:bg-[#8f76fa] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#202020',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
