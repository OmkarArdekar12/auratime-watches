"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const CONCURRENCY = 10;

export function useFrameLoader(urls: string[]) {
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const loadedRef = useRef<boolean[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  const key = useMemo(() => urls.join("|"), [urls]);

  useEffect(() => {
    let cancelled = false;
    const total = urls.length;
    imagesRef.current = new Array(total).fill(null);
    loadedRef.current = new Array(total).fill(false);
    setLoadedCount(0);
    setFirstFrameReady(false);

    if (total === 0) return;

    let completed = 0;
    let nextIndex = 0;

    function loadOne(i: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return resolve();
          imagesRef.current[i] = img;
          loadedRef.current[i] = true;
          completed += 1;
          setLoadedCount(completed);
          if (i === 0) setFirstFrameReady(true);
          resolve();
        };
        img.onerror = () => {
          completed += 1;
          setLoadedCount(completed);
          resolve();
        };
        img.src = urls[i];
      });
    }

    async function worker() {
      while (!cancelled) {
        const i = nextIndex;
        nextIndex += 1;
        if (i >= total) return;
        await loadOne(i);
      }
    }

    const workers = Array.from({ length: Math.min(CONCURRENCY, total) }, () =>
      worker(),
    );
    Promise.all(workers);

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  function getFrame(target: number): HTMLImageElement | null {
    const loaded = loadedRef.current;
    const images = imagesRef.current;
    if (!loaded.length) return null;
    const t = Math.min(Math.max(target, 0), loaded.length - 1);
    if (loaded[t]) return images[t];
    for (let d = 1; d < loaded.length; d++) {
      if (t - d >= 0 && loaded[t - d]) return images[t - d];
      if (t + d < loaded.length && loaded[t + d]) return images[t + d];
    }
    return null;
  }

  return {
    total: urls.length,
    loadedCount,
    firstFrameReady,
    getFrame,
  };
}
