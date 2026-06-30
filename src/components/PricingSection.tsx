"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Hobby",
    price: "$0",
    period: "/ month",
    description: "Perfect for side projects.",
    features: [
      "1 Project",
      "Unlimited updates",
      "Public page & In-app widget",
      '"Powered by Changeyof" badge',
    ],
    buttonText: "Start for Free",
    isHighlighted: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/ month",
    description: "For products ready to scale.",
    features: [
      "Up to 3 Projects",
      "Remove watermark badge",
      "Custom widget colors",
      "Basic view analytics",
    ],
    buttonText: "Upgrade to Pro",
    isHighlighted: true,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full py-24 md:py-32 relative bg-[#0a0a0a] overflow-hidden border-t border-white/5">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6"
          >
            Simple, Transparent Pricing.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl"
          >
            Designed for solo developers and growing teams.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`relative flex-1 rounded-[2.5rem] p-8 md:p-10 flex flex-col ${
                plan.isHighlighted 
                ? "bg-gradient-to-b from-[#1c1c2e] to-[#0f0f1a] border-2 border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.2)] md:-translate-y-4" 
                : "bg-[#111111] border border-white/10"
              }`}
            >
              {plan.isHighlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-400">{plan.period}</span>
              </div>

              <div className="h-px w-full bg-white/10 mb-8" />

              <ul className="flex flex-col gap-4 mb-10 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-slate-300">
                    <div className={`p-1 rounded-full ${plan.isHighlighted ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-slate-400"}`}>
                      <Check size={16} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${
                  plan.isHighlighted
                  ? "bg-indigo-500 text-white hover:bg-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                  : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
