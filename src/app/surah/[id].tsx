// src/app/surah/[id].tsx
import { Audio, AVPlaybackStatus } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/constants/quranMeta";
import { AyahData, fetchSurahAyahs } from "@/services/quranApi";
import { addBookmark, getBookmarks, removeBookmark, setLastRead } from "@/services/storage";

export default function SurahReaderScreen() {
  const { id, ayah } = useLocalSearchParams<{ id: string; ayah?: string }>();
  const surahNumber = Number(id);

  const [surahName, setSurahName] = useState("");
  const [ayahs, setAyahs] = useState<AyahData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [bookmarkedSet, setBookmarkedSet] = useState<Set<number>>(new Set());

  const soundRef = useRef<Audio.Sound | null>(null);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    let cancelled = false;

    fetchSurahAyahs(surahNumber)
      .then(({ surahName, ayahs }) => {
        if (cancelled) return;
        setSurahName(surahName);
        setAyahs(ayahs);
      })
      .catch(() => !cancelled && setError("Could not load this surah. Check your connection."))
      .finally(() => !cancelled && setLoading(false));

    getBookmarks().then((bookmarks) => {
      if (cancelled) return;
      const setForThisSurah = new Set(
        bookmarks.filter((b) => b.surahNumber === surahNumber).map((b) => b.ayahNumber)
      );
      setBookmarkedSet(setForThisSurah);
    });

    return () => {
      cancelled = true;
      soundRef.current?.unloadAsync();
    };
  }, [surahNumber]);

  // Scroll to and highlight a specific ayah if navigated here from Sajdah list / bookmarks / continue reading
  useEffect(() => {
    if (!ayah || ayahs.length === 0) return;
    const index = ayahs.findIndex((a) => a.numberInSurah === Number(ayah));
    if (index >= 0) {
      const timeout = setTimeout(() => {
        listRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.3 });
        setHighlightIndex(index);
        setTimeout(() => setHighlightIndex(null), 3000);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [ayah, ayahs]);

  const playAyah = async (index: number) => {
    const item = ayahs[index];
    if (!item?.audio) return;

    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync({ uri: item.audio }, { shouldPlay: true });
    soundRef.current = sound;
    setPlayingIndex(index);
    setLastRead(surahNumber, item.numberInSurah, surahName);

    sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (status.isLoaded && status.didJustFinish) {
        if (index + 1 < ayahs.length) {
          playAyah(index + 1);
        } else {
          setPlayingIndex(null);
        }
      }
    });
  };

  const stopAudio = async () => {
    await soundRef.current?.stopAsync();
    setPlayingIndex(null);
  };

  const toggleBookmark = async (item: AyahData) => {
    const already = bookmarkedSet.has(item.numberInSurah);
    if (already) {
      await removeBookmark(`${surahNumber}-${item.numberInSurah}`);
      setBookmarkedSet((prev) => {
        const next = new Set(prev);
        next.delete(item.numberInSurah);
        return next;
      });
    } else {
      await addBookmark(surahNumber, item.numberInSurah, surahName);
      setBookmarkedSet((prev) => new Set(prev).add(item.numberInSurah));
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: COLORS.danger, textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, padding: 10 }}>
      <Text style={{ color: COLORS.textPrimary, fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        {surahName}
      </Text>

      {playingIndex !== null && (
        <TouchableOpacity
          onPress={stopAudio}
          style={{
            backgroundColor: COLORS.cardActive,
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.textPrimary }}>⏹ Stop</Text>
        </TouchableOpacity>
      )}

      <FlatList
        ref={listRef}
        data={ayahs}
        keyExtractor={(item) => item.number.toString()}
        onScrollToIndexFailed={(info) => {
          // Long surahs can fail to scroll to a far-off index on first try; retry with an offset estimate.
          setTimeout(() => {
            listRef.current?.scrollToOffset({ offset: info.averageItemLength * info.index, animated: true });
          }, 100);
        }}
        renderItem={({ item, index }) => {
          const bookmarked = bookmarkedSet.has(item.numberInSurah);
          return (
            <View
              style={{
                padding: 16,
                backgroundColor:
                  highlightIndex === index ? COLORS.accent : playingIndex === index ? COLORS.cardActive : COLORS.card,
                marginBottom: 8,
                borderRadius: 12,
              }}
            >
              <TouchableOpacity onPress={() => playAyah(index)}>
                <Text style={{ color: COLORS.textPrimary, fontSize: 22, textAlign: "right", lineHeight: 38 }}>
                  {item.text} ﴿{item.numberInSurah}﴾
                </Text>
                {item.translation && (
                  <Text style={{ color: COLORS.textSecondary, marginTop: 8 }}>{item.translation}</Text>
                )}
              </TouchableOpacity>

              <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "flex-end" }}>
                <TouchableOpacity onPress={() => toggleBookmark(item)} style={{ paddingHorizontal: 6 }}>
                  <Text style={{ color: bookmarked ? COLORS.accent : COLORS.textSecondary, fontSize: 18 }}>
                    {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
