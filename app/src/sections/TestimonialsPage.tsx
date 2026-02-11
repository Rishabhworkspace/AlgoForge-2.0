
import { motion } from 'framer-motion';
import { Quote, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialsPageProps {
    onBack: () => void;
}

const allTestimonials = [
    {
        id: 1,
        name: 'Sarah Chen',
        role: 'Software Engineer at Google',
        avatar: 'SC',
        content: 'AlgoForge completely transformed my interview preparation. The structured roadmaps and video explanations helped me understand complex algorithms that I struggled with for years. I landed my dream job at Google!',
        rating: 5,
        color: '#a088ff'
    },
    {
        id: 2,
        name: 'Michael Rodriguez',
        role: 'Full Stack Developer',
        avatar: 'MR',
        content: 'The daily challenges kept me consistent, and the progress tracking feature motivated me to keep going. I went from barely solving easy problems to confidently tackling hard ones in just 3 months.',
        rating: 5,
        color: '#63e3ff'
    },
    {
        id: 3,
        name: 'Priya Sharma',
        role: 'CS Student',
        avatar: 'PS',
        content: 'As a student, I found the notes feature incredibly helpful. Being able to save my learnings and revisit them before exams saved me so much time. The gamification makes learning fun!',
        rating: 5,
        color: '#ff8a63'
    },
    {
        id: 4,
        name: 'James Wilson',
        role: 'Senior Developer at Amazon',
        avatar: 'JW',
        content: 'I use AlgoForge to keep my skills sharp. The system design section is particularly well-done. It\'s rare to find such comprehensive content in one place. Highly recommended!',
        rating: 5,
        color: '#88ff9f'
    },
    {
        id: 5,
        name: 'Emma Watson',
        role: 'Frontend Lead',
        avatar: 'EW',
        content: 'The UI/UX is top notch. It genuinely makes you want to study. I love the gamification aspects and how it keeps you engaged throughout the learning process.',
        rating: 5,
        color: '#ff88c9'
    },
    {
        id: 6,
        name: 'David Kim',
        role: 'Backend Engineer at Uber',
        avatar: 'DK',
        content: 'The system design roadmap is a goldmine. It covers everything from load balancing to caching strategies in a way that is easy to understand and apply.',
        rating: 5,
        color: '#a088ff'
    },
    {
        id: 7,
        name: 'Lisa Wang',
        role: 'Junior Developer',
        avatar: 'LW',
        content: 'I was intimidated by DSA, but AlgoForge made it accessible. The visual explanations and step-by-step guides gave me the confidence to ace my interviews.',
        rating: 4,
        color: '#63e3ff'
    },
    {
        id: 8,
        name: 'Robert Fox',
        role: 'Tech Lead',
        avatar: 'RF',
        content: 'I recommend AlgoForge to all my junior devs. It\'s the best platform for building a strong foundation in computer science fundamentals.',
        rating: 5,
        color: '#ff8a63'
    },
    {
        id: 9,
        name: 'Anita Patel',
        role: 'Software Engineer at Microsoft',
        avatar: 'AP',
        content: 'The problem selection is curated perfectly. You don\'t waste time on irrelevant questions. Every problem teaches you a specific concept.',
        rating: 5,
        color: '#88ff9f'
    }
];

export function TestimonialsPage({ onBack }: TestimonialsPageProps) {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            {/* Background */}
            <div className="absolute inset-0 isometric-pattern opacity-20 fixed pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="mb-8 text-white/60 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="font-display text-4xl sm:text-5xl text-white mb-4">
                        Student <span className="gradient-text">Success Stories</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Hear from our community of learners who have achieved their career goals.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allTestimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass rounded-3xl p-6 border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-md flex flex-col h-full hover:border-white/10 transition-colors"
                        >
                            <Quote
                                className="w-8 h-8 mb-4 opacity-50"
                                style={{ color: t.color }}
                            />
                            <p className="text-white/80 text-base mb-6 leading-relaxed flex-grow">
                                "{t.content}"
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                                        style={{
                                            background: `${t.color}20`,
                                            color: t.color
                                        }}
                                    >
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-sm">{t.name}</h4>
                                        <p className="text-xs text-white/50">{t.role}</p>
                                    </div>
                                </div>

                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star
                                            key={idx}
                                            className={`w-3 h-3 ${idx < t.rating ? 'fill-[#ffd700] text-[#ffd700]' : 'text-white/20'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
