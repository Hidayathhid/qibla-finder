// src/services/quranApi.ts
//
// Direct fetch from alquran.cloud. No local database — this is intentionally
// simple since the app has no backend. In-memory caching only (per app session),
// so re-opening the same surah while the app is still running doesn't refetch.

const BASE_URL = "https://api.alquran.cloud/v1";

export type SurahMeta = {
  number: number;
  englishName: string;
  name: string;
  revelationType: string;
  numberOfAyahs: number;
};

export type AyahData = {
  number: number;
  numberInSurah: number;
  text: string;
  translation?: string;
  audio?: string;
};

// Simple in-memory caches (cleared when the app restarts — that's fine, it's just
// to avoid refetching the same data twice in one session, e.g. going back and forth
// between Surah list and a reader screen)
let surahListCache: SurahMeta[] | null = null;
const ayahCache = new Map<string, { surahName: string; ayahs: AyahData[] }>();

export async function fetchSurahList(): Promise<SurahMeta[]> {
  if (surahListCache) return surahListCache;

  const res = await fetch(`${BASE_URL}/surah`);
  if (!res.ok) throw new Error("Failed to load surah list");
  const json = await res.json();
  surahListCache = json.data;
  return surahListCache!;
}

export async function fetchSurahAyahs(
  surahNumber: number,
  reciter: string = "ar.alafasy"
): Promise<{ surahName: string; ayahs: AyahData[] }> {
  const cacheKey = `${surahNumber}-${reciter}`;
  const cached = ayahCache.get(cacheKey);
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}/surah/${surahNumber}/editions/${reciter},en.sahih`);
  if (!res.ok) throw new Error("Failed to load surah");
  const json = await res.json();
  const [arabicEdition, englishEdition] = json.data;

  const translationBySurahIndex: Record<number, string> = {};
  englishEdition.ayahs.forEach((a: any) => {
    translationBySurahIndex[a.numberInSurah] = a.text;
  });

  const ayahs: AyahData[] = arabicEdition.ayahs.map((a: any) => ({
    number: a.number,
    numberInSurah: a.numberInSurah,
    text: a.text,
    translation: translationBySurahIndex[a.numberInSurah],
    audio: a.audio,
  }));

  const result = { surahName: arabicEdition.englishName, ayahs };
  ayahCache.set(cacheKey, result);
  return result;
}

export async function fetchJuz(juzNumber: number, reciter: string = "ar.alafasy") {
  const res = await fetch(`${BASE_URL}/juz/${juzNumber}/${reciter}`);
  if (!res.ok) throw new Error("Failed to load juz");
  const json = await res.json();
  return json.data.ayahs as (AyahData & { surah: { number: number; englishName: string } })[];
}

export async function fetchSajdahAyahs() {
  const res = await fetch(`${BASE_URL}/sajda/quran-uthmani`);
  if (!res.ok) throw new Error("Failed to load sajdah list");
  const json = await res.json();
  return json.data.ayahs as {
    number: number;
    numberInSurah: number;
    surah: { number: number; englishName: string };
  }[];
}
