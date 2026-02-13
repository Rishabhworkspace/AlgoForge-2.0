import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, LogIn, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { sendChatMessage } from '@/api/chat';
import type { ChatMessage } from '@/api/chat';

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
            {/* Head - White/Silver for contrast */}
            <rect x="8" y="10" width="24" height="20" rx="6" fill="url(#bot-face-g)" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.1))" />

            {/* Eyes - Bright Cyan */}
            <circle cx="15" cy="20" r="3" fill="#141414" />
            <circle cx="25" cy="20" r="3" fill="#141414" />
            <circle cx="15" cy="20" r="2" fill="#06b6d4" />
            <circle cx="25" cy="20" r="2" fill="#06b6d4" />
            <circle cx="16" cy="19" r="0.8" fill="white" />
            <circle cx="26" cy="19" r="0.8" fill="white" />

            {/* Mouth */}
            <path d="M16 26 Q20 29 24 26" stroke="#475569" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Antenna */}
            <line x1="20" y1="10" x2="20" y2="5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="20" cy="4" r="2" fill="#ef4444" />
        </svg>
    );
}

const QUICK_ACTIONS = [
    '🎯 Teach me Binary Search',
    '🧩 DP beginner roadmap',
    '📊 Array problems to practice',
    '🌳 Explain tree traversals',
];

export function AlgoBot({ onAuthClick }: { onAuthClick: (mode: 'login' | 'signup') => void }) {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
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

    // Track scroll position to show "scroll to bottom" arrow
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
            const historyForAPI = updated.slice(1); // skip welcome message
            const reply = await sendChatMessage(text.trim(), historyForAPI, token);
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch (error: any) {
            const errMsg = error?.response?.data?.error || 'Sorry, something went wrong. Please try again.';
            setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${errMsg}` }]);
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
                    <pre key={i} className="bg-black/50 rounded-xl p-3 my-2 overflow-x-auto text-xs font-mono text-green-300 border border-white/10 backdrop-blur-sm">
                        <code>{code.trim()}</code>
                    </pre>
                );
            }
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('`') && part.endsWith('`') && !part.startsWith('```')) {
                return <code key={i} className="bg-[#a088ff]/20 text-[#c4b5ff] px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
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
                        {/* Soft Glow (No Pulse) */}
                        <span className="absolute -inset-2 rounded-full bg-[#a088ff] opacity-20 blur-lg group-hover:opacity-30 transition-opacity" />

                        {/* Button Body */}
                        <span className="relative flex items-center gap-3 px-5 py-3 rounded-full bg-[#1b1b2e] border border-white/10 text-white font-semibold shadow-2xl">
                            {/* Bot Icon Container */}
                            <div className="w-8 h-8 flex items-center justify-center">
                                <BotIcon className="w-10 h-10 drop-shadow-md" />
                            </div>
                            <span className="hidden sm:inline text-sm tracking-wide text-white/90">AlgoBot</span>
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ─── Chat Window ─── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.98 }}
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                        className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-h-[85vh] max-w-[calc(100vw-32px)] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80"
                        style={{
                            background: '#0f0f16', // Solid dark background for better contrast
                            boxShadow: '0 0 40px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* ─── Header ─── */}
                        <div className="relative px-5 py-4 border-b border-white/5 bg-[#14141e]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <BotIcon className="w-8 h-8" />
                                        </div>
                                        {/* Online indicator */}
                                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#14141e]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm tracking-wide">AlgoBot</h3>
                                        <p className="text-emerald-500/80 text-[10px] font-medium uppercase tracking-widest">Online • AI Tutor</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
                                >
                                    <X className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                                </button>
                            </div>
                        </div>

                        {/* ─── Messages ─── */}
                        <div ref={scrollContainerRef} className="relative flex-1 overflow-y-auto px-4 py-4 space-y-4 footer-gradient-bg">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    {/* Avatar */}
                                    {msg.role === 'assistant' ? (
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                            <BotIcon className="w-6 h-6" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a088ff] to-[#63e3ff] flex-shrink-0 flex items-center justify-center text-xs font-bold text-black border border-white/10">
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    )}

                                    {/* Bubble */}
                                    <div
                                        className={`max-w-[80%] px-4 py-3 text-[13px] leading-relaxed ${msg.role === 'user'
                                                ? 'bg-[#a088ff] text-white rounded-2xl rounded-tr-sm'
                                                : 'bg-[#1e1e2d] text-gray-200 border border-white/5 rounded-2xl rounded-tl-sm'
                                            }`}
                                    >
                                        {renderContent(msg.content)}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Quick Actions */}
                            {messages.length === 1 && user && !isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col gap-2 pl-11"
                                >
                                    <p className="text-xs text-white/40 mb-1">Suggestions:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {QUICK_ACTIONS.map((action) => (
                                            <button
                                                key={action}
                                                onClick={() => doSend(action)}
                                                className="text-left px-3 py-2 rounded-lg text-xs font-medium bg-[#1e1e2d] border border-white/5 text-gray-300 hover:bg-[#252538] hover:border-[#a088ff]/30 hover:text-white transition-all active:scale-95"
                                            >
                                                {action}
                                            </button>
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
                                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
                                        <BotIcon className="w-6 h-6" />
                                    </div>
                                    <div className="bg-[#1e1e2d] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                                        <div className="flex gap-1.5 items-center h-full">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
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
                                    className="absolute bottom-[80px] left-1/2 -translate-x-1/2 p-2 rounded-full bg-[#a088ff] text-white shadow-lg z-10 hover:bg-[#8f76fa]"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* ─── Input Area ─── */}
                        <div className="px-4 py-4 border-t border-white/5 bg-[#14141e]">
                            {user ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type a message..."
                                        disabled={isTyping}
                                        className="flex-1 px-4 py-3 rounded-xl bg-[#1e1e2d] border border-white/5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#a088ff]/50 focus:bg-[#252538] transition-all disabled:opacity-50"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => doSend(input)}
                                        disabled={!input.trim() || isTyping}
                                        className="p-3 rounded-xl bg-[#a088ff] text-white hover:bg-[#8f76fa] transition-colors disabled:opacity-40 disabled:hover:bg-[#a088ff] shadow-lg shadow-[#a088ff]/20"
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
                                        onAuthClick('login');
                                    }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#a088ff] text-white font-semibold text-sm hover:bg-[#8f76fa] transition-colors shadow-lg shadow-[#a088ff]/20"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Log in to chat
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
