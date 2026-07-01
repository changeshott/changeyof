"use client";

import { motion, Variants } from "framer-motion";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Hobby",
    price: "$0",
    description: "Perfect for side projects.",
    features: [
      "1 Project",
      "Unlimited updates",
      "Public page & In-app widget",
      '"Powered by Changeyof" badge'
    ],
    buttonText: "Start for Free",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    description: "For products ready to scale.",
    features: [
      "Up to 3 Projects",
      "Remove watermark badge",
      "Custom widget colors",
      "Basic view analytics"
    ],
    buttonText: "Upgrade to Pro",
    isPopular: true,
  }
];

const listContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

export default function PricingSection() {
  const router = useRouter();
  return (
    <section id="pricing" className="relative w-full min-h-[100dvh] py-16 md:py-24 flex items-center justify-center bg-transparent">
      {/* Animated Background decorations (Neutral tones) */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-neutral-200/40 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-neutral-300/30 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 w-full flex flex-col items-center mt-8">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 text-[10px] md:text-xs font-medium mb-4 shadow-sm"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-neutral-900 animate-pulse"></span>
            Pricing
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 mb-4 leading-tight">
            Simple, Transparent Pricing.
          </h2>
          <p className="text-base sm:text-sm md:text-sm text-slate-500 max-w-lg leading-relaxed px-4 mx-auto">
            Designed for solo developers and growing teams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-8 w-full max-w-2xl mx-auto relative">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className={`relative flex flex-col p-6 md:p-8 rounded-[1.5rem] bg-white transition-all duration-300 w-full ${plan.isPopular
                  ? "ring-1 ring-neutral-900 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] md:scale-105 z-10"
                  : "border border-neutral-200 shadow-xl hover:shadow-2xl hover:shadow-neutral-300/50"
                }`}
            >
              {/* Shiny shimmer effect for the popular plan */}
              {plan.isPopular && (
                <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] pointer-events-none z-0">
                  <motion.div
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12 mix-blend-overlay"
                  />
                </div>
              )}

              {plan.isPopular && (
                <div className="absolute -top-3 inset-x-0 flex justify-center z-10">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-neutral-600 animate-ping opacity-25"></span>
                    <span className="relative bg-neutral-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-6 relative z-10">
                <h3 className="text-lg font-medium text-neutral-900 mb-1">{plan.name} Plan</h3>
                <p className="text-xs md:text-sm text-neutral-500 mb-4 h-[32px]">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">{plan.price}</span>
                  <span className="text-neutral-500 font-medium text-xs md:text-sm">/ month</span>
                </div>
              </div>

              <div className="flex-1 mb-8 relative z-10">
                <motion.ul
                  variants={listContainer}
                  initial="hidden"
                  whileInView="show"
                  exit="hidden"
                  viewport={{ once: false, amount: 0.1 }}
                  className="space-y-3"
                >
                  {plan.features.map((feature, i) => (
                    <motion.li variants={listItem} key={i} className="flex items-start gap-2.5 text-neutral-700 font-medium group">
                      <div className="mt-0.5 bg-neutral-100 group-hover:bg-neutral-200 transition-colors rounded-full p-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5 text-neutral-900 stroke-[3]" />
                      </div>
                      <span className="text-xs md:text-sm leading-snug">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <motion.button
                onClick={() => router.push('/login')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative z-10 w-full py-2.5 rounded-lg font-medium text-xs md:text-sm transition-all duration-300 ${plan.isPopular
                    ? "bg-neutral-900 text-white shadow-[0_5px_15px_-3px_rgba(0,0,0,0.3)] hover:bg-black hover:shadow-[0_8px_20px_-3px_rgba(0,0,0,0.4)]"
                    : "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 shadow-sm hover:shadow"
                  }`}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
