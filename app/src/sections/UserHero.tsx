import { motion } from 'framer-motion';
import { Flame, Zap, CheckCircle2, Trophy, Activity, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserHeroProps {
    user: any;
    onTopicClick: (topicId: string) => void;
}

export function UserHero({ user, onTopicClick }: UserHeroProps) {

    // Calculate generic rank/level based on XP
    const level = Math.floor((user.xp_points || 0) / 100) + 1;
    const nextLevelXp = level * 100;
    const progressToNextLevel = ((user.xp_points || 0) % 100) / 100 * 100;

    // Mock activity data if empty
    const activityData = user.activityLog || [
        { day: 'Mon', count: 2 },
        { day: 'Tue', count: 4 },
        { day: 'Wed', count: 0 },
        { day: 'Thu', count: 5 },
        { day: 'Fri', count: 3 },
        { day: 'Sat', count: 1 },
        { day: 'Sun', count: 0 },
    ];

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
                        "Consistency is the key to mastery. Keep pushing forward."
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        {
                            label: 'Current Streak',
                            value: `${user.streak_days || 0} Days`,
                            icon: Flame,
                            color: '#ff8a63',
                            subtext: 'Keep it up!'
                        },
                        {
                            label: 'Total XP',
                            value: user.xp_points || 0,
                            icon: Zap,
                            color: '#ffd700',
                            subtext: `Level ${level}`
                        },
                        {
                            label: 'Problems Solved',
                            value: user.solvedProblems?.length || 0,
                            icon: CheckCircle2,
                            color: '#88ff9f',
                            subtext: `Top ${(user.solvedProblems?.length || 0) > 10 ? '10%' : '50%'}`
                        },
                        {
                            label: 'Global Rank',
                            value: '#42',
                            icon: Trophy,
                            color: '#a088ff',
                            subtext: 'Top 5%'
                        }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="glass p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                                        <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                                    </div>
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform"
                                        style={{ color: stat.color }}
                                    >
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm" style={{ color: stat.color }}>
                                    <span>{stat.subtext}</span>
                                </div>
                                {/* Glow Effect */}
                                <div
                                    className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                                    style={{ background: stat.color }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Layout: Main Activity + Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Activity & Resume */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Resume Learning Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="glass p-8 rounded-3xl relative overflow-hidden"
                        >
                            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-semibold text-white mb-2">Continue Learning</h3>
                                    <p className="text-white/60 mb-6 max-w-md">
                                        You were working on <span className="text-[#a088ff]">Arrays & Strings</span>.
                                        Ready to tackle the next challenge?
                                    </p>
                                    <Button
                                        onClick={() => onTopicClick('arrays-strings')}
                                        className="bg-[#a088ff] text-white hover:bg-[#8e72ff] rounded-xl px-8 py-6 text-lg"
                                    >
                                        <PlayCircle className="w-5 h-5 mr-2" />
                                        Resume Arrays
                                    </Button>
                                </div>
                                {/* Progress Ring or Graphic */}
                                <div className="relative w-32 h-32 flex-shrink-0">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-white/10"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            stroke="#a088ff"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={364}
                                            strokeDashoffset={364 - (364 * 35) / 100} // 35% progress mock
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold text-white">35%</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Activity Graph */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="glass p-6 rounded-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-[#63e3ff]" />
                                    Weekly Activity
                                </h3>
                                <span className="text-sm text-white/40">Last 7 Days</span>
                            </div>
                            <div className="flex items-end justify-between h-32 gap-4">
                                {activityData.map((day: any, i: number) => (
                                    <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                        <div className="w-full bg-white/5 rounded-t-lg relative h-full flex items-end overflow-hidden">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(day.count / 5) * 100}%` }} // Max 5 problems/day scale
                                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                                className="w-full bg-gradient-to-t from-[#63e3ff]/20 to-[#63e3ff] opacity-60 group-hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                        <span className="text-xs text-white/40">{day.day}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar - Next Goals */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="glass p-6 rounded-2xl h-fit"
                    >
                        <h3 className="text-lg font-semibold text-white mb-6">Next Goals</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-white/60">Reach Level {level + 1}</span>
                                    <span className="text-[#ffd700]">{user.xp_points || 0} / {nextLevelXp} XP</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#ffd700] rounded-full"
                                        style={{ width: `${progressToNextLevel}%` }}
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <h4 className="font-medium text-white mb-1">Solve 3 Medium Problems</h4>
                                <p className="text-xs text-white/40 mb-3">Daily Challenge</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-1 rounded bg-[#a088ff]/20 text-[#a088ff]">+50 XP</span>
                                    <span className="text-xs px-2 py-1 rounded bg-[#63e3ff]/20 text-[#63e3ff]">Streak Shield</span>
                                </div>
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <h4 className="font-medium text-white mb-1">Complete "Trees" Module</h4>
                                <p className="text-xs text-white/40 mb-3">Roadmap Goal</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-1 rounded bg-[#ffd700]/20 text-[#ffd700]">+200 XP</span>
                                    <span className="text-xs px-2 py-1 rounded bg-[#88ff9f]/20 text-[#88ff9f]">Badge</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
