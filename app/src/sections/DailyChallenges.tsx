import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    CheckCircle2,
    Circle,
    ExternalLink,
    Play,
    Flame,
    ArrowLeft,
    RefreshCw,
    Zap
} from 'lucide-react';
import { getAllProblems } from '@/api/content';
import { updateProblemStatus, getUserProgress } from '@/api/userActions';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface DailyChallengesProps {
    onBack: () => void;
}

export function DailyChallenges({ onBack }: DailyChallengesProps) {
    const { refreshProfile } = useAuth();
    const [allProblems, setAllProblems] = useState<any[]>([]);
    const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const problemsData = await getAllProblems();
                setAllProblems(problemsData);

                try {
                    const progressData = await getUserProgress();
                    const completed = new Set<string>();
                    progressData.forEach((p: any) => {
                        if (p.status === 'SOLVED') completed.add(p.problem_id);
                    });
                    setCompletedProblems(completed);
                } catch {
                    // Not logged in
                }
            } catch (e) {
                console.error(e);
                toast.error('Failed to load challenges');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Use today's date as seed for deterministic daily selection
    const dailyProblems = useMemo(() => {
        if (allProblems.length === 0) return [];

        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

        // Simple seeded shuffle to pick 3 problems deterministically per day
        const shuffled = [...allProblems].sort((a, b) => {
            const hashA = ((seed * 31 + a._id.charCodeAt(0)) * 37) % 1000;
            const hashB = ((seed * 31 + b._id.charCodeAt(0)) * 37) % 1000;
            return hashA - hashB;
        });

        // Try to get 1 Easy, 1 Medium, 1 Hard
        const easy = shuffled.find(p => p.difficulty === 'Easy');
        const medium = shuffled.find(p => p.difficulty === 'Medium');
        const hard = shuffled.find(p => p.difficulty === 'Hard');

        const selected = [easy, medium, hard].filter(Boolean);
        // Fallback: if we don't have all 3 difficulties, just take first 3
        if (selected.length < 3) {
            return shuffled.slice(0, 3);
        }
        return selected;
    }, [allProblems]);

    const challengesSolved = dailyProblems.filter(p => completedProblems.has(p._id)).length;
    const allCompleted = challengesSolved === dailyProblems.length && dailyProblems.length > 0;

    const toggleComplete = async (problemMongoId: string) => {
        const wasCompleted = completedProblems.has(problemMongoId);
        setCompletedProblems(prev => {
            const newSet = new Set(prev);
            if (wasCompleted) newSet.delete(problemMongoId);
            else newSet.add(problemMongoId);
            return newSet;
        });

        try {
            await updateProblemStatus(problemMongoId, wasCompleted ? 'TODO' : 'SOLVED');
            if (!wasCompleted) toast.success('Challenge problem solved! +25 XP');
            refreshProfile();
        } catch {
            setCompletedProblems(prev => {
                const newSet = new Set(prev);
                if (wasCompleted) newSet.add(problemMongoId);
                else newSet.delete(problemMongoId);
                return newSet;
            });
            toast.error('Failed to update. Please log in.');
        }
    };



    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-[#ff8a63] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <section className="relative min-h-screen pt-24 pb-12 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff8a63]/10 rounded-full blur-[200px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ff6347]/10 rounded-full blur-[120px]" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back button */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#ff8a63]/20 to-[#ff6347]/20 mb-4">
                        <Target className="w-10 h-10 text-[#ff8a63]" />
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl text-white mb-2">
                        Daily <span className="text-[#ff8a63]">Challenges</span>
                    </h1>
                    <p className="text-white/60 max-w-md mx-auto">
                        Complete today's challenges to maintain your streak and earn bonus XP!
                    </p>

                    {/* Progress indicator */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                            <Flame className={`w-5 h-5 ${challengesSolved > 0 ? 'text-[#ff8a63]' : 'text-white/30'}`} />
                            <span className="text-white font-medium">{challengesSolved}/{dailyProblems.length} Complete</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                            <Zap className="w-5 h-5 text-[#ffd700]" />
                            <span className="text-white font-medium">{challengesSolved * 25} XP Earned</span>
                        </div>
                    </div>
                </motion.div>

                {/* Completion banner */}
                {allCompleted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-2xl p-6 mb-8 text-center border border-[#7ca700]/30 bg-[#7ca700]/5"
                    >
                        <CheckCircle2 className="w-12 h-12 text-[#7ca700] mx-auto mb-3" />
                        <h3 className="text-xl font-semibold text-white mb-1">All Challenges Complete! 🎉</h3>
                        <p className="text-white/60 text-sm">Great work! Come back tomorrow for new challenges.</p>
                    </motion.div>
                )}

                {/* Challenge cards */}
                <div className="space-y-4">
                    {dailyProblems.map((problem, index) => {
                        const isCompleted = completedProblems.has(problem._id);


                        return (
                            <motion.div
                                key={problem._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className={`glass rounded-2xl p-6 transition-all ${isCompleted ? 'border border-[#7ca700]/30' : 'border border-transparent hover:border-white/10'}`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold text-[#ff8a63] uppercase tracking-wider">
                                        Challenge {index + 1}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium difficulty-${problem.difficulty.toLowerCase()}`}>
                                        {problem.difficulty}
                                    </span>
                                    {isCompleted && (
                                        <span className="ml-auto px-2 py-0.5 rounded-full bg-[#7ca700]/20 text-[#7ca700] text-xs font-medium">
                                            ✓ Solved
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className={`text-lg font-medium mb-2 ${isCompleted ? 'text-white/60 line-through' : 'text-white'}`}>
                                            {problem.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {(problem.tags || []).slice(0, 4).map((tag: string) => (
                                                <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {problem.video_link && (
                                            <a
                                                href={problem.video_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#a088ff]/20 flex items-center justify-center transition-colors group"
                                                title="Watch Video"
                                            >
                                                <Play className="w-5 h-5 text-white/60 group-hover:text-[#a088ff]" />
                                            </a>
                                        )}
                                        {problem.problem_link && (
                                            <a
                                                href={problem.problem_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#63e3ff]/20 flex items-center justify-center transition-colors group"
                                                title="Open Problem"
                                            >
                                                <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-[#63e3ff]" />
                                            </a>
                                        )}
                                        <button
                                            onClick={() => toggleComplete(problem._id)}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isCompleted
                                                ? 'bg-[#7ca700]/20 hover:bg-[#7ca700]/30'
                                                : 'bg-white/5 hover:bg-white/10'
                                                }`}
                                            title={isCompleted ? 'Unmark' : 'Mark as Solved'}
                                        >
                                            {isCompleted ? (
                                                <CheckCircle2 className="w-6 h-6 text-[#7ca700]" />
                                            ) : (
                                                <Circle className="w-6 h-6 text-white/30 hover:text-white/60" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* XP reward indicator */}
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                                    <Zap className="w-4 h-4 text-[#ffd700]" />
                                    <span className="text-sm text-white/40">
                                        {isCompleted ? 'Earned' : 'Reward'}: <span className="text-[#ffd700]">+25 XP</span>
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Daily refresh notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-2 mt-8 text-white/30 text-sm"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Challenges refresh daily at midnight</span>
                </motion.div>
            </div>
        </section>
    );
}
