import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    avatar: 'SC',
    content: 'CodeMastery completely transformed my interview preparation. The structured roadmaps and video explanations helped me understand complex algorithms that I struggled with for years. I landed my dream job at Google!',
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
    content: 'I use CodeMastery to keep my skills sharp. The system design section is particularly well-done. It\'s rare to find such comprehensive content in one place. Highly recommended!',
    rating: 5,
    color: '#88ff9f'
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 isometric-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a088ff]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Join thousands of developers who have transformed their coding skills with CodeMastery.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative" style={{ perspective: '2000px' }}>
          {/* Main Card */}
          <div className="relative h-[400px] sm:h-[350px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  rotateY: { duration: 0.4 }
                }}
                className="absolute inset-0"
              >
                <div className="h-full glass rounded-3xl p-8 sm:p-10 flex flex-col">
                  {/* Quote Icon */}
                  <Quote 
                    className="w-10 h-10 mb-6 opacity-50"
                    style={{ color: testimonials[currentIndex].color }}
                  />

                  {/* Content */}
                  <p className="text-lg sm:text-xl text-white/90 leading-relaxed flex-1">
                    "{testimonials[currentIndex].content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold"
                        style={{ 
                          background: `${testimonials[currentIndex].color}20`,
                          color: testimonials[currentIndex].color
                        }}
                      >
                        {testimonials[currentIndex].avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-sm text-white/60">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 fill-[#ffd700] text-[#ffd700]" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-[#a088ff]' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-3 gap-8 text-center"
        >
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-[#a088ff] mb-1">4.9</p>
            <p className="text-sm text-white/60">Average Rating</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-[#63e3ff] mb-1">10K+</p>
            <p className="text-sm text-white/60">Happy Learners</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-[#ff8a63] mb-1">500+</p>
            <p className="text-sm text-white/60">Success Stories</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
