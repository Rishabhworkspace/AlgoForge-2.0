import { motion } from 'framer-motion';
import { Flame, Zap, CheckCircle2, Trophy, Activity, PlayCircle, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { problems } from '@/data/roadmaps';

interface UserHeroProps {
    user: any;
    onTopicClick: (topicId: string) => void;
}

export function UserHero({ user, onTopicClick }: UserHeroProps) {

    // Calculate generic rank/level based on XP
    const level = Math.floor((user.xp_points || 0) / 100) + 1;
    const nextLevelXp = level * 100;
    const progressToNextLevel = ((user.xp_points || 0) % 100) / 100 * 100;

    // --- Dynamic Stats Calculations ---

    const solvedIds = new Set(user.solvedProblems?.map((p: any) => p.problemId) || []);
    const solvedCount = solvedIds.size;
    const totalProblems = problems.length; // From data/roadmaps.ts

    // Difficulty Counts
    let easySolved = 0, mediumSolved = 0, hardSolved = 0;
    let easyTotal = 0, mediumTotal = 0, hardTotal = 0;

    problems.forEach(p => {
        if (p.difficulty === 'Easy') easyTotal++;
        if (p.difficulty === 'Medium') mediumTotal++;
        if (p.difficulty === 'Hard') hardTotal++;

        if (solvedIds.has(p.id)) {
            if (p.difficulty === 'Easy') easySolved++;
            if (p.difficulty === 'Medium') mediumSolved++;
            if (p.difficulty === 'Hard') hardSolved++;
        }
    });

    const overallProgress = totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

    // Weekly Activity Log
    // user.solvedProblems has { problemId, solvedAt }
    const activityMap = new Map<string, number>();
    const today = new Date();
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        // Format day name (Mon, Tue)
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
        last7Days.push({ date: dateStr, day: dayName, count: 0 });
        activityMap.set(dateStr, 0); // Initialize
    }

    user.solvedProblems?.forEach((p: any) => {
        if (p.solvedAt) {
            const dateStr = new Date(p.solvedAt).toISOString().split('T')[0];
            // Find if dateStr is in our last 7 days map (or manually check)
            // We can just iterate last7Days to see if it matches
            const dayEntry = last7Days.find(d => d.date === dateStr);
            if (dayEntry) {
                dayEntry.count++;
            }
        }
    });

    // Recent Activity
    // Sort solved problems by date desc
    const recentActivity = [...(user.solvedProblems || [])]
        .sort((a: any, b: any) => new Date(b.solvedAt).getTime() - new Date(a.solvedAt).getTime())
        .slice(0, 3)
        .map((p: any) => {
            const problemDetails = problems.find(prob => prob.id === p.problemId);
            return {
                ...p,
                title: problemDetails?.title || 'Unknown Problem',
                difficulty: problemDetails?.difficulty || 'Medium',
                xp: 25 // Mock XP per problem for now, or derive from difficulty
            };
        });

    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a088ff]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="font-display text-4xl sm:text-5xl text-white mb-4">
                        Welcome back, <span className="gradient-text">{user.name.split(' ')[0]}</span>!
                    </h1>
                    <p className="text-xl text-white/60">
                        {user.solvedProblems?.length > 0
                            ? "Consistency is the key to mastery. Keep pushing forward."
                            : "Your journey begins now. Start solving to earn ranks!"}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        {
                            label: 'Solved',
                            value: solvedCount,
                            subtext: `of ${totalProblems} problems`,
                            icon: CheckCircle2,
                            color: '#a088ff'
                        },
                        {
                            label: 'XP Points',
                            value: user.xp_points || 0,
                            subtext: `Level ${level}`,
                            icon: Zap,
                            color: '#63e3ff'
                        },
                        {
                            label: 'Streak',
                            value: user.streak_days || 0,
                            subtext: 'Best: 14 days', // Mock best for now
                            icon: Flame,
                            color: '#ff8a63'
                        },
                        {
                            label: 'Rank',
                            value: '#42', // Still mock until backend rank is efficient
                            subtext: 'Top 5%',
                            icon: Trophy,
                            color: '#88ff9f'
                        }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="glass p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors border border-white/5">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform"
                                        style={{ color: stat.color }}
                                    >
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm font-medium mb-1">{stat.label}</p>
                                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                                        <p className="text-white/40 text-xs">{stat.subtext}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overall Progress */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="glass p-8 rounded-2xl border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Overall Progress</h3>
                                <span className="text-[#a088ff] font-medium">{Math.round(overallProgress)}%</span>
                            </div>

                            {/* Main Progress Bar */}
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden mb-8">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${overallProgress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-[#a088ff] to-[#63e3ff]"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-8 text-center">
                                <div>
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#88ff9f]/10 text-[#88ff9f] mb-3 font-bold">
                                        {easySolved}
                                    </div>
                                    <p className="text-white/60 text-sm">Easy</p>
                                </div>
                                <div>
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ffd700]/10 text-[#ffd700] mb-3 font-bold">
                                        {mediumSolved}
                                    </div>
                                    <p className="text-white/60 text-sm">Medium</p>
                                </div>
                                <div>
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ff8a63]/10 text-[#ff8a63] mb-3 font-bold">
                                        {hardSolved}
                                    </div>
                                    <p className="text-white/60 text-sm">Hard</p>
                                </div>
                            </div>
                        </motion.div>


                        {/* Activity Graph */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="glass p-8 rounded-2xl border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-white">Weekly Activity</h3>
                            </div>
                            <div className="flex items-end justify-between h-40 gap-4">
                                {last7Days.map((day, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 flex-1 group">
                                        <div className="w-full bg-white/5 rounded-t-lg relative h-full flex items-end overflow-hidden hover:bg-white/10 transition-colors">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${Math.min((day.count / 5) * 100, 100)}%` }} // Cap at 100% (5 problems) for visual scaling
                                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                                className="w-full bg-gradient-to-t from-[#63e3ff]/20 to-[#63e3ff] opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                        <span className="text-xs text-white/40 font-medium">{day.day}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Activity List */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="glass p-8 rounded-2xl border border-white/5"
                        >
                            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                            <div className="space-y-4">
                                {recentActivity.length > 0 ? recentActivity.map((item: any, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.difficulty === 'Easy' ? 'bg-[#88ff9f]/20 text-[#88ff9f]' :
                                                item.difficulty === 'Medium' ? 'bg-[#ffd700]/20 text-[#ffd700]' :
                                                    'bg-[#ff8a63]/20 text-[#ff8a63]'
                                                }`}>
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">{item.title}</h4>
                                                <p className="text-white/40 text-xs flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(item.solvedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-[#a088ff] text-sm font-medium">+{item.xp || 25} XP</span>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-white/40">
                                        No recent activity. Start solving!
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Continue Learning */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="glass p-6 rounded-2xl border border-white/5"
                        >
                            <h3 className="text-lg font-bold text-white mb-6">Continue Learning</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer" onClick={() => onTopicClick('arrays-strings')}>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#a088ff]/20 text-[#a088ff] flex items-center justify-center">
                                            <PlayCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Arrays & Strings</h4>
                                            <div className="h-1.5 w-24 bg-white/10 rounded-full mt-2 overflow-hidden">
                                                <div className="h-full bg-[#a088ff] w-[30%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer" onClick={() => onTopicClick('linked-lists')}>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#a088ff]/20 text-[#a088ff] flex items-center justify-center">
                                            <PlayCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Linked Lists</h4>
                                            <div className="h-1.5 w-24 bg-white/10 rounded-full mt-2 overflow-hidden">
                                                <div className="h-full bg-[#a088ff] w-[30%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer" onClick={() => onTopicClick('stacks-queues')}>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#a088ff]/20 text-[#a088ff] flex items-center justify-center">
                                            <PlayCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Stacks & Queues</h4>
                                            <div className="h-1.5 w-24 bg-white/10 rounded-full mt-2 overflow-hidden">
                                                <div className="h-full bg-[#a088ff] w-[30%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Daily Challenge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="bg-gradient-to-br from-[#ff8a63]/20 to-[#ff8a63]/5 p-6 rounded-2xl border border-[#ff8a63]/20 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[#ff8a63]/5 blur-xl" />
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-[#ff8a63]" />
                                    Daily Challenge
                                </h3>
                                <p className="text-white/60 text-sm mb-6">
                                    Complete today's challenge to maintain your streak!
                                </p>
                                <Button className="w-full bg-[#ff8a63] hover:bg-[#ff7a50] text-white">
                                    Start Challenge
                                </Button>
                            </div>
                        </motion.div>

                        {/* Badges/Goals - Kept from original design or simplified */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="glass p-6 rounded-2xl border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Badges</h3>
                                <button className="text-[#a088ff] text-sm hover:underline">View All</button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-[#a088ff]/20 text-[#a088ff] flex items-center justify-center">
                                        <Trophy className="w-5 h-5" />
                                    </div>
                                    <span className="text-white text-xs font-medium">First Steps</span>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-[#a088ff]/20 text-[#a088ff] flex items-center justify-center">
                                        <Trophy className="w-5 h-5" />
                                    </div>
                                    <span className="text-white text-xs font-medium">Rising Star</span>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-[#a088ff]/20 text-[#a088ff] flex items-center justify-center">
                                        <Trophy className="w-5 h-5" />
                                    </div>
                                    <span className="text-white text-xs font-medium">Problem Solver</span>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-[#a088ff]/20 text-[#a088ff] flex items-center justify-center">
                                        <Trophy className="w-5 h-5" />
                                    </div>
                                    <span className="text-white text-xs font-medium">Streak Keeper</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
