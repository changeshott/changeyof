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
      window.location.href = "/dashboard";
    }
  };

  const handleSkip = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("role", formData.role);
    data.append("usage_intent", formData.usage_intent);
    
    const res = await completeOnboarding(data);
    setIsLoading(false);
    
    if (res?.error) {
      alert(res.error);
    } else {
      window.location.href = "/dashboard";
    }
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0a0a0a] z-50 overflow-y-auto flex flex-col items-center justify-start sm:justify-center px-4 py-12 md:py-16">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full"></div>
      
      <div className="max-w-lg w-full mx-auto relative z-10 my-auto">
        <div className="text-center mb-5 relative z-10">
        <motion.h1 
          className="text-2xl md:text-3xl font-medium tracking-tight mb-2 leading-tight"
        >
          <motion.span 
            animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_20%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text"
          >
            Welcome to your new HQ
          </motion.span>
        </motion.h1>
        <p className="text-xs md:text-sm text-white/50 max-w-sm mx-auto leading-relaxed">
          You're just a few steps away from an automated, beautiful changelog. Let's get your workspace set up.
        </p>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step >= i ? 'w-10 bg-white' : 'w-3 bg-white/10'}`}></div>
          ))}
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl relative z-10 overflow-hidden min-h-[250px]">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="p-4 md:p-5 flex-1">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-3 md:space-y-4"
                >
                  <div className="flex items-center gap-2 mb-3 text-indigo-400">
                    <User className="w-5 h-5 md:w-6 md:h-6" />
                    <h2 className="text-base md:text-lg font-semibold text-white">Tell us about yourself</h2>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">What is your role?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Developer", "Founder", "Product Manager", "Designer", "Marketer", "Other"].map(role => (
                        <div 
                          key={role}
                          onClick={() => updateForm('role', role)}
                          className={`cursor-pointer border rounded-xl p-2.5 md:p-3 text-center transition-all ${
                            formData.role === role ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' : 'bg-black border-white/10 text-slate-400 hover:border-white/30'
                          }`}
                        >
                          <span className="text-xs font-medium">{role}</span>
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
                  className="space-y-3 md:space-y-4"
                >
                  <div className="flex items-center gap-2 mb-3 text-emerald-400">
                    <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                    <h2 className="text-base md:text-lg font-semibold text-white">How will you use Changeyof?</h2>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">Primary Intent</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: 'personal', title: 'Personal Projects', desc: 'For side hustles and personal tools' },
                        { id: 'startup', title: 'Startup / Small Team', desc: 'Growing a new product' },
                        { id: 'enterprise', title: 'Enterprise / Large Scale', desc: 'Managing multiple products and teams' },
                      ].map(intent => (
                        <div 
                          key={intent.id}
                          onClick={() => updateForm('usage_intent', intent.id)}
                          className={`cursor-pointer border rounded-xl p-3 flex flex-col transition-all ${
                            formData.usage_intent === intent.id ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300' : 'bg-black border-white/10 text-slate-400 hover:border-white/30'
                          }`}
                        >
                          <span className="text-sm font-semibold mb-0.5">{intent.title}</span>
                          <span className="text-xs opacity-70">{intent.desc}</span>
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
                  className="space-y-3 md:space-y-4"
                >
                  <div className="flex items-center gap-2 mb-3 text-pink-400">
                    <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                    <h2 className="text-base md:text-lg font-semibold text-white">Create your first project</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Project Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.projectName}
                        onChange={(e) => updateForm('projectName', e.target.value)}
                        placeholder="e.g. Tokopedia, Gojek..."
                        className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-pink-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Domain (Optional)</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          value={formData.projectDomain}
                          onChange={(e) => updateForm('projectDomain', e.target.value)}
                          placeholder="e.g. tokopedia.com"
                          className="w-full bg-black border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-pink-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={prevStep}
                className="px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-colors text-xs font-medium"
              >
                Back
              </button>
            ) : <div></div>}

            <div className="flex items-center gap-2">
              {step === 3 && (
                <button
                  type="button"
                  onClick={handleSkip}
                  disabled={isLoading}
                  className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Skip for now
                </button>
              )}
              <button 
                type="submit"
                disabled={isLoading || (step === 3 && !formData.projectName)}
                className="flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? "Saving..." : step < 3 ? "Continue" : "Complete Setup"}
                {!isLoading && (step < 3 ? <ArrowRight className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />)}
              </button>
            </div>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
