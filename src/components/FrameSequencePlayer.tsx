"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { useFrameLoader } from "@/hooks/useFrameLoader";
import { drawBlendedFrame } from "@/lib/canvas";
import { clamp } from "@/lib/utils";
import CaptionLayer from "./CaptionLayer";
import TopBar from "./TopBar";
import type { Caption } from "@/data/captions";
import type { settings as SettingsType } from "@/data/settings";

type FrameSequencePlayerProps = {
  images: string[];
  captions: Caption[];
  settings: typeof SettingsType;
  siteName: string;
};

const MAX_DPR = 2;

export default function FrameSequencePlayer({
  images,
  captions,
  settings,
  siteName,
}: FrameSequencePlayerProps) {
  const total = images.length;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isTouring, setIsTouring] = useState(false);

  const { getFrame, firstFrameReady, loadedCount } = useFrameLoader(images);

  const trackPx = Math.max(total - 1, 0) * settings.pxPerFrame;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const sizeRef = useRef({ w: 0, h: 0 });
  const lastDrawRef = useRef({ a: -1, b: -1, blend: -1 });

  const redrawCurrent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { a, b, blend } = lastDrawRef.current;
    if (a < 0) return;
    drawBlendedFrame(
      ctx,
      sizeRef.current.w,
      sizeRef.current.h,
      getFrame(a),
      getFrame(b),
      blend,
    );
  }, [getFrame]);

  useEffect(() => {
    let resizeRaf = 0;
    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      sizeRef.current = { w, h };
      redrawCurrent();
    }
    function scheduleResize() {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    }
    resize();
    window.addEventListener("resize", scheduleResize);
    return () => {
      window.removeEventListener("resize", scheduleResize);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
    };
  }, [redrawCurrent]);

  useEffect(() => {
    if (total === 0) return;
    let raf: number;
    let lastProgress = -1;
    let lastIntFrame = -1;

    function tick() {
      const p = clamp(scrollYProgress.get(), 0, 1);
      if (p !== lastProgress) {
        lastProgress = p;
        const exact = p * (total - 1);
        const frameA = clamp(Math.floor(exact), 0, total - 1);
        const frameB = clamp(frameA + 1, 0, total - 1);
        const blend = exact - frameA;

        lastDrawRef.current = { a: frameA, b: frameB, blend };
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx) {
          drawBlendedFrame(
            ctx,
            sizeRef.current.w,
            sizeRef.current.h,
            getFrame(frameA),
            getFrame(frameB),
            blend,
          );
        }

        const intFrame = Math.round(exact);
        if (intFrame !== lastIntFrame) {
          lastIntFrame = intFrame;
          setCurrentFrame(intFrame);
        }
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress, total, getFrame]);

  useEffect(() => {
    redrawCurrent();
  }, [loadedCount, redrawCurrent]);

  const seekToFraction = useCallback(
    (fraction: number) => {
      const wrapper = wrapperRef.current;
      if (!wrapper || trackPx <= 0) return;
      const rect = wrapper.getBoundingClientRect();
      const docTop = rect.top + window.scrollY;
      const targetY = docTop + clamp(fraction, 0, 1) * trackPx;
      window.scrollTo({ top: targetY });
    },
    [trackPx],
  );

  const tourFrameRef = useRef(0);

  useEffect(() => {
    if (!isTouring || total === 0) return;
    let raf: number;
    let last = performance.now();
    // tourFrameRef.current = clamp(scrollYProgress.get(), 0, 1) * (total - 1);
    tourFrameRef.current = 0;
    seekToFraction(0);

    function step(now: number) {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      tourFrameRef.current += settings.tourFps * dt;

      if (tourFrameRef.current >= total - 1) {
        if (settings.tourLoop) {
          tourFrameRef.current = 0;
        } else {
          tourFrameRef.current = total - 1;
          seekToFraction(tourFrameRef.current / (total - 1));
          setIsTouring(false);
          return;
        }
      }

      seekToFraction(tourFrameRef.current / (total - 1));
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);

    function handleVisibility() {
      if (document.hidden) setIsTouring(false);
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouring, total, settings.tourFps, settings.tourLoop]);

  useEffect(() => {
    if (!isTouring) return;
    function pause() {
      setIsTouring(false);
    }
    window.addEventListener("wheel", pause, { passive: true });
    window.addEventListener("touchstart", pause, { passive: true });
    window.addEventListener("keydown", pause);
    return () => {
      window.removeEventListener("wheel", pause);
      window.removeEventListener("touchstart", pause);
      window.removeEventListener("keydown", pause);
    };
  }, [isTouring]);

  const toggleTour = useCallback(() => setIsTouring((v) => !v), []);

  if (total === 0) {
    return (
      <main className="fixed inset-0 flex items-center justify-center bg-reel-black px-6 text-center">
        <p className="prose-frame text-reel-fade max-w-md">
          Add your extracted frames to <code>/public/images</code> and write
          your timeline in <code>data/captions.ts</code> to populate this
          sequence.
        </p>
      </main>
    );
  }

  return (
    <main
      ref={wrapperRef}
      style={{ height: `calc(100svh + ${trackPx}px)` }}
      className="relative"
    >
      <div className="sr-only">
        {captions.map((c, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: c.text }} />
        ))}
      </div>

      <div className="sticky top-0 h-[100svh] w-screen overflow-hidden bg-reel-black">
        <canvas
          ref={canvasRef}
          role="presentation"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full frame-canvas"
        />

        <div className="frame-vignette" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-reel-black/75 via-reel-black/10 to-reel-black/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-reel-black/55 via-transparent to-reel-black/20" />

        <CaptionLayer captions={captions} currentFrame={currentFrame + 1} />

        <TopBar
          siteName={siteName}
          currentFrame={currentFrame}
          total={total}
          isTouring={isTouring}
          progress={scrollYProgress}
          onToggleTour={toggleTour}
          onSeek={seekToFraction}
        />

        {(!firstFrameReady || (firstFrameReady && loadedCount < total)) && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-reel-black">
            <span className="font-mono text-xs tracking-widest2 uppercase text-reel-fade">
              Preparing the Experience
            </span>
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-reel-paper/15">
              <div
                className="h-full rounded-full bg-amber transition-[width] duration-150 ease-out"
                style={{
                  width: `${(loadedCount / total) * 100}%`,
                }}
              />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-reel-fade/70">
                {Math.round((loadedCount / total) * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* {(!firstFrameReady || (firstFrameReady && loadedCount < total)) && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-reel-black">
            <span className="font-mono text-xs tracking-widest2 uppercase text-reel-fade">
              Preparing the Experience
            </span>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-reel-paper/15">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-amber" />
            </div>
          </div>
        )} */}
        {/* {firstFrameReady && loadedCount < total && (
          <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 z-30 font-mono text-[0.6rem] tracking-widest2 uppercase text-reel-fade/70">
            Preparing the Experience
          </div>
        )} */}
      </div>
    </main>
  );
}
