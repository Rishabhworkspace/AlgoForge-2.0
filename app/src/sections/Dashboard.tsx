import { useState, useEffect, useMemo } from 'react';
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
import { getAllProblems, getAllTopics } from '@/api/content';
import { getUserProgress, getDashboardStats } from '@/api/userActions';

interface DashboardProps {
  onNavigate: (view: 'home' | 'dashboard' | 'topic' | 'problems' | 'notes' | 'leaderboard', topicId?: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { profile } = useAuth();

  const [problems, setProblems] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problemsData, topicsData] = await Promise.all([
          getAllProblems(),
          getAllTopics()
        ]);
        setProblems(problemsData);
        setTopics(topicsData);

        try {
          const [progress, stats] = await Promise.all([
            getUserProgress(),
            getDashboardStats()
          ]);
          setUserProgress(progress);
          setDashboardStats(stats);
        } catch (e) {
          console.log("Failed to load user-specific data (not logged in?)");
        }
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const solvedProgress = userProgress.filter((p: any) => p.status === 'SOLVED');
    const solvedIds = new Set(solvedProgress.map((p: any) => p.problem_id));

    const totalSolved = solvedIds.size;
    const totalProblems = problems.length;
    const xpPoints = profile?.xp_points ?? totalSolved * 25;

    let easy = 0, medium = 0, hard = 0;
    problems.forEach((p: any) => {
      if (solvedIds.has(p._id)) {
        if (p.difficulty === 'Easy') easy++;
        else if (p.difficulty === 'Medium') medium++;
        else if (p.difficulty === 'Hard') hard++;
      }
    });

