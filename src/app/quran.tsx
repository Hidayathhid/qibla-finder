// src/app/quran.tsx
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/constants/quranMeta";
import { getLastRead, LastRead } from "@/services/storage";

const SECTIONS = [
  { label: "Surah", subtitle: "114 chapters", icon: "📖", route: "/quran/surah-list" },
  { label: "Para (Juz)", subtitle: "30 parts", icon: "📚", route: "/quran/para-list" },
  { label: "Manzil", subtitle: "7 divisions", icon: "🗂️", route: "/quran/manzil-list" },
  { label: "Sajdah", subtitle: "Verses of prostration", icon: "🕌", route: "/quran/sajdah-list" },
] as const;

export default function QuranScreen() {
  const [lastRead, setLastRead] = useState<LastRead | null>(null);

  useEffect(() => {
    getLastRead().then(setLastRead);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, padding: 16 }}>
      <Text style={{ color: COLORS.textPrimary, fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        📖 Holy Quran
      </Text>

      {lastRead && (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/surah/${lastRead.surahNumber}`,
              params: { ayah: String(lastRead.ayahNumber) },
            })
          }
          style={{
            backgroundColor: COLORS.cardActive,
            padding: 16,
            borderRadius: 14,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: COLORS.accent,
          }}
        >
          <Text style={{ color: COLORS.accent, fontSize: 12, marginBottom: 4 }}>CONTINUE READING</Text>
          <Text style={{ color: COLORS.textPrimary, fontSize: 16, fontWeight: "600" }}>
            {lastRead.surahName} — Ayah {lastRead.ayahNumber}
          </Text>
        </TouchableOpacity>
      )}

      {SECTIONS.map((s) => (
        <TouchableOpacity
          key={s.label}
          onPress={() => router.push(s.route as any)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.card,
            padding: 18,
            borderRadius: 14,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 26, marginRight: 14 }}>{s.icon}</Text>
          <View>
            <Text style={{ color: COLORS.textPrimary, fontSize: 18, fontWeight: "600" }}>{s.label}</Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 13, marginTop: 2 }}>{s.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
