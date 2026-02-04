import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Users, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 isometric-pattern opacity-50" />
      
      {/* Animated Gradient Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0], 
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#a088ff]/20 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0], 
          y: [0, 40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#63e3ff]/20 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ 
          x: [0, 30, 0], 
          y: [0, 20, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#ff8a63]/10 rounded-full blur-[80px]"
      />

      {/* Grid Lines */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#a088ff]" />
          <span className="text-sm text-white/80">Trusted by 10,000+ learners worldwide</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight"
        >
          Master{' '}
          <span className="gradient-text">Coding</span>
          <br />
          One Step at a Time
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          Structured learning paths for Data Structures, Algorithms, and Interview Preparation. 
          Track your progress, take notes, and level up your skills.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            size="lg"
            onClick={onGetStarted}
            className="btn-shine bg-gradient-to-r from-[#a088ff] to-[#63e3ff] text-[#141414] hover:opacity-90 px-8 py-6 text-lg font-medium rounded-xl group"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg rounded-xl group"
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#a088ff]" />
            <span className="text-white/80">
              <span className="font-semibold text-white">10K+</span> Learners
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#63e3ff]" />
            <span className="text-white/80">
              <span className="font-semibold text-white">500+</span> Problems
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ff8a63]" />
            <span className="text-white/80">
              <span className="font-semibold text-white">50+</span> Roadmaps
            </span>
          </div>
        </motion.div>

        {/* Floating Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {/* Card 1 */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-[5%] glass rounded-xl p-4 hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#a088ff]/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-[#a088ff]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Daily Streak</p>
                <p className="text-xs text-white/60">7 days 🔥</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/3 right-[5%] glass rounded-xl p-4 hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#63e3ff]/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#63e3ff]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">XP Earned</p>
                <p className="text-xs text-white/60">+250 today</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-1/4 left-[10%] glass rounded-xl p-4 hidden xl:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff8a63]/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#ff8a63]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Rank</p>
                <p className="text-xs text-white/60">Top 5% 🏆</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141414] to-transparent" />
    </section>
  );
}
