"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { 
    name: "Product", 
    dropdown: [
      {
        title: "COMMUNICATE",
        items: [
          { name: "Changelog & News Feed", desc: "Your branded updates hub - on your domain", href: "/product/changelog" },
          { name: "In-App Widgets", desc: "10+ widget types to reach users inside your app", href: "#widgets" },
          { name: "In-App Notifications", desc: "Reach users inside your product with widgets and toasts", href: "#notifications" },
          { name: "Multi-Channel Updates", desc: "In-app, email, Slack, RSS - one message, every channel", href: "#multi-channel" },
          { name: "Mobile Announcements", desc: "Native SDKs for iOS, Android, and Flutter", href: "#mobile" },
        ]
      }
    ]
  },
  { name: "Integrations", href: "#integrations" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" }
];

export default function Navbar({ isHidden = false }: { isHidden?: boolean }) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [initialMountDelay, setInitialMountDelay] = useState(2.6);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
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
  }, []);

  return (
    // 'items-start' agar ekspansi height ke arah bawah
    <div className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-50 flex justify-center items-start w-full pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0, width: 56, height: 56, borderRadius: 56 }}
        animate={{ 
          y: isHidden ? -100 : 0, 
          opacity: isHidden ? 0 : 1, 
          width: isExpanded ? (isMobileMenuOpen ? 280 : "auto") : 56,
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
        className={`relative flex flex-col bg-white/[0.04] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] pointer-events-auto ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}
      >
        {/* Animated Laser Border */}
        <div className="absolute inset-0 z-0 pointer-events-none rounded-[inherit] p-[1px] overflow-hidden" style={{ WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-30"
          />
          <div className="absolute inset-0 rounded-[inherit] border border-white/5 pointer-events-none" />
        </div>

        {/* Top Row: Logo + Desktop Links + Mobile Hamburger */}
        <div className="flex items-center justify-between w-full h-[56px] px-1.5 flex-shrink-0 relative z-10">
          
          {/* Logo */}
          <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center group">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] transition-all duration-300">
              <span className="text-black font-extrabold text-sm tracking-tighter leading-none select-none">cf</span>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#050505] border-[1.5px] border-white rounded-full"></div>
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
                  className="hidden md:flex items-center gap-1 text-sm font-medium text-white/60 px-2"
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {navLinks.map((link) => (
                    <div
                      key={link.name}
                      className="relative px-4 py-2"
                      onMouseEnter={() => setHoveredLink(link.name)}
                    >
                      {hoveredLink === link.name && (
                        <motion.div
                          layoutId="navbar-hover"
                          className="absolute inset-0 bg-white/10 rounded-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {link.href ? (
                        <Link href={link.href} className={`relative z-10 transition-colors duration-300 flex items-center gap-1 ${hoveredLink === link.name ? 'text-white' : ''}`}>
                          {link.name}
                        </Link>
                      ) : (
                        <button className={`relative z-10 transition-colors duration-300 flex items-center gap-1 ${hoveredLink === link.name ? 'text-white' : ''}`}>
                          {link.name} <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                        </button>
                      )}

                      {/* Dropdown Menu */}
                      {link.dropdown && hoveredLink === link.name && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[400px]">
                          <motion.div 
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            className="bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-6"
                          >
                            {link.dropdown.map((section, idx) => (
                              <div key={idx} className="flex flex-col gap-3">
                                <h4 className="text-[10px] font-bold text-white/40 tracking-widest uppercase">{section.title}</h4>
                                <div className="flex flex-col gap-1">
                                  {section.items.map((item, i) => (
                                    <Link key={i} href={item.href} className="group/item flex flex-col p-3 -mx-3 rounded-xl hover:bg-white/5 transition-colors">
                                      <span className="text-sm font-semibold text-white group-hover/item:text-indigo-400 transition-colors">{item.name}</span>
                                      <span className="text-xs text-white/50 mt-0.5 whitespace-normal leading-relaxed">{item.desc}</span>
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
                  <button onClick={() => router.push('/dashboard')} className="px-5 py-2.5 text-sm font-semibold text-black bg-white rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex-shrink-0 relative group overflow-hidden">
                    <span className="relative z-10">Dashboard</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                  </button>
                ) : (
                  <button onClick={() => router.push('/login')} className="px-5 py-2.5 text-sm font-semibold text-black bg-white rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex-shrink-0 relative group overflow-hidden">
                    <span className="relative z-10">Start Free</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                  </button>
                )}

                {/* Mobile Hamburger Menu (Shows only on mobile) */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden flex flex-col gap-1.5 justify-center items-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors ml-1"
                >
                  <motion.div 
                    animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 4 : 0 }} 
                    className="w-4 h-[1.5px] bg-white origin-center" 
                  />
                  <motion.div 
                    animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -3.5 : 0 }} 
                    className="w-4 h-[1.5px] bg-white origin-center" 
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
              className="flex flex-col gap-5 px-6 pb-6 pt-2 md:hidden w-full border-t border-white/5 mt-1 relative z-10"
            >
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-3">
                  {link.href ? (
                    <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-white text-sm font-medium transition-colors">{link.name}</Link>
                  ) : (
                    <>
                      <div className="text-white/60 text-sm font-medium">{link.name}</div>
                      {link.dropdown && (
                        <div className="flex flex-col gap-4 pl-4 border-l border-white/10 mt-1">
                          {link.dropdown.map((section, idx) => (
                            <div key={idx} className="flex flex-col gap-3">
                              <h4 className="text-[10px] font-bold text-white/40 tracking-widest uppercase">{section.title}</h4>
                              <div className="flex flex-col gap-3">
                                {section.items.map((item, i) => (
                                  <Link key={i} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col gap-0.5">
                                    <span className="text-sm font-semibold text-white">{item.name}</span>
                                    <span className="text-xs text-white/40 leading-relaxed whitespace-normal">{item.desc}</span>
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
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </div>
  );
}
