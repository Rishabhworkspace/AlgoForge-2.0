import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, LogIn, ChevronDown, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { sendChatMessage } from '@/api/chat';
import type { ChatMessage } from '@/api/chat';
import { useAnimatedText } from '@/components/ui/animated-text';

/* ─── Custom Bot SVG Icon ─── */
function BotIcon({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" className={className}>
            <defs>
                <linearGradient id="bot-face-g" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="1" stopColor="#e2e8f0" />
                </linearGradient>
            </defs>
            <rect x="8" y="10" width="24" height="20" rx="6" fill="url(#bot-face-g)" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.1))" />
            <circle cx="15" cy="20" r="3" fill="#141414" />
            <circle cx="25" cy="20" r="3" fill="#141414" />
            <circle cx="15" cy="20" r="2" fill="#06b6d4" />
            <circle cx="25" cy="20" r="2" fill="#06b6d4" />
            <circle cx="16" cy="19" r="0.8" fill="white" />
            <circle cx="26" cy="19" r="0.8" fill="white" />
            <path d="M16 26 Q20 29 24 26" stroke="#475569" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <line x1="20" y1="10" x2="20" y2="5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="20" cy="4" r="2" fill="#ef4444" />
        </svg>
    );
}

/* ─── Animated Message (word-by-word for latest AI reply) ─── */
function AnimatedAssistantMessage({ content, renderContent }: { content: string; renderContent: (text: string) => React.ReactNode }) {
    const animatedText = useAnimatedText(content, " ");
    return <>{renderContent(animatedText)}</>;
}

const QUICK_ACTIONS = [
    { text: '🎯 Teach me Binary Search', label: 'Binary Search' },
    { text: '🧩 DP beginner roadmap', label: 'DP Roadmap' },
    { text: '📊 Array problems to practice', label: 'Array Practice' },
    { text: '🌳 Explain tree traversals', label: 'Tree Traversals' },
];

