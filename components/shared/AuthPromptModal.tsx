"use client";

import React, { useState, useEffect } from "react";
import { X, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "./Button";
import { createClient } from "@/supabase/client";

export function AuthPromptModal() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if session or previous dismissal already exists
    const isDismissed = sessionStorage.getItem("revntrix_auth_dismissed");
    if (isDismissed) return;

    // Supabase session check
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) return;

      // Trigger non-intrusive prompt after 90 seconds (PRD-03 §12)
      const timer = setTimeout(() => {
        setVisible(true);
      }, 90000);

      return () => clearTimeout(timer);
    });
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("revntrix_auth_dismissed", "true");
  };

  const handleGoogleSignIn = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
    } catch {
      handleDismiss();
    }
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full bg-[#141414]/95 backdrop-blur-md border border-[#D4A72C]/40 rounded-2xl p-5 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#F7F7F5]">
              Save Your Favorite Designs
            </h4>
            <p className="text-xs text-[#A7A7A0]">
              Sign in with Google to bookmark concepts and resume conversations anytime.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="text-[#A7A7A0] hover:text-[#F7F7F5] transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={handleGoogleSignIn}
          icon={
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
          }
        >
          Sign in with Google
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDismiss}>
          Later
        </Button>
      </div>
    </div>
  );
}
