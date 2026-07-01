"use client";

import { useState } from "react";
import { skipEmptyState } from "@/app/actions/dashboard";

export default function SkipEmptyStateButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSkip = async () => {
    setIsLoading(true);
    await skipEmptyState();
  };

  return (
    <button 
      onClick={handleSkip}
      disabled={isLoading}
      className="mt-6 text-sm text-slate-500 hover:text-white transition-colors underline underline-offset-4"
    >
      Skip for now
    </button>
  );
}
