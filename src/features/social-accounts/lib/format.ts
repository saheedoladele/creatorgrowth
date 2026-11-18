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

export function formatMetric(
  value: number | undefined,
  kind: "count" | "rate",
) {
  if (value == null) return "Not in this preview";
  return kind === "rate" ? formatRate(value) : formatCompact(value);
}

export function formatHandle(
  platform: "facebook" | "instagram" | "tiktok",
  username: string,
) {
  return platform === "facebook" ? username : `@${username}`;
}
