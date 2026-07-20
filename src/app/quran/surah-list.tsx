// src/app/quran/surah-list.tsx
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/constants/quranMeta";
import { fetchSurahList, SurahMeta } from "@/services/quranApi";

export default function SurahListScreen() {
  const [surahs, setSurahs] = useState<SurahMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSurahList()
      .then(setSurahs)
      .catch(() => setError("Could not load surah list. Check your connection."))
      .finally(() => setLoading(false));
  }, []);

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
      <FlatList
        data={surahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/surah/${item.number}`)}
            style={{
              padding: 14,
              backgroundColor: COLORS.card,
              marginBottom: 8,
              borderRadius: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: COLORS.cardActive,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <Text style={{ color: COLORS.accent, fontSize: 12, fontWeight: "600" }}>{item.number}</Text>
              </View>
              <View>
                <Text style={{ color: COLORS.textPrimary, fontSize: 16 }}>{item.englishName}</Text>
                <Text style={{ color: COLORS.textSecondary, marginTop: 2, fontSize: 12 }}>
                  {item.revelationType} · {item.numberOfAyahs} verses
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 20, color: COLORS.textPrimary }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
