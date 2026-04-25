export function sanitizeNumber(value: number | undefined, fallback = 0): number {
  if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
    return fallback;
  }

  return value;
}

export function sanitizeNonNegativeNumber(
  value: number | undefined,
  fallback = 0
): number {
  return Math.max(sanitizeNumber(value, fallback), 0);
}
