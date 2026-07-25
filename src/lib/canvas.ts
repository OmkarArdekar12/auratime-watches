export function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number,
  alpha = 1,
) {
  if (!img.naturalWidth || !img.naturalHeight) return;

  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;

  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;

  if (imgRatio > canvasRatio) {
    sw = img.naturalHeight * canvasRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / canvasRatio;
    sy = (img.naturalHeight - sh) / 2;
  }

  const prevAlpha = ctx.globalAlpha;
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
  ctx.globalAlpha = prevAlpha;
}

export function drawBlendedFrame(
  ctx: CanvasRenderingContext2D,
  canvasW: number,
  canvasH: number,
  frameA: HTMLImageElement | null,
  frameB: HTMLImageElement | null,
  blend: number,
) {
  ctx.clearRect(0, 0, canvasW, canvasH);

  if (frameA) {
    drawCover(ctx, frameA, canvasW, canvasH, 1);
  }
  if (frameB && frameB !== frameA && blend > 0.004) {
    drawCover(ctx, frameB, canvasW, canvasH, blend);
  }
}
