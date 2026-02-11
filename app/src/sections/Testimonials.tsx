
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
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
  }
];

interface TestimonialsProps {
  onNavigate?: (view: any) => void;
}

export function Testimonials({ onNavigate }: TestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 isometric-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a088ff]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
            What Our <span className="gradient-text">Learners</span> Say
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Join thousands of developers who have transformed their coding skills with AlgoForge.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div ref={containerRef} className="relative w-full overflow-hidden mask-linear-fade">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: "-50%" }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="w-[350px] sm:w-[450px] glass rounded-3xl p-8 flex-shrink-0 card-hover border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-md"
              >
                <Quote
                  className="w-8 h-8 mb-4 opacity-50"
                  style={{ color: t.color }}
                />
                <p className="text-white/80 text-lg mb-6 leading-relaxed line-clamp-4">
                  "{t.content}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
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
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-[#ffd700] text-[#ffd700]" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Read More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate && onNavigate('testimonials')}
            className="border-white/10 text-white hover:bg-white/5 hover:text-[#a088ff] transition-colors"
          >
            Read More Success Stories
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
