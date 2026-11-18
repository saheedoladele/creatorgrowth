export function parseISODate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
}

export function formatISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + amount);
  return next;
}

export function daysInclusive(start: string, end: string) {
  const ms = parseISODate(end).getTime() - parseISODate(start).getTime();
  return Math.round(ms / 86_400_000) + 1;
}

export function shiftDate(value: string, amount: number) {
  return formatISODate(addDays(parseISODate(value), amount));
}

const shortDate = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const shortDateWithYear = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const dateTime = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

export function formatShortDate(value: string) {
  return shortDateWithYear.format(parseISODate(value));
}

export function formatDateSpan(start: string, end: string) {
  const startDate = parseISODate(start);
  const endDate = parseISODate(end);
  const sameYear = startDate.getUTCFullYear() === endDate.getUTCFullYear();
  const startText = sameYear
    ? shortDate.format(startDate)
    : shortDateWithYear.format(startDate);
  return `${startText} – ${shortDateWithYear.format(endDate)}`;
}

export function formatTimestamp(value: string) {
  return dateTime.format(new Date(value));
}

export function isWithin(date: string, start: string, end: string) {
  return date >= start && date <= end;
}

export function rangesOverlap(
  start: string,
  end: string,
  windowStart: string,
  windowEnd: string,
) {
  return start <= windowEnd && end >= windowStart;
}