    // Recent Activity
    const recent = solvedProgress
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)
      .map((p: any) => {
        const prob = problems.find((prob: any) => prob._id === p.problem_id);
        return {
          problem: prob ? prob.title : 'Unknown Problem',
          time: new Date(p.updatedAt).toLocaleDateString(),
          difficulty: prob?.difficulty || 'Medium',
          status: 'completed'
        };
      });

    // Streaks from backend stats
    const currentStreak = dashboardStats?.currentStreak ?? 0;

    return {
      totalSolved,
      totalProblems,
      xpPoints,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard,
      recentActivity: recent,
      currentStreak
    };
  }, [problems, userProgress, dashboardStats, profile]);

  // Weekly activity from backend (last 7 days), fallback to zeros
  const weeklyProgress = useMemo(() => {
    if (dashboardStats?.weeklyActivity) {
      return dashboardStats.weeklyActivity.map((d: any) => d.count);
    }
    return [0, 0, 0, 0, 0, 0, 0];
  }, [dashboardStats]);

  // Max value for chart scaling
  const maxWeekly = Math.max(...weeklyProgress, 1);

  // Rank info from backend
  const rankInfo = useMemo(() => {
    if (dashboardStats) {
      return {
        rank: dashboardStats.rank,
        topPercent: dashboardStats.topPercent
      };
    }
    return { rank: '--', topPercent: '--' };
  }, [dashboardStats]);

  // Continue Learning — topics with progress, sorted by most recent activity
  const continueTopics = useMemo(() => {
    const solvedProgress = userProgress.filter((p: any) => p.status === 'SOLVED');
    const solvedIds = new Set(solvedProgress.map((p: any) => p.problem_id));

    return topics.map((topic: any) => {
      const topicProblems = problems.filter((p: any) => p.topic_id === topic.id);
      const totalInTopic = topicProblems.length;
      const solvedInTopic = topicProblems.filter((p: any) => solvedIds.has(p._id)).length;
      const progress = totalInTopic > 0 ? Math.round((solvedInTopic / totalInTopic) * 100) : 0;

      // Find the most recent solve date for this topic
      const topicProblemIds = new Set(topicProblems.map((p: any) => p._id));
      const topicSolves = solvedProgress.filter((p: any) => topicProblemIds.has(p.problem_id));
      const lastSolveDate = topicSolves.length > 0
        ? Math.max(...topicSolves.map((p: any) => new Date(p.updatedAt).getTime()))
        : 0;

      return {
        ...topic,
        solvedInTopic,
        totalInTopic,
        progress,
        lastSolveDate
      };
    })
      // Show topics with progress first, sorted by most recent activity, then remaining topics
      .sort((a: any, b: any) => {
        if (a.solvedInTopic > 0 && b.solvedInTopic === 0) return -1;
        if (a.solvedInTopic === 0 && b.solvedInTopic > 0) return 1;
        return b.lastSolveDate - a.lastSolveDate;
      })
      .slice(0, 4);
  }, [topics, problems, userProgress]);

  const mockBadges = [
    { id: 'b1', name: 'First Steps', icon: 'Footprints', earned: stats.totalSolved > 0 },
    { id: 'b2', name: 'Rising Star', icon: 'Star', earned: stats.totalSolved >= 10 },
    { id: 'b3', name: 'Problem Solver', icon: 'Trophy', earned: stats.totalSolved >= 50 },
    { id: 'b4', name: 'Streak Keeper', icon: 'Flame', earned: stats.currentStreak >= 3 },
  ];

  const completionPercentage = stats.totalProblems > 0 ? Math.round((stats.totalSolved / stats.totalProblems) * 100) : 0;

  // Day labels for weekly chart (Mon-Sun matching actual dates)
  const dayLabels = useMemo(() => {
    if (dashboardStats?.weeklyActivity) {
      return dashboardStats.weeklyActivity.map((d: any) => {
        const date = new Date(d.date + 'T00:00:00');
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      });
    }
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }, [dashboardStats]);

  if (loading) {
    return <div className="min-h-screen pt-24 text-center text-white/60">Loading dashboard...</div>;
  }

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
                <Flame className={`w-5 h-5 ${stats.currentStreak > 0 ? 'text-[#ff8a63] animate-flame' : 'text-white/30'}`} />
                <span className="text-white font-medium">{stats.currentStreak} day streak</span>
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
            <p className="text-2xl font-bold text-white">{stats.totalSolved}</p>
            <p className="text-xs text-white/40">of {stats.totalProblems} problems</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#63e3ff]/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#63e3ff]" />
              </div>
              <span className="text-white/60 text-sm">XP Points</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.xpPoints}</p>
            <p className="text-xs text-white/40">Level {Math.floor(stats.xpPoints / 1000) + 1}</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#ff8a63]/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#ff8a63]" />
              </div>
              <span className="text-white/60 text-sm">Streak</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.currentStreak}</p>
            <p className="text-xs text-white/40">{stats.currentStreak > 0 ? 'Keep it up!' : 'Solve to start!'}</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#88ff9f]/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#88ff9f]" />
              </div>
              <span className="text-white/60 text-sm">Rank</span>
            </div>
            <p className="text-2xl font-bold text-white">#{rankInfo.rank}</p>
            <p className="text-xs text-white/40">Top {rankInfo.topPercent}%</p>
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
                    <span className="text-[#7ca700] font-bold">{stats.easySolved}</span>
                  </div>
                  <p className="text-sm text-white/60">Easy</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ffc107]/20 mb-2">
                    <span className="text-[#ffc107] font-bold">{stats.mediumSolved}</span>
                  </div>
                  <p className="text-sm text-white/60">Medium</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ff6347]/20 mb-2">
                    <span className="text-[#ff6347] font-bold">{stats.hardSolved}</span>
                  </div>
                  <p className="text-sm text-white/60">Hard</p>
                </div>
              </div>
            </motion.div>

            {/* Weekly Activity - Line Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
                <span className="text-xs text-white/40">Last 7 Days</span>
              </div>
              <div className="w-full h-36 relative">
                <svg viewBox="0 0 300 110" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dashAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a088ff" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#63e3ff" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[0, 1, 2, 3].map(i => (
                    <line key={i} x1="0" y1={i * 27 + 10} x2="300" y2={i * 27 + 10}
                      stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
                  ))}
                  {/* Area fill */}
                  <motion.polygon
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    points={`0,100 ${weeklyProgress.map((count: number, i: number) => {
                      const x = i * 50;
                      const y = maxWeekly > 0 ? 100 - (count / maxWeekly) * 80 : 100;
                      return `${x},${y}`;
                    }).join(' ')} 300,100`}
                    fill="url(#dashAreaGrad)"
                  />
                  {/* Line */}
                  <motion.polyline
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    points={weeklyProgress.map((count: number, i: number) => {
                      const x = i * 50;
                      const y = maxWeekly > 0 ? 100 - (count / maxWeekly) * 80 : 100;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="url(#dashLineGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="dashLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#a088ff" />
                      <stop offset="100%" stopColor="#63e3ff" />
                    </linearGradient>
                  </defs>
                  {/* Dots + count labels */}
                  {weeklyProgress.map((count: number, i: number) => {
                    const x = i * 50;
                    const y = maxWeekly > 0 ? 100 - (count / maxWeekly) * 80 : 100;
                    return (
                      <g key={i}>
                        <motion.circle
                          initial={{ r: 0 }}
                          animate={{ r: 3.5 }}
                          transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                          cx={x} cy={y}
                          fill="#a088ff"
                          stroke="#141414"
                          strokeWidth="2"
                        />
                        {count > 0 && (
                          <text x={x} y={y - 8} textAnchor="middle"
                            fill="white" fillOpacity="0.6" fontSize="8"
                            fontWeight="500"
                          >{count}</text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                {/* Day labels below */}
                <div className="flex justify-between mt-1">
                  {dayLabels.map((day: string, i: number) => (
                    <span key={day + i} className="text-xs text-white/40 w-[50px] text-center">{day}</span>
                  ))}
                </div>
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
                {stats.recentActivity.length > 0 ? stats.recentActivity.map((activity: any, index: number) => (
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
                )) : (
                  <p className="text-white/40 text-sm">No recent activity. Start solving problems!</p>
                )}
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
                {continueTopics.map((topic: any) => (
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
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${topic.progress}%`,
                              background: topic.color
                            }}
                          />
                        </div>
                        <span className="text-xs text-white/40">{topic.progress}%</span>
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
                onClick={() => onNavigate('problems')}
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
