"use client";

import { useRef } from "react";
import { motion, type MotionValue } from "framer-motion";

type TopBarProps = {
  siteName: string;
  currentFrame: number;
  total: number;
  isTouring: boolean;
  progress: MotionValue<number>;
  onToggleTour: () => void;
  onSeek: (fraction: number) => void;
};

export default function TopBar({
  siteName,
  currentFrame,
  total,
  isTouring,
  progress,
  onToggleTour,
  onSeek,
}: TopBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  function fractionFromEvent(e: { clientX: number }) {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
  }

  function handlePointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    onSeek(fractionFromEvent(e));
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    onSeek(fractionFromEvent(e));
  }

  function handlePointerUp() {
    draggingRef.current = false;
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const step = 1 / Math.max(total - 1, 1);
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onSeek(Math.min(1, progress.get() + step));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onSeek(Math.max(0, progress.get() - step));
    } else if (e.key === "Home") {
      e.preventDefault();
      onSeek(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onSeek(1);
    }
  }

  return (
    <>
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        role="slider"
        tabIndex={0}
        aria-label="Sequence progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={currentFrame + 1}
        className="absolute top-0 left-0 z-40 h-[3px] w-full cursor-pointer touch-none bg-reel-paper/15 focus:outline-none"
      >
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-y-0 left-0 w-full origin-left bg-amber"
        />
      </div>

      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30">
        <span className="font-mono text-[0.65rem] sm:text-xs tracking-widest2 uppercase text-reel-paper/80">
          {siteName}
        </span>
      </div>

      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30">
        <button
          onClick={onToggleTour}
          className={`group flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.65rem] sm:text-xs tracking-widest2 uppercase transition-all duration-300 ${
            isTouring
              ? "bg-amber text-reel-black"
              : "bg-reel-paper/10 text-reel-paper backdrop-blur-md hover:bg-reel-paper/20"
          }`}
        >
          <span className="relative flex h-2 w-2">
            {isTouring && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-reel-black/60" />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                isTouring ? "bg-reel-black" : "bg-amber"
              }`}
            />
          </span>

          {isTouring ? "Touring" : "Take the Tour"}
        </button>
      </div>
    </>
  );
}