export function AlgoBot({ onAuthClick }: { onAuthClick: (mode: 'login' | 'signup') => void }) {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'assistant',
            content:
                "Hey there! I'm **AlgoBot** — your personal DSA tutor 🤖\n\nI can:\n- 📖 **Teach** any DSA concept step-by-step\n- 🎯 **Suggest problems** from AlgoForge to practice\n- 🐛 **Help debug** your approach\n\nTry one of the quick actions below, or ask me anything!",
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showScrollDown, setShowScrollDown] = useState(false);
    const [latestAiIndex, setLatestAiIndex] = useState(0); // track which msg to animate
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!showScrollDown) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, showScrollDown]);

    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus();
    }, [isOpen]);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const handler = () => {
            const gap = el.scrollHeight - el.scrollTop - el.clientHeight;
            setShowScrollDown(gap > 100);
        };
        el.addEventListener('scroll', handler);
        return () => el.removeEventListener('scroll', handler);
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const doSend = async (text: string) => {
        if (!text.trim() || isTyping) return;
        setInput('');

        const updated: ChatMessage[] = [...messages, { role: 'user', content: text.trim() }];
        setMessages(updated);
        setIsTyping(true);

        try {
            const token = localStorage.getItem('token') || '';
            const historyForAPI = updated.slice(1);
            const reply = await sendChatMessage(text.trim(), historyForAPI, token);
            setMessages(prev => {
                const newMsgs = [...prev, { role: 'assistant' as const, content: reply }];
                setLatestAiIndex(newMsgs.length - 1); // animate this message
                return newMsgs;
            });
        } catch (error: any) {
            const errorData = error?.response?.data;
            const mainError = errorData?.error || 'Sorry, something went wrong.';
            const details = errorData?.details ? `\n\n🔍 Debug: ${errorData.details}` : '';
            setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ **${mainError}**${details}` }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            doSend(input);
        }
    };

    /* ─── Markdown Renderer ─── */
    const renderContent = (text: string) => {
        const parts = text.split(/(```[\s\S]*?```|\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
        return parts.map((part, i) => {
            if (part.startsWith('```') && part.endsWith('```')) {
                const lines = part.slice(3, -3);
                const langEnd = lines.indexOf('\n');
                const code = langEnd > -1 ? lines.slice(langEnd + 1) : lines;
                return (
                    <pre key={i} className="bg-black/40 rounded-xl p-3 my-2 overflow-x-auto text-xs font-mono text-emerald-300 border border-white/5 backdrop-blur-sm">
                        <code>{code.trim()}</code>
                    </pre>
                );
            }
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('`') && part.endsWith('`') && !part.startsWith('```')) {
                return <code key={i} className="bg-[#a088ff]/15 text-[#c4b5ff] px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
            }
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
                return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-[#63e3ff] underline decoration-[#63e3ff]/40 hover:decoration-[#63e3ff] transition-all">{linkMatch[1]}</a>;
            }
            return (
                <span key={i}>
                    {part.split('\n').map((line, j, arr) => (
                        <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                    ))}
                </span>
            );
        });
    };

    // Greeting based on time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <>
            {/* ─── Floating Button ─── */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 group"
                    >
                        {/* Glow */}
                        <span className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#a088ff] to-[#63e3ff] opacity-15 blur-xl group-hover:opacity-25 transition-opacity" />

                        {/* Button */}
                        <span className="relative flex items-center gap-3 px-5 py-3 rounded-full bg-[#12121c] border border-white/10 text-white font-semibold shadow-2xl shadow-black/50">
                            <div className="relative">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#a088ff]/20 to-[#63e3ff]/20 flex items-center justify-center">
                                    <BotIcon className="w-7 h-7" />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#12121c]" />
                            </div>
                            <span className="hidden sm:inline text-sm tracking-wide text-white/90">AlgoBot</span>
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ─── Backdrop (for expanded mode) ─── */}
            <AnimatePresence>
                {isOpen && isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsExpanded(false)}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* ─── Chat Window ─── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
                        className={`fixed z-50 flex flex-col overflow-hidden border border-white/10 shadow-2xl ${isExpanded
                                ? 'inset-4 sm:inset-8 md:inset-12 lg:top-[8%] lg:bottom-[8%] lg:left-[15%] lg:right-[15%] rounded-3xl'
                                : 'bottom-6 right-6 w-[400px] h-[600px] max-h-[85vh] max-w-[calc(100vw-32px)] rounded-2xl'
                            }`}
                        style={{
                            background: 'linear-gradient(180deg, #0e0e18 0%, #12121e 100%)',
                            boxShadow: isExpanded
                                ? '0 0 80px rgba(160,136,255,0.1), 0 0 40px rgba(0,0,0,0.6)'
                                : '0 0 40px rgba(0,0,0,0.5)',
                        }}
                    >
                        {/* ─── Header ─── */}
                        <div className="relative px-5 py-4 border-b border-white/5">
                            {/* Gradient accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a088ff] via-[#63e3ff] to-[#a088ff] opacity-50" />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a088ff]/15 to-[#63e3ff]/10 border border-white/10 flex items-center justify-center">
                                            <BotIcon className="w-7 h-7" />
                                        </div>
                                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#12121e]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
                                            AlgoBot
                                            <Sparkles className="w-3.5 h-3.5 text-[#a088ff]/60" />
                                        </h3>
                                        <p className="text-emerald-400/70 text-[10px] font-medium uppercase tracking-widest">Online • AI Tutor</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="p-2 rounded-lg hover:bg-white/5 transition-colors group"
                                        title={isExpanded ? 'Minimize' : 'Expand'}
                                    >
                                        {isExpanded ? (
                                            <Minimize2 className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                                        ) : (
                                            <Maximize2 className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => { setIsOpen(false); setIsExpanded(false); }}
                                        className="p-2 rounded-lg hover:bg-white/5 transition-colors group"
                                    >
                                        <X className="w-4.5 h-4.5 text-white/40 group-hover:text-white transition-colors" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ─── Messages ─── */}
                        <div ref={scrollContainerRef} className="relative flex-1 overflow-y-auto px-4 py-4 space-y-4">
                            {/* Welcome hero (only when first opened, expanded or not) */}
                            {messages.length === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center mb-6 pt-2"
                                >
                                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#a088ff]/20 to-[#63e3ff]/10 border border-white/10 flex items-center justify-center">
                                        <BotIcon className="w-10 h-10" />
                                    </div>
                                    <p className="text-white/40 text-xs mb-1">{getGreeting()}</p>
                                    <h2 className={`text-white font-bold mb-1 ${isExpanded ? 'text-2xl' : 'text-lg'}`}>
                                        How can I <span className="gradient-text">help</span> you?
                                    </h2>
                                    <p className="text-white/30 text-xs">Your personal DSA tutor, always ready.</p>
                                </motion.div>
                            )}

                            {messages.map((msg, i) => {
                                const isLatestAi = msg.role === 'assistant' && i === latestAiIndex && i > 0;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        {/* Avatar */}
                                        {msg.role === 'assistant' ? (
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#a088ff]/15 to-[#63e3ff]/10 border border-white/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                                <BotIcon className="w-5 h-5" />
                                            </div>
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#a088ff] to-[#63e3ff] flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-black border border-white/10 mt-0.5">
                                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                        )}

                                        {/* Bubble */}
                                        <div
                                            className={`${isExpanded ? 'max-w-[70%]' : 'max-w-[82%]'} px-4 py-3 text-[13px] leading-relaxed ${msg.role === 'user'
                                                    ? 'bg-gradient-to-br from-[#a088ff] to-[#8a6fff] text-white rounded-2xl rounded-tr-md shadow-lg shadow-[#a088ff]/10'
                                                    : 'bg-[#1a1a2a] text-gray-200 border border-white/5 rounded-2xl rounded-tl-md'
                                                }`}
                                        >
                                            {isLatestAi ? (
                                                <AnimatedAssistantMessage content={msg.content} renderContent={renderContent} />
                                            ) : (
                                                renderContent(msg.content)
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Quick Actions */}
                            {messages.length === 1 && user && !isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className={`${isExpanded ? 'flex justify-center' : ''}`}
                                >
                                    <div className={`${isExpanded ? 'grid grid-cols-2 gap-2 max-w-md' : 'flex flex-wrap gap-2 pl-10'}`}>
                                        {QUICK_ACTIONS.map((action) => (
                                            <motion.button
                                                key={action.text}
                                                whileHover={{ scale: 1.02, y: -1 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => doSend(action.text)}
                                                className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all ${isExpanded
                                                        ? 'bg-gradient-to-br from-[#1a1a2e] to-[#1e1e34] border-white/5 text-gray-300 hover:border-[#a088ff]/30 hover:text-white'
                                                        : 'bg-[#1a1a2a] border-white/5 text-gray-300 hover:bg-[#222238] hover:border-[#a088ff]/30 hover:text-white'
                                                    }`}
                                            >
                                                {action.text}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#a088ff]/15 to-[#63e3ff]/10 border border-white/10 flex-shrink-0 flex items-center justify-center">
                                        <BotIcon className="w-5 h-5" />
                                    </div>
                                    <div className="bg-[#1a1a2a] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-md">
                                        <div className="flex gap-1 items-center">
                                            {[0, 150, 300].map((delay) => (
                                                <motion.span
                                                    key={delay}
                                                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                                                    transition={{ duration: 1.2, repeat: Infinity, delay: delay / 1000 }}
                                                    className="w-1.5 h-1.5 rounded-full bg-[#a088ff]"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Scroll-to-bottom */}
                        <AnimatePresence>
                            {showScrollDown && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={scrollToBottom}
                                    className="absolute bottom-[80px] left-1/2 -translate-x-1/2 p-2 rounded-full bg-[#1a1a2e] border border-white/10 text-white/60 shadow-lg z-10 hover:bg-[#252540] hover:text-white transition-all"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* ─── Input Area ─── */}
                        <div className="px-4 py-4 border-t border-white/5"
                            style={{ background: 'linear-gradient(180deg, #10101a 0%, #0e0e18 100%)' }}
                        >
                            {user ? (
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 relative">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Ask anything..."
                                            disabled={isTyping}
                                            className="w-full px-4 py-3 pr-3 rounded-xl bg-[#1a1a2a] border border-white/5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#a088ff]/40 focus:ring-1 focus:ring-[#a088ff]/20 transition-all disabled:opacity-40"
                                        />
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.92 }}
                                        onClick={() => doSend(input)}
                                        disabled={!input.trim() || isTyping}
                                        className="p-3 rounded-xl bg-gradient-to-br from-[#a088ff] to-[#8a6fff] text-white hover:shadow-lg hover:shadow-[#a088ff]/20 transition-all disabled:opacity-30 disabled:hover:shadow-none"
                                    >
                                        <Send className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsExpanded(false);
                                        onAuthClick('login');
                                    }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#a088ff] to-[#8a6fff] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#a088ff]/20 transition-all"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Log in to chat
                                </motion.button>
                            )}

                            {/* Footer hint */}
                            <p className="text-center text-[10px] text-white/15 mt-2">
                                AlgoBot can make mistakes. Verify critical info.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
