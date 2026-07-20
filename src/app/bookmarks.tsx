// src/app/bookmarks.tsx
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/constants/quranMeta";
import { Bookmark, getBookmarks, removeBookmark } from "@/services/storage";

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Reload every time this screen is focused, since bookmarks can be added from the reader
  useFocusEffect(
    useCallback(() => {
      getBookmarks().then(setBookmarks);
    }, [])
  );

  const handleRemove = async (id: string) => {
    const updated = await removeBookmark(id);
    setBookmarks(updated);
  };

  if (bookmarks.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ color: COLORS.textSecondary, textAlign: "center" }}>
          No bookmarks yet. Tap the ☆ icon on any verse in the reader to save it here.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, padding: 10 }}>
      <Text style={{ color: COLORS.textPrimary, fontSize: 24, fontWeight: "bold", margin: 10 }}>
        ★ Bookmarks
      </Text>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/surah/${item.surahNumber}`,
                params: { ayah: String(item.ayahNumber) },
              })
            }
            style={{
              padding: 16,
              backgroundColor: COLORS.card,
              marginBottom: 8,
              borderRadius: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: COLORS.textPrimary, fontSize: 16 }}>
                {item.surahName} — Ayah {item.ayahNumber}
              </Text>
              <Text style={{ color: COLORS.textSecondary, fontSize: 12, marginTop: 4 }}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <Text style={{ color: COLORS.danger, fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
