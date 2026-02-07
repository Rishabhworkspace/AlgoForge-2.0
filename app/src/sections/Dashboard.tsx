import { } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Trophy,
  Target,
  CheckCircle2,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { topics } from '@/data/roadmaps';
import { toast } from 'sonner';

interface DashboardProps {
  onNavigate: (view: 'home' | 'dashboard' | 'topic' | 'problems' | 'notes' | 'leaderboard', topicId?: string) => void;
}

// Mock data for demonstration
const mockStats = {
  totalSolved: 47,
  totalProblems: 500,
  easySolved: 25,
  mediumSolved: 18,
  hardSolved: 4,
  currentStreak: 7,
  longestStreak: 14,
  xpPoints: 2350,
  weeklyProgress: [3, 5, 2, 7, 4, 6, 8],
  recentActivity: [
    { problem: 'Two Sum', time: '2 hours ago', status: 'completed' },
    { problem: 'Reverse Linked List', time: '5 hours ago', status: 'completed' },
    { problem: 'Binary Tree Level Order', time: '1 day ago', status: 'completed' },
  ]
};

const mockBadges = [
  { id: 'b1', name: 'First Steps', icon: 'Footprints', earned: true },
  { id: 'b2', name: 'Rising Star', icon: 'Star', earned: true },
  { id: 'b3', name: 'Problem Solver', icon: 'Trophy', earned: false },
  { id: 'b4', name: 'Streak Keeper', icon: 'Flame', earned: true },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const { profile } = useAuth();

  const completionPercentage = Math.round((mockStats.totalSolved / mockStats.totalProblems) * 100);

  return (
    <section className="relative min-h-screen pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a088ff]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#63e3ff]/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl text-white mb-2">
                Welcome back, {profile?.name?.split(' ')[0] || 'Learner'}!
              </h1>
              <p className="text-white/60">
                Here's your learning progress and achievements.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                <Flame className="w-5 h-5 text-[#ff8a63] animate-flame" />
                <span className="text-white font-medium">{mockStats.currentStreak} day streak</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#a088ff]/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#a088ff]" />
              </div>
              <span className="text-white/60 text-sm">Solved</span>
            </div>
            <p className="text-2xl font-bold text-white">{mockStats.totalSolved}</p>
            <p className="text-xs text-white/40">of {mockStats.totalProblems} problems</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#63e3ff]/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#63e3ff]" />
              </div>
              <span className="text-white/60 text-sm">XP Points</span>
            </div>
            <p className="text-2xl font-bold text-white">{mockStats.xpPoints}</p>
            <p className="text-xs text-white/40">Level 12</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#ff8a63]/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#ff8a63]" />
              </div>
              <span className="text-white/60 text-sm">Streak</span>
            </div>
            <p className="text-2xl font-bold text-white">{mockStats.currentStreak}</p>
            <p className="text-xs text-white/40">Best: {mockStats.longestStreak} days</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#88ff9f]/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#88ff9f]" />
              </div>
              <span className="text-white/60 text-sm">Rank</span>
            </div>
            <p className="text-2xl font-bold text-white">#42</p>
            <p className="text-xs text-white/40">Top 5%</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Progress & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Overall Progress</h3>
                <span className="text-[#a088ff] font-medium">{completionPercentage}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#a088ff] to-[#63e3ff]"
                />
              </div>

              {/* Difficulty Breakdown */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#7ca700]/20 mb-2">
                    <span className="text-[#7ca700] font-bold">{mockStats.easySolved}</span>
                  </div>
                  <p className="text-sm text-white/60">Easy</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ffc107]/20 mb-2">
                    <span className="text-[#ffc107] font-bold">{mockStats.mediumSolved}</span>
                  </div>
                  <p className="text-sm text-white/60">Medium</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ff6347]/20 mb-2">
                    <span className="text-[#ff6347] font-bold">{mockStats.hardSolved}</span>
                  </div>
                  <p className="text-sm text-white/60">Hard</p>
                </div>
              </div>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Weekly Activity</h3>
              <div className="flex items-end justify-between h-32 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(mockStats.weeklyProgress[index] / 10) * 100}%` }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-[#a088ff] to-[#63e3ff] min-h-[4px]"
                    />
                    <span className="text-xs text-white/60">{day}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {mockStats.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#7ca700]/20 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#7ca700]" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{activity.problem}</p>
                        <p className="text-white/40 text-xs">{activity.time}</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#7ca700]">+25 XP</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Badges & Recommendations */}
          <div className="space-y-6">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Badges</h3>
                <button
                  onClick={() => onNavigate('leaderboard')}
                  className="text-sm text-[#a088ff] hover:text-[#63e3ff] transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {mockBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-xl text-center ${badge.earned
                        ? 'bg-gradient-to-br from-[#a088ff]/20 to-[#63e3ff]/20'
                        : 'bg-white/5 opacity-50'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${badge.earned ? 'bg-[#a088ff]/30' : 'bg-white/10'
                      }`}>
                      <Trophy className={`w-5 h-5 ${badge.earned ? 'text-[#a088ff]' : 'text-white/40'}`} />
                    </div>
                    <p className={`text-xs ${badge.earned ? 'text-white' : 'text-white/40'}`}>
                      {badge.name}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Continue Learning</h3>
              <div className="space-y-3">
                {topics.slice(0, 3).map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => onNavigate('topic', topic.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${topic.color}20` }}
                    >
                      <BookOpen className="w-5 h-5" style={{ color: topic.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{topic.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: '30%',
                              background: topic.color
                            }}
                          />
                        </div>
                        <span className="text-xs text-white/40">30%</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Daily Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass rounded-2xl p-6 gradient-border"
            >
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-[#ff8a63]" />
                <h3 className="text-lg font-semibold text-white">Daily Challenge</h3>
              </div>
              <p className="text-white/60 text-sm mb-4">
                Complete today's challenge to maintain your streak!
              </p>
              <button
                onClick={() => toast.info('Daily challenge coming soon!')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff8a63] to-[#ff6347] text-white font-medium hover:opacity-90 transition-opacity"
              >
                Start Challenge
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
