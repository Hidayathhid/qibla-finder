// src/app/quran/sajdah-list.tsx
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/constants/quranMeta";
import { fetchSajdahAyahs } from "@/services/quranApi";

type SajdahAyah = {
  number: number;
  numberInSurah: number;
  surah: { number: number; englishName: string };
};

export default function SajdahListScreen() {
  const [ayahs, setAyahs] = useState<SajdahAyah[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSajdahAyahs()
      .then(setAyahs)
      .catch((err) => console.log("Failed to load sajdah list", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, padding: 10 }}>
      <FlatList
        data={ayahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/surah/${item.surah.number}`,
                params: { ayah: String(item.numberInSurah) },
              })
            }
            style={{ padding: 16, backgroundColor: COLORS.card, marginBottom: 8, borderRadius: 12 }}
          >
            <Text style={{ color: COLORS.textPrimary, fontSize: 16 }}>
              {item.surah.englishName} — Ayah {item.numberInSurah}
            </Text>
            <Text style={{ color: COLORS.textSecondary, marginTop: 2 }}>🕌 Sajdah (verse of prostration)</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
