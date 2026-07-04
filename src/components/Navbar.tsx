"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  {  
    name: "Product", 
    dropdown: [
      {
        title: "COMMUNICATE",
        items: [
          { name: "Changelog & News Feed", desc: "Your branded updates hub - on your domain", href: "/product/changelog" },
          { name: "In-App Widgets", desc: "10+ widget types to reach users inside your app", href: "/product/in-widget" },
          { name: "In-App Notifications", desc: "Reach users inside your product with widgets and toasts", href: "/product/in-app-notifications" },
          { name: "Multi-Channel Updates", desc: "In-app, email, Slack, RSS - one message, every channel", href: "/product/multi-channel-updates" },
          { name: "Mobile Announcements", desc: "Native SDKs for iOS, Android, and Flutter", href: "/product/mobile-announcements" },
        ]
      },
      {
        title: "UNDERSTAND",
        items: [
          { name: "Feature Requests & Voting", desc: "Let users shape your roadmap", href: "/product/feature-requests" },
          { name: "NPS & Satisfaction", desc: "Track and improve customer happiness", href: "/product/nps-satisfaction" },
          { name: "Feedback & Reactions", desc: "Comments, reactions, and sentiment at a glance", href: "/product/feedback-reactions" },
          { name: "Segmentation", desc: "Right message, right users, right time", href: "/product/segmentation" },
          { name: "Targeted User Communication", desc: "Segmentation and analytics", href: "/product/targeted-communication" },
        ]
      },
      {
        title: "EXTEND",
        items: [
          { name: "Integrations", desc: "Slack, Jira, Intercom + 7,000 more via Zapier", href: "/product/integrations" },
          { name: "GraphQL API & Webhooks", desc: "Full API access with 11 webhook events", href: "/product/api-webhooks" },
          { name: "SDKs & Frameworks", desc: "React, Vue, Angular, iOS, Flutter, React Native", href: "/product/sdks-frameworks" },
          { name: "MCP Server", desc: "Claude, ChatGPT & agents publish for you", href: "/product/mcp-server" },
          { name: "AI Post Generator", desc: "Draft announcements with AI in seconds", href: "/product/ai-post-generator" },
          { name: "Customization", desc: "Branding, whitelabel & remove branding", href: "/product/customization" },
        ]
      }
    ]
  },
  { name: "Integrations", href: "#integrations" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" }
];

