// src/services/storage.ts
//
// Lightweight local persistence using AsyncStorage. No database, no server.
// Everything is stored as plain JSON under a few keys.

import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  bookmarks: "quran:bookmarks",
  tasbeeh: "quran:tasbeeh_sessions",
  lastRead: "quran:last_read",
  reciter: "quran:selected_reciter",
  calcMethod: "quran:calc_method",
  madhab: "quran:madhab",
};

// ---------- Bookmarks ----------

export type Bookmark = {
  id: string; // `${surahNumber}-${ayahNumber}`
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  note?: string;
  createdAt: string;
};

export async function getBookmarks(): Promise<Bookmark[]> {
  const raw = await AsyncStorage.getItem(KEYS.bookmarks);
  return raw ? JSON.parse(raw) : [];
}

export async function addBookmark(surahNumber: number, ayahNumber: number, surahName: string, note?: string) {
  const bookmarks = await getBookmarks();
  const id = `${surahNumber}-${ayahNumber}`;
  if (bookmarks.some((b) => b.id === id)) return bookmarks; // already bookmarked

  const updated = [{ id, surahNumber, ayahNumber, surahName, note, createdAt: new Date().toISOString() }, ...bookmarks];
  await AsyncStorage.setItem(KEYS.bookmarks, JSON.stringify(updated));
  return updated;
}

export async function removeBookmark(id: string) {
  const bookmarks = await getBookmarks();
  const updated = bookmarks.filter((b) => b.id !== id);
  await AsyncStorage.setItem(KEYS.bookmarks, JSON.stringify(updated));
  return updated;
}

export async function isBookmarked(surahNumber: number, ayahNumber: number) {
  const bookmarks = await getBookmarks();
  return bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
}

// ---------- Tasbeeh ----------

export type TasbeehSession = {
  dhikrText: string;
  count: number;
  target: number;
};

export async function getAllTasbeeh(): Promise<Record<string, TasbeehSession>> {
  const raw = await AsyncStorage.getItem(KEYS.tasbeeh);
  return raw ? JSON.parse(raw) : {};
}

export async function getTasbeeh(dhikrText: string, defaultTarget = 33): Promise<TasbeehSession> {
  const all = await getAllTasbeeh();
  return all[dhikrText] ?? { dhikrText, count: 0, target: defaultTarget };
}

export async function saveTasbeeh(session: TasbeehSession) {
  const all = await getAllTasbeeh();
  all[session.dhikrText] = session;
  await AsyncStorage.setItem(KEYS.tasbeeh, JSON.stringify(all));
}

// ---------- Last read position ----------

export type LastRead = {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  updatedAt: string;
};

export async function setLastRead(surahNumber: number, ayahNumber: number, surahName: string) {
  const value: LastRead = { surahNumber, ayahNumber, surahName, updatedAt: new Date().toISOString() };
  await AsyncStorage.setItem(KEYS.lastRead, JSON.stringify(value));
}

export async function getLastRead(): Promise<LastRead | null> {
  const raw = await AsyncStorage.getItem(KEYS.lastRead);
  return raw ? JSON.parse(raw) : null;
}

// ---------- Preferences ----------

export async function getSelectedReciter(): Promise<string> {
  const raw = await AsyncStorage.getItem(KEYS.reciter);
  return raw ?? "ar.alafasy";
}

export async function setSelectedReciter(reciterId: string) {
  await AsyncStorage.setItem(KEYS.reciter, reciterId);
}

export async function getCalcMethod(): Promise<string> {
  const raw = await AsyncStorage.getItem(KEYS.calcMethod);
  return raw ?? "MuslimWorldLeague";
}

export async function setCalcMethod(method: string) {
  await AsyncStorage.setItem(KEYS.calcMethod, method);
}

export async function getMadhab(): Promise<"Shafi" | "Hanafi"> {
  const raw = await AsyncStorage.getItem(KEYS.madhab);
  return (raw as "Shafi" | "Hanafi") ?? "Shafi";
}

export async function setMadhab(madhab: "Shafi" | "Hanafi") {
  await AsyncStorage.setItem(KEYS.madhab, madhab);
}
