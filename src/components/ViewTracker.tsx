"use client";

import { useEffect, useRef } from "react";

export default function ViewTracker({ releaseId }: { releaseId: string }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    
    // Use an IntersectionObserver to only track when the release actually comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTracked.current) {
          hasTracked.current = true;
          
          fetch("/api/metrics/view", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ releaseId }),
          }).catch(() => {
            // Silently fail if tracking fails
          });
          
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    // We observe the parent element (the article)
    const element = document.getElementById(`release-article-${releaseId}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [releaseId]);

  return null;
}
