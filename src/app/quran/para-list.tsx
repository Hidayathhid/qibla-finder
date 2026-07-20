// src/app/quran/para-list.tsx
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLORS, JUZ_START } from "@/constants/quranMeta";

export default function ParaListScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, padding: 10 }}>
      <FlatList
        data={JUZ_START}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/para/${item.number}`)}
            style={{
              padding: 16,
              backgroundColor: COLORS.card,
              marginBottom: 8,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: COLORS.cardActive,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 14,
              }}
            >
              <Text style={{ color: COLORS.accent, fontWeight: "700" }}>{item.number}</Text>
            </View>
            <View>
              <Text style={{ color: COLORS.textPrimary, fontSize: 16, fontWeight: "600" }}>
                Para {item.number}
              </Text>
              <Text style={{ color: COLORS.textSecondary, marginTop: 2 }}>
                Starts: Surah {item.surah}, Ayah {item.ayah}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
