import * as Handlebars from 'handlebars';

let registered = false;

export function registerPrintHelpersOnce(): void {
  if (registered) return;
  registered = true;

  Handlebars.registerHelper('formatMoney', (value: unknown) => {
    const n = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(n)) return '0.00';

    // Template already prints "Q", so we return just the numeric part.
    return new Intl.NumberFormat('es-GT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  });

  Handlebars.registerHelper(
    'formatDate',
    (value: unknown, pattern?: string) => {
      const date = coerceToDate(value);
      if (!date) return '';

      // Your template passes: "dd/MM/yyyy HH:mm"
      const fmt = pattern ?? 'dd/MM/yyyy HH:mm';
      return formatDateWithPattern(date, fmt);
    },
  );
}

/**
 * Accepts Date | ISO string | timestamp and returns a Date or null.
 */
function coerceToDate(value: unknown): Date | null {
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  if (typeof value === 'number') {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  if (typeof value === 'string') {
    // Works with ISO strings like "2026-02-07T14:30:00-06:00"
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  return null;
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/**
 * Minimal formatter supporting tokens used by your template:
 * dd, MM, yyyy, HH, mm
 */
function formatDateWithPattern(date: Date, pattern: string): string {
  const map: Record<string, string> = {
    dd: pad2(date.getDate()),
    MM: pad2(date.getMonth() + 1),
    yyyy: String(date.getFullYear()),
    HH: pad2(date.getHours()),
    mm: pad2(date.getMinutes()),
  };

  // Replace longer tokens first to avoid partial overlaps
  return pattern
    .replaceAll('yyyy', map.yyyy)
    .replaceAll('MM', map.MM)
    .replaceAll('dd', map.dd)
    .replaceAll('HH', map.HH)
    .replaceAll('mm', map.mm);
}
