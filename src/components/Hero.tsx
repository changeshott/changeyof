"use client";

import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        // Tahan animasi teks selama 1.4 detik agar menunggu semua kartu GSAP selesai muncul
        delayChildren: 1.4, 
        staggerChildren: 0.25, // Jeda kemunculan antara judul, deskripsi, dan tombol
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } // Custom spring-like easing
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="text-center flex flex-col items-center max-w-3xl px-6 relative z-10"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-xl sm:text-xl md:text-2xl font-medium tracking-tight mb-2 leading-tight"
      >
        <motion.span 
          animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_20%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text"
        >
          Ship Updates Without the Friction
        </motion.span>
      </motion.h1>

      <motion.p 
        variants={itemVariants}
        className="text-base sm:text-sm md:text-sm text-white/50 mb-5 max-w-lg leading-relaxed px-4 mx-auto"
      >
        Automate your release notes, broadcast updates instantly, and keep your users engaged with a beautiful in-app changelog.
      </motion.p>

      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-2 items-center w-full justify-center"
      >
        <button onClick={() => router.push('/login')} className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          Get Started
        </button>
      </motion.div>
    </motion.div>
  );
}
