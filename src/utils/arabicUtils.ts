/**
 * Utilites for Arabic numerals and math text presentation
 */

const easternArabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toEasternArabic(val: number | string): string {
  const str = String(val);
  return str.replace(/[0-9]/g, (match) => easternArabicDigits[parseInt(match, 10)]);
}

export function formatNum(val: number | string, useEastern: boolean = false): string {
  if (useEastern) {
    return toEasternArabic(val);
  }
  return String(val);
}

/**
 * Format minutes and seconds into MM:SS
 */
export function formatTime(seconds: number, useEastern: boolean = false): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const raw = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  return useEastern ? toEasternArabic(raw) : raw;
}
