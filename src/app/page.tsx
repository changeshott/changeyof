"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import GridSnakes from "@/components/GridSnakes";
import InteractiveScene from "@/components/InteractiveScene";
import Particles from "@/components/Particles";
import LightAgitationSection from "@/components/LightAgitationSection";
import CoreFeaturesSection from "@/components/CoreFeaturesSection";
import IntegrationSection from "@/components/IntegrationSection";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import InteractiveDemoSection from "@/components/InteractiveDemoSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import FloatingWidget from "@/components/FloatingWidget";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);


  const { scrollY, scrollYProgress } = useScroll();

  // Handle scroll lock delay on initial load
  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 2500); // 2.5s delay

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100); // Sembunyikan navbar setelah scroll 100px ke bawah
  });

  // Animasi Premium: Saat putih meluncur naik, hero perlahan meredup dan "ketarik" ke atas sedikit (parallax)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // Navbar disembunyikan saat sedang fokus kartu ATAU saat pengguna scroll ke bawah
  const isNavbarHidden = !!activeCard || isScrolled;

  return (
    <main className="relative bg-[#0a0a0a]">
      {/* Global Elements */}
      <CustomCursor />
      <FloatingWidget />
      <div className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-[100] w-full flex justify-center pointer-events-none">
        <Navbar isHidden={isNavbarHidden} />
      </div>

      {/* Hero Section - sticky so it stays in background as we scroll */}
      {/* No scaling down so the background remains expansive and edges are not visible */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0"
      >
        {/* Moving Black Curtain Background */}
        <div className="absolute inset-0 z-0 bg-curtain pointer-events-none"></div>

        {/* Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        {/* Glowing Neon Snake Animation on Grid */}
        <GridSnakes />

        {/* Subtle Dust Particles */}
        <Particles />

        {/* Radial fade for grid so it blends into the dark edges */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,var(--background))] pointer-events-none"></div>

        {/* Interactive 3D Camera Scene */}
        <InteractiveScene activeCard={activeCard} setActiveCard={setActiveCard} />
      </motion.div>

      {/* Next Section: Slides up naturally over the sticky hero background */}
      {/* Passing z-20 so it goes over the hero (z-0) but under the Navbar (z-[100]) */}
      <motion.div
        className="relative z-20 w-full min-h-[100dvh] bg-[#fafafa] mt-[80px]"
      >
        {/* The subtle wave that shifts based on scroll */}
        <div className="absolute bottom-full left-0 w-full h-[80px] overflow-hidden pointer-events-none flex items-end">
          {/* Premium Frosted Glass Halo Effect behind the wave */}
          <div className="absolute bottom-[-1px] left-0 w-full h-[80px] bg-gradient-to-b from-transparent via-white/40 to-[#fafafa] backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,transparent,black)]" />

          <motion.svg
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute bottom-[-2px] left-0 w-[200%] h-[40px]"
            viewBox="0 0 2000 40"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 Q250,40 500,20 T1000,20 T1500,20 T2000,20 L2000,40 L0,40 Z"
              fill="#fafafa"
            />
          </motion.svg>
        </div>

        {/* Content container */}
        <div className="w-full relative">
          <LightAgitationSection />
          <CoreFeaturesSection />

          {/* Continuous Light Theme Wrapper */}
          <div className="relative w-full">
            {/* Seamless Grid Pattern that spans across all these sections */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

            <IntegrationSection />
            <InteractiveDemoSection />
            <PricingSection />
            <FaqSection />
            <Footer />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
