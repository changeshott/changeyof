"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { signup, loginWithGithub } from "../login/actions";
import GridSnakes from "@/components/GridSnakes";
import Particles from "@/components/Particles";
import CustomCursor from "@/components/CustomCursor";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  
  const supabase = createClient();

  // Password strength logic
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(score, 4); // Max score 4
  };

  const strength = getPasswordStrength(password);
  
  const getStrengthColor = () => {
    if (strength === 0) return "bg-slate-700";
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-amber-500";
    if (strength === 3) return "bg-blue-400";
    return "bg-emerald-500";
  };

  const getStrengthLabel = () => {
    if (!password) return "";
    if (strength <= 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        window.location.href = "/dashboard";
      }
    };
    checkUser();
  }, [supabase]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback` 
      }
    });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      await loginWithGithub();
    } catch {
      // Next.js redirects throw an error that we must catch and ignore
    }
  };

  const handleAction = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await signup(formData);
        
      if (response && 'error' in response && response.error) {
        setError(response.error);
        setLoading(false);
      } else if (response && 'success' in response && response.success) {
        setSuccess(response.success);
        setLoading(false);
      }
    } catch {
      // Next.js redirect catch
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      <CustomCursor />
      
      {/* Background Elements to match Hero Section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 z-0 bg-curtain opacity-50"></div>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="opacity-30"><GridSnakes /></div>
        <Particles />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,var(--background))]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md px-6 sm:px-0"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)] mx-auto mb-6 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-500"
            >
              <span className="text-black font-extrabold text-xl tracking-tighter leading-none select-none">cf</span>
            </motion.div>
          </Link>
          <h2 className="text-3xl font-medium tracking-tight text-white mb-2">
            Create an account
          </h2>
          <p className="text-sm text-slate-400">
            Already have an account? <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-indigo-400/30 hover:after:bg-indigo-300">Log in</Link>
          </p>
        </div>

        <div className="bg-[#111111]/80 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {success ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6"
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-6 shadow-[0_0_30px_rgba(52,211,153,0.15)]">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3 tracking-tight">Check your email</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                We sent a confirmation link to <br/><span className="text-white font-medium">{email}</span>. <br/>
                Please click it to activate your account.
              </p>
              <Link href="/login" className="inline-block px-8 py-3 border border-white/20 rounded-xl shadow-sm text-sm font-medium text-white bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all active:scale-95 group">
                <span className="group-hover:text-white transition-colors">Return to Login</span>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="group relative flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-medium text-white overflow-hidden transition-all active:scale-95 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                  <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="relative z-10">Google</span>
                </button>

                <button
                  onClick={handleGithubLogin}
                  disabled={loading}
                  className="group relative flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-medium text-white overflow-hidden transition-all active:scale-95 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                  <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  <span className="relative z-10">GitHub</span>
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-[#111111] text-slate-500 font-medium">Or sign up with email</span>
                </div>
              </div>

              <form className="space-y-5">
                <div className="group">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5 transition-colors group-focus-within:text-white">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all sm:text-sm hover:bg-white/[0.07]"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5 transition-colors group-focus-within:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 pr-11 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all sm:text-sm hover:bg-white/[0.07]"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3"
                    >
                      <div className="flex gap-1.5 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        {[...Array(4)].map((_, i) => (
                          <div 
                            key={i}
                            className={`h-full flex-1 rounded-full transition-all duration-300 ${i < strength ? getStrengthColor() : 'bg-transparent'}`}
                          />
                        ))}
                      </div>
                      <p className={`text-xs mt-1.5 font-medium ${getStrengthColor().replace('bg-', 'text-')}`}>
                        {getStrengthLabel()} password
                      </p>
                    </motion.div>
                  )}
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-red-400 text-sm font-medium text-center bg-red-400/10 py-2.5 rounded-lg border border-red-400/20"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    formAction={handleAction}
                    disabled={loading || !email || !password || strength < 2}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] text-sm font-medium text-black bg-white hover:bg-slate-100 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                    {loading ? <Loader2 className="w-5 h-5 animate-spin relative z-10" /> : <span className="relative z-10">Sign Up</span>}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </main>
  );
}
