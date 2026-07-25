export function naturalSort(a: string, b: string): number {
  const chunk = (s: string) => s.match(/(\d+|\D+)/g) ?? [s];
  const ac = chunk(a);
  const bc = chunk(b);
  const len = Math.max(ac.length, bc.length);
  for (let i = 0; i < len; i++) {
    const av = ac[i] ?? "";
    const bv = bc[i] ?? "";
    const an = Number(av);
    const bn = Number(bv);
    if (!Number.isNaN(an) && !Number.isNaN(bn) && av !== "" && bv !== "") {
      if (an !== bn) return an - bn;
    } else if (av !== bv) {
      return av < bv ? -1 : 1;
    }
  }
  return 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
