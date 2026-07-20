// src/constants/quranMeta.ts

export const COLORS = {
  bg: "#0b1220",
  card: "#111827",
  cardActive: "#1f2937",
  accent: "#22c55e",
  accentBlue: "#60a5fa",
  danger: "#ef4444",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
};

// Start of each Juz/Para, expressed as (surah, ayah) it begins on
export const JUZ_START: { number: number; surah: number; ayah: number }[] = [
  { number: 1, surah: 1, ayah: 1 },
  { number: 2, surah: 2, ayah: 142 },
  { number: 3, surah: 2, ayah: 253 },
  { number: 4, surah: 3, ayah: 92 },
  { number: 5, surah: 4, ayah: 24 },
  { number: 6, surah: 4, ayah: 148 },
  { number: 7, surah: 5, ayah: 82 },
  { number: 8, surah: 6, ayah: 111 },
  { number: 9, surah: 7, ayah: 88 },
  { number: 10, surah: 8, ayah: 41 },
  { number: 11, surah: 9, ayah: 93 },
  { number: 12, surah: 11, ayah: 6 },
  { number: 13, surah: 12, ayah: 53 },
  { number: 14, surah: 15, ayah: 1 },
  { number: 15, surah: 17, ayah: 1 },
  { number: 16, surah: 18, ayah: 75 },
  { number: 17, surah: 21, ayah: 1 },
  { number: 18, surah: 23, ayah: 1 },
  { number: 19, surah: 25, ayah: 21 },
  { number: 20, surah: 27, ayah: 56 },
  { number: 21, surah: 29, ayah: 46 },
  { number: 22, surah: 33, ayah: 31 },
  { number: 23, surah: 36, ayah: 28 },
  { number: 24, surah: 39, ayah: 32 },
  { number: 25, surah: 41, ayah: 47 },
  { number: 26, surah: 46, ayah: 1 },
  { number: 27, surah: 51, ayah: 31 },
  { number: 28, surah: 58, ayah: 1 },
  { number: 29, surah: 67, ayah: 1 },
  { number: 30, surah: 78, ayah: 1 },
];

// The 7 traditional Manzil divisions, by surah range
export const MANZIL_RANGES: { number: number; start: number; end: number }[] = [
  { number: 1, start: 1, end: 4 },
  { number: 2, start: 5, end: 9 },
  { number: 3, start: 10, end: 16 },
  { number: 4, start: 17, end: 25 },
  { number: 5, start: 26, end: 36 },
  { number: 6, start: 37, end: 49 },
  { number: 7, start: 50, end: 114 },
];

// Kaaba coordinates, used for Qibla bearing calculation
export const KAABA_COORDS = { latitude: 21.4225, longitude: 39.8262 };

export const PRAYER_NAMES = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

export const RECITERS = [
  { id: "ar.alafasy", label: "Mishary Alafasy" },
  { id: "ar.abdulbasitmurattal", label: "Abdul Basit (Murattal)" },
  { id: "ar.husary", label: "Mahmoud Al-Husary" },
  { id: "ar.minshawi", label: "Mohamed Minshawi" },
] as const;
