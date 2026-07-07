"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Sparkles, Zap, Bug, ThumbsUp, Heart, Send } from "lucide-react";

type ChangelogItemType = {
  id: number;
  type: string;
  icon: React.ReactNode;
  title: string;
  date: string;
  description: string;
  likes: number;
  loves: number;
};

const ChangelogItem = ({ item }: { item: ChangelogItemType }) => {
  const [liked, setLiked] = useState(false);
  const [loved, setLoved] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className={`p-4 flex gap-3 border-b border-neutral-100 hover:bg-neutral-50 transition-colors`}
    >
      <div className="flex-shrink-0 mt-1">
        <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center">
          {item.icon}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            item.type === 'feature' ? 'bg-purple-100 text-purple-700' :
            item.type === 'improvement' ? 'bg-blue-100 text-blue-700' :
            'bg-orange-100 text-orange-700'
          }`}>
            {item.type}
          </span>
          <span className="text-[11px] text-neutral-400 font-medium">{item.date}</span>
        </div>
        <h4 className="text-sm font-semibold text-neutral-800 mb-1 leading-snug">{item.title}</h4>
        <p className="text-xs text-neutral-500 leading-relaxed mb-2.5">{item.description}</p>
        
        {/* Interactive Reactions */}
        <div className="flex gap-2">
          <button 
            onClick={() => setLiked(!liked)} 
            className={`text-[11px] flex items-center gap-1 px-2 py-1 rounded-md border transition-all ${
              liked ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:border-neutral-300'
            }`}
          >
            <ThumbsUp className="w-3 h-3" /> {liked ? item.likes + 1 : item.likes}
          </button>
          <button 
            onClick={() => setLoved(!loved)} 
            className={`text-[11px] flex items-center gap-1 px-2 py-1 rounded-md border transition-all ${
              loved ? 'bg-pink-50 border-pink-200 text-pink-600' : 'bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:border-neutral-300'
            }`}
          >
            <Heart className="w-3 h-3" /> {loved ? item.loves + 1 : item.loves}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);
  
  const [unreadCount, setUnreadCount] = useState(1);
  const [isRinging, setIsRinging] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Sync ref with state so event listeners can read current value
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const initialData = [
    {
      id: 1,
      type: "feature",
      icon: <Sparkles className="w-3 h-3 text-purple-500" />,
      title: "Introducing AI Auto-Summaries",
      date: "Today",
      description: "Changeyof now automatically summarizes your git commits into beautiful release notes.",
      likes: 24,
      loves: 12
    },
    {
      id: 2,
      type: "improvement",
      icon: <Zap className="w-3 h-3 text-slate-300" />,
      title: "Lightning Fast Loading",
      date: "Yesterday",
      description: "We've optimized our edge network to serve your widgets 3x faster globally.",
      likes: 18,
      loves: 5
    },
    {
      id: 3,
      type: "fix",
      icon: <Bug className="w-3 h-3 text-orange-500" />,
      title: "Fixed Dark Mode Glitch",
      date: "Oct 24",
      description: "Resolved an issue where the widget would flash white when toggling themes.",
      likes: 8,
      loves: 2
    },
  ];

  const [changelogs, setChangelogs] = useState(initialData);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleNewRelease = () => {
      const newItem = {
        id: Date.now(),
        type: "feature",
        icon: <Sparkles className="w-3 h-3 text-purple-500" />,
        title: "Just Released: Advanced Workflows 🚀",
        date: "Just now",
        description: "You triggered a live update! This is exactly how your users will see new features instantly.",
        likes: 0,
        loves: 0
      };
      
      setChangelogs(prev => [newItem, ...prev]);
      
      // Only show badge/unread count if the widget is closed
      if (!isOpenRef.current) {
        setUnreadCount(prev => prev + 1);
        setIsRinging(true);
        setTimeout(() => setIsRinging(false), 2000);
      }
    };

    window.addEventListener("trigger-new-release", handleNewRelease);
    return () => window.removeEventListener("trigger-new-release", handleNewRelease);
  }, []);

  const toggleWidget = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setUnreadCount(0); // clear unread when opening
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  // Match the hero transition easing
  const customEase = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end" ref={widgetRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: customEase }}
            className="mb-4 w-[320px] md:w-[350px] bg-white border border-neutral-200 shadow-2xl rounded-2xl overflow-hidden origin-bottom-right flex flex-col max-h-[420px]"
            style={{
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Header */}
            <div className="bg-[#111] p-4 text-white relative shrink-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-300/20 to-purple-500/20 rounded-full blur-2xl -mr-8 -mt-8" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-pink-500/20 to-orange-500/20 rounded-full blur-2xl -ml-6 -mb-6" />
              
              <div className="relative z-10 flex items-center gap-2.5 mb-1">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-300 to-purple-600 flex items-center justify-center shadow-lg">
                  <Bell className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold leading-none">Changeyof</h3>
                  <p className="text-white/60 text-[10px] mt-0.5">Product Updates</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-0 overflow-y-auto flex-1 custom-scrollbar">
              <AnimatePresence>
                {changelogs.map((item) => (
                  <ChangelogItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>

            {/* Footer / Subscribe Form */}
            <div className="p-3 bg-neutral-50 border-t border-neutral-100 shrink-0">
              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-green-600 font-medium text-center py-2 bg-green-50 rounded-lg border border-green-100"
                >
                  🎉 Subscribed!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Get updates via email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 text-xs px-3 py-1.5 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-slate-300/20 focus:border-slate-300 transition-all bg-white"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-3 py-1.5 bg-[#111] hover:bg-neutral-800 text-white rounded-md transition-colors flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleWidget}
        animate={isRinging ? {
          rotate: [0, -15, 15, -15, 15, 0],
          transition: { duration: 0.5, repeat: 3 }
        } : {}}
        className="w-12 h-12 bg-gradient-to-br from-[#111] to-neutral-800 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow relative border border-white/10"
      >
        <Bell className="w-5 h-5" />
        
        <AnimatePresence>
          {!isOpen && unreadCount > 0 && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-slate-400 border-2 border-white rounded-full flex items-center justify-center"
            >
              <span className="text-[9px] font-bold text-white">{unreadCount}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && unreadCount > 0 && (
          <span className="absolute inset-0 rounded-full animate-ping bg-slate-300 opacity-20" />
        )}
      </motion.button>
    </div>
  );
}
