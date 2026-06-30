"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Will this slow down my website's loading speed?",
    answer: "Not at all. Our script is highly optimized and loads asynchronously, ensuring your web application remains incredibly fast."
  },
  {
    question: "Does it work with modern frameworks like Next.js?",
    answer: "Absolutely. Since it uses vanilla JavaScript, you can seamlessly drop the script tag into your Next.js layout, or easily style alongside Tailwind CSS environments without any conflicts."
  },
  {
    question: "Do I have to use the in-app widget?",
    answer: "No. You can simply use the standalone public page and link to it from your footer if you prefer not to have a floating widget on your site."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  return (
    <section id="faq" className="w-full py-24 md:py-32 relative bg-[#0a0a0a] overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-medium tracking-tight text-white"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-[#111111] border-indigo-500/30' : 'bg-transparent border-white/10 hover:border-white/20'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-medium text-lg md:text-xl transition-colors ${isOpen ? 'text-white' : 'text-slate-300'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 ml-4 rounded-full p-1 ${isOpen ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500'}`}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-slate-400 text-base md:text-lg leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
