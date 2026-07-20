// src/app/para/[id].tsx
import { Audio, AVPlaybackStatus } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/constants/quranMeta";
import { fetchJuz } from "@/services/quranApi";

type JuzAyah = {
  number: number;
  numberInSurah: number;
  text: string;
  audio?: string;
  surah: { number: number; englishName: string };
};

export default function ParaReaderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [ayahs, setAyahs] = useState<JuzAyah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchJuz(Number(id))
      .then((data) => !cancelled && setAyahs(data))
      .catch(() => !cancelled && setError("Could not load this Para. Check your connection."))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
      soundRef.current?.unloadAsync();
    };
  }, [id]);

  const playAyah = async (index: number) => {
    const item = ayahs[index];
    if (!item?.audio) return;

    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync({ uri: item.audio }, { shouldPlay: true });
    soundRef.current = sound;
    setPlayingIndex(index);

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
      <Text style={{ color: COLORS.textPrimary, fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Para {id}
      </Text>
      <FlatList
        data={ayahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item, index }) => {
          const showSurahHeader = index === 0 || ayahs[index - 1].surah.number !== item.surah.number;
          return (
            <View>
              {showSurahHeader && (
                <Text style={{ color: COLORS.accentBlue, fontSize: 14, marginTop: 14, marginBottom: 6 }}>
                  — {item.surah.englishName} —
                </Text>
              )}
              <TouchableOpacity
                onPress={() => playAyah(index)}
                style={{
                  padding: 16,
                  backgroundColor: playingIndex === index ? COLORS.cardActive : COLORS.card,
                  marginBottom: 8,
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: COLORS.textPrimary, fontSize: 20, textAlign: "right", lineHeight: 34 }}>
                  {item.text} ﴿{item.numberInSurah}﴾
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
