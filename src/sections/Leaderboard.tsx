import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Flame, 
  Target, 
  Crown,
  Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock leaderboard data
const leaderboardData = [
  { id: '1', name: 'Alex Chen', avatar: 'AC', xp: 15250, streak: 45, solved: 342, rank: 1 },
  { id: '2', name: 'Sarah Johnson', avatar: 'SJ', xp: 14800, streak: 38, solved: 318, rank: 2 },
  { id: '3', name: 'Mike Williams', avatar: 'MW', xp: 14200, streak: 42, solved: 295, rank: 3 },
  { id: '4', name: 'Emily Davis', avatar: 'ED', xp: 13500, streak: 28, solved: 280, rank: 4 },
  { id: '5', name: 'James Brown', avatar: 'JB', xp: 12900, streak: 35, solved: 265, rank: 5 },
  { id: '6', name: 'Lisa Anderson', avatar: 'LA', xp: 12200, streak: 21, solved: 248, rank: 6 },
  { id: '7', name: 'David Wilson', avatar: 'DW', xp: 11800, streak: 18, solved: 235, rank: 7 },
  { id: '8', name: 'Emma Taylor', avatar: 'ET', xp: 11200, streak: 25, solved: 220, rank: 8 },
  { id: '9', name: 'Chris Martin', avatar: 'CM', xp: 10800, streak: 15, solved: 205, rank: 9 },
  { id: '10', name: 'Olivia Garcia', avatar: 'OG', xp: 10200, streak: 22, solved: 195, rank: 10 },
];

const currentUserRank = 42;

export function Leaderboard() {
  const { profile } = useAuth();
  const [timeRange, setTimeRange] = useState<'all' | 'month' | 'week'>('all');
  const [category, setCategory] = useState<'xp' | 'streak' | 'solved'>('xp');

  const sortedData = [...leaderboardData].sort((a, b) => {
    if (category === 'xp') return b.xp - a.xp;
    if (category === 'streak') return b.streak - a.streak;
    return b.solved - a.solved;
  });

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-[#ffd700]" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-[#c0c0c0]" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-[#cd7f32]" />;
    return <span className="w-6 h-6 flex items-center justify-center text-white/60 font-medium">{rank}</span>;
  };

  return (
    <section className="relative min-h-screen pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#ffd700]/10 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/20 mb-4">
            <Trophy className="w-5 h-5 text-[#ffd700]" />
            <span className="text-[#ffd700] font-medium">Global Leaderboard</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-white mb-2">
            Top <span className="gradient-text">Performers</span>
          </h1>
          <p className="text-white/60">
            Compete with learners worldwide and climb the ranks
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
          {/* Time Range */}
          <div className="flex gap-2 p-1 rounded-xl bg-white/5">
            {(['all', 'month', 'week'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {range === 'all' ? 'All Time' : range === 'month' ? 'This Month' : 'This Week'}
              </button>
            ))}
          </div>

          {/* Category */}
          <div className="flex gap-2">
            {[
              { id: 'xp', label: 'XP', icon: Zap },
              { id: 'streak', label: 'Streak', icon: Flame },
              { id: 'solved', label: 'Solved', icon: Target },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as typeof category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  category === cat.id
                    ? 'bg-gradient-to-r from-[#a088ff] to-[#63e3ff] text-[#141414]'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-end justify-center gap-4 mb-12"
        >
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c0c0c0]/30 to-[#c0c0c0]/10 flex items-center justify-center mb-3 border-2 border-[#c0c0c0]/50">
              <span className="text-2xl font-bold text-[#c0c0c0]">{sortedData[1].avatar}</span>
            </div>
            <p className="text-white font-medium text-sm mb-1">{sortedData[1].name}</p>
            <p className="text-[#c0c0c0] text-xs">{sortedData[1].xp.toLocaleString()} XP</p>
            <div className="w-24 h-24 mt-3 rounded-t-xl bg-gradient-to-t from-[#c0c0c0]/20 to-transparent flex items-end justify-center pb-2">
              <Medal className="w-8 h-8 text-[#c0c0c0]" />
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ffd700]/30 to-[#ffd700]/10 flex items-center justify-center mb-3 border-2 border-[#ffd700]/50 animate-pulse-glow">
              <span className="text-3xl font-bold text-[#ffd700]">{sortedData[0].avatar}</span>
            </div>
            <p className="text-white font-medium mb-1">{sortedData[0].name}</p>
            <p className="text-[#ffd700] text-sm">{sortedData[0].xp.toLocaleString()} XP</p>
            <div className="w-28 h-32 mt-3 rounded-t-xl bg-gradient-to-t from-[#ffd700]/20 to-transparent flex items-end justify-center pb-2">
              <Crown className="w-10 h-10 text-[#ffd700]" />
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#cd7f32]/30 to-[#cd7f32]/10 flex items-center justify-center mb-3 border-2 border-[#cd7f32]/50">
              <span className="text-2xl font-bold text-[#cd7f32]">{sortedData[2].avatar}</span>
            </div>
            <p className="text-white font-medium text-sm mb-1">{sortedData[2].name}</p>
            <p className="text-[#cd7f32] text-xs">{sortedData[2].xp.toLocaleString()} XP</p>
            <div className="w-24 h-16 mt-3 rounded-t-xl bg-gradient-to-t from-[#cd7f32]/20 to-transparent flex items-end justify-center pb-2">
              <Medal className="w-8 h-8 text-[#cd7f32]" />
            </div>
          </div>
        </motion.div>

        {/* Leaderboard List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-2"
        >
          {sortedData.slice(3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
              className="glass rounded-xl p-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
            >
              {/* Rank */}
              <div className="w-8 flex justify-center">
                {getRankIcon(user.rank)}
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a088ff]/20 to-[#63e3ff]/20 flex items-center justify-center">
                <span className="text-sm font-medium text-white">{user.avatar}</span>
              </div>

              {/* Name */}
              <div className="flex-1">
                <p className="text-white font-medium">{user.name}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-[#a088ff]" />
                  <span className="text-white/80">{user.xp.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Flame className="w-4 h-4 text-[#ff8a63]" />
                  <span className="text-white/80">{user.streak}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-[#63e3ff]" />
                  <span className="text-white/80">{user.solved}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Current User Rank */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 glass rounded-xl p-4 gradient-border"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 flex justify-center">
              <span className="text-white/60 font-medium">#{currentUserRank}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a088ff] to-[#63e3ff] flex items-center justify-center">
              <span className="text-sm font-medium text-[#141414]">
                {profile?.name?.charAt(0).toUpperCase() || 'Y'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">You</p>
              <p className="text-white/40 text-sm">Keep pushing! You're in the top 5%</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-[#a088ff]" />
                <span className="text-white/80">2,350</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Flame className="w-4 h-4 text-[#ff8a63]" />
                <span className="text-white/80">7</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-[#63e3ff]" />
                <span className="text-white/80">47</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Motivation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-white/40 text-sm">
            Solve more problems to climb the leaderboard and earn exclusive badges!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
