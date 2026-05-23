import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { router } from "expo-router";

export default function QuranScreen() {
  const [surahs, setSurahs] = useState<any[]>([]);

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    const res = await axios.get(
      "https://api.alquran.cloud/v1/surah"
    );

    setSurahs(res.data.data);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={surahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(`/surah/${item.number}`)
            }
          >
            <Text style={styles.title}>
              {item.number}. {item.englishName}
            </Text>

            <Text style={styles.arabic}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  arabic: {
    fontSize: 22,
    textAlign: "right",
    marginTop: 8,
  },
});