import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/custom/Navigation';
import { PathDetail } from '@/sections/PathDetail';
import { Hero } from '@/sections/Hero';
import { UserHero } from '@/sections/UserHero';
import { Roadmaps } from '@/sections/Roadmaps';
import { Features } from '@/sections/Features';
import { HowItWorks } from '@/sections/HowItWorks';
import { CommunityHub } from '@/sections/CommunityHub';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { Dashboard } from '@/sections/Dashboard';
import { TopicDetail } from '@/sections/TopicDetail';
import { Problems } from '@/sections/Problems';
import { Notes } from '@/sections/Notes';
import { Leaderboard } from '@/sections/Leaderboard';
import { DailyChallenges } from '@/sections/DailyChallenges';
import { CommunityForum } from '@/sections/CommunityForum';
import { AuthModal } from '@/components/custom/AuthModal';
import { AlgoBot } from '@/components/custom/AlgoBot';
import { AdminPanel } from '@/sections/AdminPanel';
import { ScrollToTop } from '@/components/custom/ScrollToTop';
import { Documentation } from '@/sections/Documentation';
import { ApiReference } from '@/sections/ApiReference';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

type View = 'home' | 'dashboard' | 'topic' | 'path' | 'problems' | 'notes' | 'leaderboard' | 'community' | 'daily-challenges' | 'admin' | 'docs' | 'api';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);

      if (hash) {
        if (hash.startsWith('path/')) {
          const pId = hash.replace('path/', '');
          setSelectedPathId(pId);
          setCurrentView('path');
        } else if (hash.startsWith('topic/')) {
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
        } else if (hash === 'community') {
          setCurrentView('community');
        } else if (hash === 'daily-challenges') {
          if (user) {
            setCurrentView('daily-challenges');
          } else {
            window.location.hash = '';
            setCurrentView('home');
          }
        } else if (hash === 'admin') {
          if (user && user.role === 'admin') {
            setCurrentView('admin');
          } else {
            window.location.hash = '';
            setCurrentView('home');
          }
        } else if (hash === 'docs') {
          setCurrentView('docs');
        } else if (hash === 'api') {
          setCurrentView('api');
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

  const handlePathClick = (pathId: string) => {
    setSelectedPathId(pathId);
    setCurrentView('path');
    window.location.hash = `path/${pathId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'path':
        return selectedPathId ? (
          <PathDetail
            pathId={selectedPathId}
            onBack={() => handleNavigate('home')}
            onTopicClick={handleTopicClick}
          />
        ) : (
          <Roadmaps onPathClick={handlePathClick} />
        );
      case 'topic':
        return selectedTopicId ? (
          <TopicDetail
            topicId={selectedTopicId}
            onBack={() => {
              if (selectedPathId) {
                setCurrentView('path');
                window.location.hash = `path/${selectedPathId}`;
              } else {
                handleNavigate('home');
              }
            }}
          />
        ) : (
          <Roadmaps onPathClick={handlePathClick} />
        );
      case 'problems':
        return <Problems />;
      case 'notes':
        return <Notes />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'daily-challenges':
        return <DailyChallenges onBack={() => handleNavigate('dashboard')} />;
      case 'community':
        return <CommunityForum onBack={() => handleNavigate('home')} onAuthClick={handleAuthClick} />;
      case 'admin':
        return user?.role === 'admin' ? <AdminPanel /> : null;
      case 'docs':
        return <Documentation />;
      case 'api':
        return <ApiReference />;
      case 'home':
      default:
        return user ? (
          <>
            <UserHero user={user} onTopicClick={handleTopicClick} />
            <Roadmaps onPathClick={handlePathClick} />
            <CommunityHub onNavigate={handleNavigate} />
          </>
        ) : (
          <>
            <Hero onGetStarted={() => handleAuthClick('signup')} />
            <Roadmaps onPathClick={handlePathClick} />
            <Features />
            <HowItWorks onGetStarted={() => handleAuthClick('signup')} />
            <CommunityHub onNavigate={handleNavigate} />
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

      <ScrollToTop />

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
