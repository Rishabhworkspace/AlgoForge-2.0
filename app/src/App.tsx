import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/custom/Navigation';
import { Hero } from '@/sections/Hero';
import { UserHero } from '@/sections/UserHero';
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
import { DailyChallenges } from '@/sections/DailyChallenges';
import { TestimonialsPage } from '@/sections/TestimonialsPage';
import { AuthModal } from '@/components/custom/AuthModal';
import { AlgoBot } from '@/components/custom/AlgoBot';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

type View = 'home' | 'dashboard' | 'topic' | 'problems' | 'notes' | 'leaderboard' | 'testimonials' | 'daily-challenges';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);

      if (hash) {
        if (hash.startsWith('topic/')) {
          const topicId = hash.replace('topic/', '');
          setSelectedTopicId(topicId);
          setCurrentView('topic');
        } else if (hash === 'dashboard') {
          if (user) {
            setCurrentView('dashboard');
          } else {
            window.location.hash = '';
            setCurrentView('home');
          }
        } else if (hash === 'problems') {
          setCurrentView('problems');
        } else if (hash === 'notes') {
          if (user) {
            setCurrentView('notes');
          } else {
            window.location.hash = '';
            setCurrentView('home');
          }
        } else if (hash === 'leaderboard') {
          setCurrentView('leaderboard');
        } else if (hash === 'testimonials') {
          setCurrentView('testimonials');
        } else if (hash === 'daily-challenges') {
          if (user) {
            setCurrentView('daily-challenges');
          } else {
            window.location.hash = '';
            setCurrentView('home');
          }
        } else {
          setCurrentView('home');
        }
      } else {
        setCurrentView('home');
        setSelectedTopicId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
    if ((view === 'dashboard' || view === 'notes' || view === 'daily-challenges' || (view === 'topic' && topicId)) && !user) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      toast.info('Please log in to continue');
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
      case 'daily-challenges':
        return <DailyChallenges onBack={() => handleNavigate('dashboard')} />;
      case 'testimonials':
        return <TestimonialsPage onBack={() => handleNavigate('home')} />;
      case 'home':
      default:
        return user ? (
          <>
            <UserHero user={user} onTopicClick={handleTopicClick} />
            <Roadmaps onTopicClick={handleTopicClick} />
            <Testimonials onNavigate={handleNavigate} />
          </>
        ) : (
          <>
            <Hero onGetStarted={() => handleAuthClick('signup')} />
            <Roadmaps onTopicClick={handleTopicClick} />
            <Features />
            <HowItWorks onGetStarted={() => handleAuthClick('signup')} />
            <Testimonials onNavigate={handleNavigate} />
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
            className="fixed bottom-8 right-24 p-3 rounded-full bg-[#a088ff] text-white shadow-lg z-40 hover:bg-[#8f76fa] transition-colors"
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

      <AlgoBot onAuthClick={handleAuthClick} />
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
