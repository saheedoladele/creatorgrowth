const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const integer = new Intl.NumberFormat("en", { maximumFractionDigits: 0 });

export function formatCompact(value: number) {
  return compact.format(value);
}

export function formatInteger(value: number) {
  return integer.format(value);
}

export function formatRate(value: number) {
  return `${value.toFixed(1)}%`;
}

export function formatSignedPercent(value: number) {
  if (!Number.isFinite(value)) return "0%";
  const rounded = Math.round(value * 10) / 10;
  if (Math.abs(rounded) < 0.05) return "0%";
  const digits = Math.abs(rounded) >= 10 ? 0 : 1;
  const body = Math.abs(rounded).toFixed(digits);
  return `${rounded > 0 ? "+" : "−"}${body}%`;
}

export function formatSignedCount(value: number) {
  if (value === 0) return "0";
  return `${value > 0 ? "+" : "−"}${formatInteger(Math.abs(value))}`;
}

export function trendFromDelta(delta: number): {
  direction: "up" | "down" | "neutral";
  tone: "positive" | "negative" | "neutral";
} {
  if (delta > 0) return { direction: "up", tone: "positive" };
  if (delta < 0) return { direction: "down", tone: "negative" };
  return { direction: "neutral", tone: "neutral" };
}
