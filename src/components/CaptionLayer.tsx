"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Caption } from "@/data/captions";

type CaptionLayerProps = {
  captions: Caption[];
  currentFrame: number;
};

const variants = {
  left: {
    initial: { opacity: 0, x: -28 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -18 },
  },
  right: {
    initial: { opacity: 0, x: 28 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 18 },
  },
  center: {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -14 },
  },
};

const justifyClass: Record<Caption["position"], string> = {
  left: "justify-start text-left",
  right: "justify-end text-right",
  center: "justify-center text-center",
};

export default function CaptionLayer({ captions, currentFrame }: CaptionLayerProps) {
  const active = captions
    .map((c, idx) => ({ ...c, idx }))
    .filter((c) => currentFrame >= c.start && currentFrame <= c.end);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
      <AnimatePresence>
        {active.map((c) => {
          const v = variants[c.position];
          return (
            <motion.div
              key={c.idx}
              initial={v.initial}
              animate={v.animate}
              exit={v.exit}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute inset-0 flex items-end sm:items-center px-6 sm:px-14 lg:px-20 pb-28 sm:pb-0 ${justifyClass[c.position]}`}
            >
              <div
                className="prose-frame max-w-xl pointer-events-auto"
                dangerouslySetInnerHTML={{ __html: c.text }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
