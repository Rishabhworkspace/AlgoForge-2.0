import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Circle,
  ExternalLink,
  Bookmark,
  BarChart3,
  Search,
  FileText
} from 'lucide-react';
import { getTopicById, getProblemsByTopic } from '@/data/roadmaps';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface TopicDetailProps {
  topicId: string;
  onBack: () => void;
}

export function TopicDetail({ topicId, onBack }: TopicDetailProps) {
  const topic = getTopicById(topicId);
  const problems = getProblemsByTopic(topicId);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set());
  const [bookmarkedProblems, setBookmarkedProblems] = useState<Set<string>>(new Set());

  if (!topic) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-white/60">Topic not found</p>
      </div>
    );
  }

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const toggleComplete = (problemId: string) => {
    setCompletedProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
      } else {
        newSet.add(problemId);
        toast.success('Problem marked as complete! +25 XP');
      }
      return newSet;
    });
  };

  const toggleBookmark = (problemId: string) => {
    setBookmarkedProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
        toast.info('Bookmark removed');
      } else {
        newSet.add(problemId);
        toast.success('Problem bookmarked');
      }
      return newSet;
    });
  };

  const progress = Math.round((completedProblems.size / problems.length) * 100);

  return (
    <section className="relative min-h-screen pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[200px] opacity-30"
        style={{ background: topic.color }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button & Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Roadmaps
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: `${topic.color}20` }}
              >
                <BarChart3 className="w-8 h-8" style={{ color: topic.color }} />
              </div>
              <div>
                <h1 className="font-display text-3xl sm:text-4xl text-white">{topic.title}</h1>
                <p className="text-white/60">{topic.description}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="glass rounded-xl p-4 min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Progress</span>
                <span className="text-sm font-medium" style={{ color: topic.color }}>
                  {progress}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{ background: topic.color }}
                />
              </div>
              <p className="text-xs text-white/40 mt-2">
                {completedProblems.size} of {problems.length} completed
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              type="text"
              placeholder="Search problems or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${difficultyFilter === diff
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Problems List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          {filteredProblems.map((problem, index) => {
            const isCompleted = completedProblems.has(problem.id);
            const isBookmarked = bookmarkedProblems.has(problem.id);

            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`glass rounded-xl p-4 sm:p-5 transition-all ${isCompleted ? 'border-[#7ca700]/30' : ''
                  }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Completion Toggle */}
                  <button
                    onClick={() => toggleComplete(problem.id)}
                    className="flex-shrink-0"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-[#7ca700]" />
                    ) : (
                      <Circle className="w-6 h-6 text-white/30 hover:text-white/60 transition-colors" />
                    )}
                  </button>

                  {/* Problem Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`font-medium ${isCompleted ? 'text-white/60 line-through' : 'text-white'}`}>
                        {problem.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium difficulty-${problem.difficulty.toLowerCase()}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {problem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
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
                      onClick={() => toggleBookmark(problem.id)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isBookmarked
                          ? 'bg-[#ffd700]/20'
                          : 'bg-white/5 hover:bg-[#ffd700]/10'
                        }`}
                      title="Bookmark"
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-[#ffd700] fill-[#ffd700]' : 'text-white/60'}`} />
                    </button>

                    <button
                      onClick={() => toast.info('Notes feature coming soon!')}
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
                      title="Add Notes"
                    >
                      <FileText className="w-5 h-5 text-white/60 group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No problems found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
