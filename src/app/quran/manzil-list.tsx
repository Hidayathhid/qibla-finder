// src/app/quran/manzil-list.tsx
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLORS, MANZIL_RANGES } from "@/constants/quranMeta";

export default function ManzilListScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, padding: 10 }}>
      <FlatList
        data={MANZIL_RANGES}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/manzil/${item.number}`)}
            style={{
              padding: 16,
              backgroundColor: COLORS.card,
              marginBottom: 8,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: COLORS.textPrimary, fontSize: 16, fontWeight: "600" }}>
              Manzil {item.number}
            </Text>
            <Text style={{ color: COLORS.textSecondary, marginTop: 2 }}>
              Surah {item.start} – {item.end}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