export default function Navbar({ isHidden = false, theme = "dark" }: { isHidden?: boolean; theme?: "dark" | "light" }) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [initialMountDelay, setInitialMountDelay] = useState(2.6);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [pinnedLink, setPinnedLink] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Check auth status
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();

    const timer = setTimeout(() => {
      setIsExpanded(true);
      setInitialMountDelay(0); // Remove delay for subsequent animations like hiding
    }, 3100); // 2.6s (drop delay) + 0.5s = 3.1s
    return () => clearTimeout(timer);
  }, [supabase.auth]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    // 'items-start' agar ekspansi height ke arah bawah
    <div className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-50 flex justify-center items-start w-full pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0, width: 56, height: 56, borderRadius: 56 }}
        animate={{ 
          y: isHidden ? -100 : 0, 
          opacity: isHidden ? 0 : 1, 
          width: isExpanded ? (isMobileMenuOpen ? "95vw" : "auto") : 56,
          height: isMobileMenuOpen ? "auto" : 56,
          borderRadius: isMobileMenuOpen ? 28 : 56
        }}
        transition={{
          y: { type: "spring", stiffness: 250, damping: 20, delay: initialMountDelay },
          opacity: { delay: initialMountDelay, duration: isHidden ? 0.4 : 0.2 },
          width: { type: "spring", stiffness: 150, damping: 20 },
          height: { type: "spring", stiffness: 150, damping: 20 },
          borderRadius: { duration: 0.2 }
        }}
        className={`relative flex flex-col pointer-events-auto ${isMobileMenuOpen ? 'overflow-hidden' : ''} ${
          theme === 'light'
            ? 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-200'
            : 'bg-white/[0.04] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Animated Laser Border - Only for Dark Theme */}
        {theme === 'dark' && (
          <div className="absolute inset-0 z-0 pointer-events-none rounded-[inherit] p-[1px] overflow-hidden" style={{ WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-30"
            />
            <div className="absolute inset-0 rounded-[inherit] border border-white/5 pointer-events-none" />
          </div>
        )}

        {/* Top Row: Logo + Desktop Links + Mobile Hamburger */}
        <div className="flex items-center justify-between w-full h-[56px] px-1.5 flex-shrink-0 relative z-10">
          
          {/* Logo */}
          <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center group">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center relative transition-all duration-300 ${
              theme === 'light' 
                ? 'bg-slate-900 shadow-md group-hover:shadow-lg' 
                : 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.8)]'
            }`}>
              <span className={`font-extrabold text-sm tracking-tighter leading-none select-none ${theme === 'light' ? 'text-white' : 'text-black'}`}>cf</span>
              <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 border-[1.5px] rounded-full ${
                theme === 'light' ? 'bg-white border-slate-900' : 'bg-[#050505] border-white'
              }`}></div>
            </div>
          </div>
          
          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
                className="flex items-center gap-1 md:gap-4 pr-1 whitespace-nowrap"
              >
                {/* Magnetic Hover Links - Desktop Only */}
                <div 
                  className={`hidden md:flex items-center gap-1 text-sm font-medium px-2 ${theme === 'light' ? 'text-slate-500' : 'text-white/60'}`}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {navLinks.map((link) => (
                    <div
                      key={link.name}
                      className="relative px-4 py-2"
                      onMouseEnter={() => setHoveredLink(link.name)}
                    >
                      {hoveredLink === link.name && !pinnedLink && (
                        <motion.div
                          layoutId="navbar-hover"
                          className={`absolute inset-0 rounded-full ${theme === 'light' ? 'bg-slate-100' : 'bg-white/10'}`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {pinnedLink === link.name && (
                        <motion.div
                          layoutId="navbar-pinned"
                          className={`absolute inset-0 rounded-full ${theme === 'light' ? 'bg-slate-200' : 'bg-white/20'}`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {link.href ? (
                        <Link href={link.href} className={`relative z-10 transition-colors duration-300 flex items-center gap-1 ${(hoveredLink === link.name || pinnedLink === link.name) ? (theme === 'light' ? 'text-slate-900' : 'text-white') : ''}`}>
                          {link.name}
                        </Link>
                      ) : (
                        <button 
                          onClick={() => setPinnedLink(pinnedLink === link.name ? null : link.name)}
                          className={`relative z-10 transition-colors duration-300 flex items-center gap-1 ${(hoveredLink === link.name || pinnedLink === link.name) ? (theme === 'light' ? 'text-slate-900' : 'text-white') : ''}`}>
                          {link.name} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${pinnedLink === link.name ? "rotate-180 opacity-100" : "opacity-50"}`} />
                        </button>
                      )}

                      {/* Dropdown Menu */}
                      {link.dropdown && (hoveredLink === link.name || pinnedLink === link.name) && (
                        <div className="fixed top-[64px] md:top-[72px] left-1/2 -translate-x-1/2 pt-4 w-max min-w-[400px] pointer-events-auto">
                          <motion.div 
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            className={`border rounded-xl p-4 shadow-2xl flex flex-row gap-6 ${
                              theme === 'light' 
                                ? 'bg-white border-slate-200' 
                                : 'bg-[#111]/90 backdrop-blur-xl border-white/10'
                            }`}
                          >
                            {link.dropdown.map((section, idx) => (
                              <div key={idx} className="flex flex-col gap-2 w-[220px]">
                                <h4 className={`text-[10px] font-bold tracking-widest uppercase ${theme === 'light' ? 'text-slate-400' : 'text-white/40'}`}>{section.title}</h4>
                                <div className="flex flex-col gap-0.5">
                                  {section.items.map((item, i) => (
                                    <Link key={i} href={item.href} onClick={() => setPinnedLink(null)} className={`group/item flex flex-col p-2 -mx-2 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}>
                                      <span className={`text-[13px] font-semibold transition-colors ${theme === 'light' ? 'text-slate-800 group-hover/item:text-slate-900' : 'text-white/80 group-hover/item:text-white'}`}>{item.name}</span>
                                      <span className={`text-[11px] mt-0 whitespace-normal leading-snug ${theme === 'light' ? 'text-slate-500' : 'text-white/50'}`}>{item.desc}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                {user ? (
                  <button onClick={() => router.push('/dashboard')} className={`hidden md:flex px-5 py-2.5 text-sm font-semibold rounded-full transition-all hover:scale-105 active:scale-95 flex-shrink-0 relative group overflow-hidden ${
                    theme === 'light' ? 'bg-slate-900 text-white hover:bg-black' : 'bg-white text-black hover:bg-white/90'
                  }`}>
                    <span className="relative z-10">Dashboard</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                  </button>
                ) : (
                  <button onClick={() => router.push('/login')} className={`hidden md:flex px-5 py-2.5 text-sm font-semibold rounded-full transition-all hover:scale-105 active:scale-95 flex-shrink-0 relative group overflow-hidden ${
                    theme === 'light' ? 'bg-slate-900 text-white hover:bg-black' : 'bg-white text-black hover:bg-white/90'
                  }`}>
                    <span className="relative z-10">Start Free</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                  </button>
                )}

                {/* Mobile Hamburger Menu (Shows only on mobile) */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`md:hidden flex flex-col gap-1.5 justify-center items-center w-9 h-9 rounded-full transition-colors ml-1 ${theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`}
                >
                  <motion.div 
                    animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 4 : 0 }} 
                    className={`w-4 h-[1.5px] origin-center ${theme === 'light' ? 'bg-slate-900' : 'bg-white'}`} 
                  />
                  <motion.div 
                    animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -3.5 : 0 }} 
                    className={`w-4 h-[1.5px] origin-center ${theme === 'light' ? 'bg-slate-900' : 'bg-white'}`} 
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
              exit={{ opacity: 0, height: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`flex flex-col gap-5 px-6 pb-6 pt-2 md:hidden w-full mt-1 relative z-10 border-t max-h-[75vh] overflow-y-auto custom-scrollbar ${
                theme === 'light' ? 'border-slate-100' : 'border-white/5'
              }`}
            >
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-3">
                  {link.href ? (
                    <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`text-sm font-medium transition-colors ${theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-white/60 hover:text-white'}`}>{link.name}</Link>
                  ) : (
                    <>
                      <div className={`text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-white/60'}`}>{link.name}</div>
                      {link.dropdown && (
                        <div className={`flex flex-col gap-4 pl-4 mt-1 border-l ${theme === 'light' ? 'border-slate-200' : 'border-white/10'}`}>
                          {link.dropdown.map((section, idx) => (
                            <div key={idx} className="flex flex-col gap-3">
                              <h4 className={`text-[10px] font-bold tracking-widest uppercase ${theme === 'light' ? 'text-slate-400' : 'text-white/40'}`}>{section.title}</h4>
                              <div className="flex flex-col gap-3">
                                {section.items.map((item, i) => (
                                  <Link key={i} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col gap-0.5">
                                    <span className={`text-sm font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>{item.name}</span>
                                    <span className={`text-xs leading-relaxed whitespace-normal ${theme === 'light' ? 'text-slate-500' : 'text-white/40'}`}>{item.desc}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className={`mt-2 pt-5 border-t flex flex-col gap-3 ${theme === 'light' ? 'border-slate-200' : 'border-white/10'}`}>
                {user ? (
                  <button onClick={() => { router.push('/dashboard'); setIsMobileMenuOpen(false); }} className={`w-full py-3.5 text-sm font-semibold rounded-xl transition-all active:scale-95 flex justify-center items-center ${theme === 'light' ? 'bg-slate-900 text-white' : 'bg-white text-black'}`}>
                    Dashboard
                  </button>
                ) : (
                  <button onClick={() => { router.push('/login'); setIsMobileMenuOpen(false); }} className={`w-full py-3.5 text-sm font-semibold rounded-xl transition-all active:scale-95 flex justify-center items-center ${theme === 'light' ? 'bg-slate-900 text-white' : 'bg-white text-black'}`}>
                    Start Free
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </div>
  );
}
