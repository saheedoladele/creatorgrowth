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

export function shiftDate(value: string, amount: number) {
  return formatISODate(addDays(parseISODate(value), amount));
}

const dateWithYear = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const dateTime = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

export function formatDate(value: string) {
  return dateWithYear.format(parseISODate(value.slice(0, 10)));
}

export function formatTimestamp(value: string) {
  return `${dateTime.format(new Date(value))} UTC`;
}
