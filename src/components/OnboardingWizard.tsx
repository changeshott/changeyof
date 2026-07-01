"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, User, Briefcase, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { completeOnboarding } from "@/app/actions/dashboard";
import { useRouter } from "next/navigation";

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    role: "",
    usage_intent: "",
    projectName: "",
    projectDomain: ""
  });

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
      return;
    }

    setIsLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    
    const res = await completeOnboarding(data);
    setIsLoading(false);
    
    if (res?.error) {
      alert(res.error);
    } else {
      router.refresh();
    }
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 min-h-[80vh] flex flex-col justify-center relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full"></div>
      
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Changeyof</h1>
        <p className="text-slate-400">Let's get your workspace set up in just a few steps.</p>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-2 rounded-full transition-all duration-500 ${step >= i ? 'w-12 bg-indigo-500' : 'w-4 bg-white/10'}`}></div>
          ))}
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl relative z-10 overflow-hidden min-h-[400px]">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="p-8 flex-1">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 mb-6 text-indigo-400">
                    <User className="w-8 h-8" />
                    <h2 className="text-xl font-semibold text-white">Tell us about yourself</h2>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">What is your role?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Developer", "Founder", "Product Manager", "Designer", "Marketer", "Other"].map(role => (
                        <div 
                          key={role}
                          onClick={() => updateForm('role', role)}
                          className={`cursor-pointer border rounded-xl p-4 text-center transition-all ${
                            formData.role === role ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' : 'bg-black border-white/10 text-slate-400 hover:border-white/30'
                          }`}
                        >
                          <span className="text-sm font-medium">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 mb-6 text-emerald-400">
                    <Briefcase className="w-8 h-8" />
                    <h2 className="text-xl font-semibold text-white">How will you use Changeyof?</h2>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Primary Intent</label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'personal', title: 'Personal Projects', desc: 'For side hustles and personal tools' },
                        { id: 'startup', title: 'Startup / Small Team', desc: 'Growing a new product' },
                        { id: 'enterprise', title: 'Enterprise / Large Scale', desc: 'Managing multiple products and teams' },
                      ].map(intent => (
                        <div 
                          key={intent.id}
                          onClick={() => updateForm('usage_intent', intent.id)}
                          className={`cursor-pointer border rounded-xl p-4 flex flex-col transition-all ${
                            formData.usage_intent === intent.id ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300' : 'bg-black border-white/10 text-slate-400 hover:border-white/30'
                          }`}
                        >
                          <span className="text-base font-semibold mb-1">{intent.title}</span>
                          <span className="text-sm opacity-70">{intent.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 mb-6 text-pink-400">
                    <Rocket className="w-8 h-8" />
                    <h2 className="text-xl font-semibold text-white">Create your first project</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Project Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.projectName}
                        onChange={(e) => updateForm('projectName', e.target.value)}
                        placeholder="e.g. Tokopedia, Gojek..."
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-pink-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Domain (Optional)</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          value={formData.projectDomain}
                          onChange={(e) => updateForm('projectDomain', e.target.value)}
                          placeholder="e.g. tokopedia.com"
                          className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-pink-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 border-t border-white/10 bg-white/5 flex justify-between items-center">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={prevStep}
                className="px-6 py-2.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                Back
              </button>
            ) : <div></div>}

            <button 
              type="submit"
              disabled={isLoading || (step === 3 && !formData.projectName)}
              className="flex items-center gap-2 bg-white text-black px-8 py-2.5 rounded-lg font-semibold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? "Saving..." : step < 3 ? "Continue" : "Complete Setup"}
              {!isLoading && (step < 3 ? <ArrowRight className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
