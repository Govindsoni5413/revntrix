"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, LogIn } from "lucide-react";
import { createClient } from "@/supabase/client";

export function AuthPromptModal() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if session or previous dismissal already exists
    const isDismissed = sessionStorage.getItem("revntrix_auth_dismissed");
    if (isDismissed) return;

    // Supabase session check
    try {
      const supabase = createClient();
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) return;

        // Trigger non-intrusive prompt after 90 seconds (PRD-03 §12)
        const timer = setTimeout(() => {
          setVisible(true);
        }, 90000);

        return () => clearTimeout(timer);
      }).catch(() => {
        // Safe catch if client not configured
      });
    } catch {
      // Safe catch
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("revntrix_auth_dismissed", "true");
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const redirectUrl = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Supabase OAuth error:", error.message);
        handleDismiss();
      }
    } catch (err) {
      console.error("Google sign in exception:", err);
      handleDismiss();
    } finally {
      setLoading(false);
    }
  };

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100%-3rem)] bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom-5 duration-300 text-slate-900"
      style={{
        boxShadow:
          "0 24px 48px -12px rgba(15, 23, 42, 0.18), 0 4px 12px 0 rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px 0 #ffffff",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-slate-900 leading-tight">
              Save Your Favorite Designs
            </h4>
            <p className="text-[12px] text-slate-500 mt-0.5 leading-relaxed">
              Sign in with Google to bookmark concepts and resume conversations anytime.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex-1 h-11 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-800 text-[13px] font-semibold transition-all shadow-xs active:scale-[0.98] disabled:opacity-50 touch-interactive cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{loading ? "Connecting..." : "Sign in with Google"}</span>
        </button>

        <button
          type="button"
          onClick={handleDismiss}
          className="h-11 px-3 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
}
