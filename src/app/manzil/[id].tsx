// src/app/manzil/[id].tsx
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLORS, MANZIL_RANGES } from "@/constants/quranMeta";
import { fetchSurahList, SurahMeta } from "@/services/quranApi";

export default function ManzilDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [surahs, setSurahs] = useState<SurahMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const range = MANZIL_RANGES.find((m) => m.number === Number(id));

  useEffect(() => {
    fetchSurahList()
      .then((all) => {
        const filtered = range ? all.filter((s) => s.number >= range.start && s.number <= range.end) : [];
        setSurahs(filtered);
      })
      .catch(() => setError("Could not load surahs for this Manzil."))
      .finally(() => setLoading(false));
  }, [id]);

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
        Manzil {id}
      </Text>
      <FlatList
        data={surahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/surah/${item.number}`)}
            style={{ padding: 14, backgroundColor: COLORS.card, marginBottom: 8, borderRadius: 12 }}
          >
            <Text style={{ color: COLORS.textPrimary, fontSize: 16 }}>
              {item.number}. {item.englishName}
            </Text>
            <Text style={{ color: COLORS.textSecondary, marginTop: 2 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
