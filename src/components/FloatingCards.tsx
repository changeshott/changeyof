"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { UpdateBroadcastedCard, ReleaseEditorCard, WhatsNewCard, CodeDiffCard, EngagementCard, ChangelogCard } from "./cards";

export default function FloatingCards({ onCardClick, activeCard }: { onCardClick?: (id: string) => void, activeCard?: string | null }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Select the inner .float-card elements so GSAP doesn't override the Tailwind scales on the parents
    const cards = containerRef.current.querySelectorAll(".float-card");

    cards.forEach((card, i) => {
      // Entrance animation: Pop in from below with a fade, filling the circular space smoothly
      gsap.fromTo(card,
        { opacity: 0, y: 120, scale: 0.8, rotation: Math.random() * 15 - 7.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.8,
          delay: i * 0.15 + 0.3, // Staggered delay, waiting slightly for page load
          ease: "expo.out",
          onComplete: () => {
            // Once entrance is done, start the continuous floating loop
            gsap.to(card, {
              y: `-=${Math.random() * 15 + 10}`,
              duration: Math.random() * 2 + 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: Math.random() * 0.5
            });
          }
        }
      );
    });
  }, []);

  const getCardClass = (id: string) => {
    const base = "float-card pointer-events-auto transition-all duration-1000";
    if (!activeCard) return base;
    if (activeCard === id) return `${base} z-50`;
    return `${base} opacity-10 blur-md pointer-events-none`;
  };

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">

      {/* Top Left */}
      <div className="absolute top-[8%] left-[5%] md:left-[8%] lg:left-[8%] z-20 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-top-left">
        <div className={getCardClass("updatebroadcast")} data-card-id="updatebroadcast">
          <UpdateBroadcastedCard onClick={() => onCardClick?.("updatebroadcast")} />
        </div>
      </div>

      {/* Top Right */}
      <div className="absolute top-[12%] right-[2%] md:right-[6%] lg:right-[12%] z-20 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-top-right">
        <div className={getCardClass("releaseeditor")} data-card-id="releaseeditor">
          <ReleaseEditorCard onClick={() => onCardClick?.("releaseeditor")} />
        </div>
      </div>

      {/* Middle Left */}
      <div className="absolute top-[70%] left-[-8%] sm:left-[0%] md:left-[4%] lg:left-[2%] z-20 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-left -translate-y-1/2">
        <div className={getCardClass("whatsnew")} data-card-id="whatsnew">
          <WhatsNewCard onClick={() => onCardClick?.("whatsnew")} />
        </div>
      </div>


      {/* Bottom Left (Pushed much further down) */}
      <div className="absolute bottom-[2%] md:bottom-[-2%] left-[10%] md:left-[30%] lg:left-[30%] z-20 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-bottom-left">
        <div className={getCardClass("engagement")} data-card-id="engagement">
          <EngagementCard onClick={() => onCardClick?.("engagement")} />
        </div>
      </div>

      {/* Bottom Right (Pushed much further down as requested) */}
      <div className="absolute bottom-[-10%] md:bottom-[-10%] right-[10%] md:right-[15%] lg:right-[15%] z-20 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-bottom-right">
        <div className={getCardClass("changelog")} data-card-id="changelog">
          <ChangelogCard onClick={() => onCardClick?.("changelog")} />
        </div>
      </div>

      {/* Beside Bottom Right (Slightly higher and pushed more to the right) */}
      <div className="absolute bottom-[30%] md:bottom-[30%] right-[-20%] md:right-[-10%] lg:right-[-10%] z-20 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-right">
        <div className={getCardClass("codediff")} data-card-id="codediff">
          <CodeDiffCard onClick={() => onCardClick?.("codediff")} />
        </div>
      </div>

    </div>
  );
}
