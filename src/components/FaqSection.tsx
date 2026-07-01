"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What exactly is Changeyof?",
    answer: "Changeyof is a complete changelog engine. It provides a beautiful, SEO-optimized public page and an interactive in-app widget to keep your users informed about your latest product updates, fixes, and new features."
  },
  {
    question: "How hard is it to integrate the widget?",
    answer: "It takes less than 2 minutes! You just need to paste a single <script> tag into your HTML or use our lightweight package for modern frameworks like React and Next.js."
  },
  {
    question: "Can I customize the widget to match my brand?",
    answer: "Yes! On our Pro plan, you can fully customize the widget's colors, adjust its placement, and remove the 'Powered by Changeyof' badge so it feels like a native part of your application."
  },
  {
    question: "Will the widget slow down my website?",
    answer: "Not at all. Our script is heavily optimized (under 5KB gzipped) and loads entirely asynchronously. It has absolutely zero impact on your Core Web Vitals and main thread performance."
  },
  {
    question: "How do I write and publish my updates?",
    answer: "We provide a lightning-fast, Notion-like rich text editor. You can use slash commands, drag-and-drop images, and auto-tagging to write release notes. Once published, your widget and public page update instantly in real-time."
  }
];

function FaqItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-neutral-100 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left focus:outline-none group"
      >
        <span className="text-sm md:text-base font-medium text-neutral-800 group-hover:text-black transition-colors">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="ml-4 shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-neutral-50 group-hover:bg-neutral-100 transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-xs md:text-sm text-neutral-500 leading-relaxed pr-8 md:pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  return (
    <section id="faq" className="relative w-full py-16 md:py-24 flex items-center justify-center bg-transparent">
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 w-full flex flex-col items-center">
        
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
            FAQ
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 mb-4 leading-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white rounded-[1.5rem] p-6 md:p-8 shadow-xl border border-neutral-100 shadow-neutral-200/50"
        >
          {faqs.map((faq, index) => (
            <FaqItem key={index} faq={faq} index={index} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
