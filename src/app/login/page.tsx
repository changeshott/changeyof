"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Loader2, Wand2 } from "lucide-react";
import { login, signup, loginWithGithub, loginWithMagicLink } from "./actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const supabase = createClient();

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
    } catch (err) {
      // Next.js redirects throw an error that we must catch and ignore
    }
  };

  const handleAction = async (formData: FormData, action: 'login' | 'signup' | 'magic') => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      let response;
      if (action === 'login') response = await login(formData);
      else if (action === 'signup') response = await signup(formData);
      else if (action === 'magic') response = await loginWithMagicLink(formData);
        
      if (response && 'error' in response && response.error) {
        setError(response.error);
        setLoading(false);
      } else if (response && 'success' in response && response.success) {
        setSuccess(response.success);
        setLoading(false);
      }
    } catch (err) {
      // Next.js redirect catch
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] mx-auto mb-6 hover:scale-105 transition-transform">
            <span className="text-black font-extrabold text-xl tracking-tighter leading-none select-none">cf</span>
          </div>
        </Link>
        <h2 className="text-center text-3xl font-medium tracking-tight text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Sign in to your account or create a new one
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#111111] py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/5">
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex justify-center items-center gap-2 py-3 px-4 border border-white/10 rounded-xl shadow-sm bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>

            <button
              onClick={handleGithubLogin}
              disabled={loading}
              className="flex justify-center items-center gap-2 py-3 px-4 border border-white/10 rounded-xl shadow-sm bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#111111] text-slate-500">Or continue with</span>
            </div>
          </div>

          <form className="space-y-5 mt-6">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm bg-black/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Password (Optional for Magic Link)
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm bg-black/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm font-medium text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                {error}
              </div>
            )}

            {success && (
              <div className="text-emerald-400 text-sm font-medium text-center bg-emerald-400/10 py-2 rounded-lg border border-emerald-400/20">
                {success}
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex gap-3">
                <button
                  type="submit"
                  formAction={(formData) => handleAction(formData, 'login')}
                  disabled={loading || !password}
                  className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] text-sm font-medium text-black bg-white hover:bg-slate-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                </button>
                
                <button
                  type="submit"
                  formAction={(formData) => handleAction(formData, 'signup')}
                  disabled={loading || !password}
                  className="flex-1 flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm text-sm font-medium text-white bg-transparent hover:bg-white/5 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  Sign Up
                </button>
              </div>

              <button
                type="submit"
                formAction={(formData) => handleAction(formData, 'magic')}
                disabled={loading || !email}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-indigo-500/30 rounded-xl shadow-sm text-sm font-medium text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                <Wand2 className="w-4 h-4" /> Send Magic Link
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
