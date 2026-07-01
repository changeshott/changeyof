"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { PenTool, Code, Rocket } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: PenTool,
    title: "Write an Update",
    desc: "Draft your latest release note in our clean, distraction-free dashboard."
  },
  {
    icon: Code,
    title: "Copy the Snippet",
    desc: "Grab the unique, lightweight <script> tag generated for your project."
  },
  {
    icon: Rocket,
    title: "Paste & Publish",
    desc: "Drop it into your root layout file, and your changelog is instantly live."
  }
];

export default function IntegrationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"]
  });

  const pathTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "M 0 100 Q 500 100 1000 100 L 1000 100 L 0 100 Z",
      "M 0 0 Q 500 200 1000 0 L 1000 100 L 0 100 Z"
    ]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="integrations" ref={containerRef} className="w-full bg-transparent relative z-30 flex flex-col items-center min-h-[100dvh]">

      {/* Scroll-based Cone Transition overlapping the section above */}
      <div className="absolute bottom-full left-0 w-full h-[100px] sm:h-[150px] overflow-hidden pointer-events-none">
        <motion.svg
          className="absolute bottom-[-1px] left-0 w-full h-full z-0"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d={pathTransform}
            fill="#fafafa"
          />
        </motion.svg>

        {/* Seamless Grid extension over the cone */}
        <div className="absolute bottom-0 left-0 w-full h-[200px] z-10 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] mix-blend-multiply" style={{ backgroundPosition: 'bottom left', clipPath: 'inset(0 0 1px 0)' }}></div>
      </div>



      <div className="w-full flex flex-col items-center justify-start pt-16 pb-16 md:pt-32 md:pb-24 px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center flex flex-col items-center max-w-5xl px-4 md:px-6 relative z-10"
        >
          {/* Header */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 leading-tight"
          >
            <motion.span
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="bg-[linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.4)_20%,rgba(0,0,0,1)_40%,rgba(0,0,0,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text"
            >
              Live in 3 Simple Steps
            </motion.span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-sm md:text-sm text-slate-500 mb-8 md:mb-12 max-w-lg leading-relaxed px-4 mx-auto"
          >
            Integration is fast and seamless. Add the snippet to your project and broadcast your updates instantly.
          </motion.p>

          {/* Steps Container */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full relative"
          >
            {/* Animated Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[28px] md:top-[32px] left-[15%] right-[15%] h-[2px] bg-slate-200 z-0 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-transparent via-slate-400 to-transparent"
              />
            </div>

            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="relative z-10 flex flex-col items-center group"
                >
                  {/* Step Number / Icon Container */}
                  <div className="relative mb-4 md:mb-6">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-slate-50 shadow-sm">
                      {/* Number Indicator */}
                      <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px] md:text-xs z-20">
                        {idx + 1}
                      </div>

                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-600 relative z-10 group-hover:text-slate-900 transition-colors" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="text-center w-full max-w-sm">
                    <h3 className="text-base md:text-lg font-medium text-slate-900 mb-1.5 md:mb-2 tracking-tight group-hover:text-slate-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
