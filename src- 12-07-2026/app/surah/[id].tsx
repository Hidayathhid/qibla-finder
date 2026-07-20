// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// import axios from "axios";
// import { useLocalSearchParams } from "expo-router";
// import { Audio } from "expo-av";

// export default function Surah() {
//   const { id } = useLocalSearchParams();
//   const [ayahs, setAyahs] = useState<any[]>([]);

//   useEffect(() => {
//     loadSurah();
//   }, []);

//   const loadSurah = async () => {
//     const res = await axios.get(
//       `https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`
//     );

//     setAyahs(res.data.data.ayahs);
//   };

//   const playAudio = async (url: string) => {
//     const { sound } = await Audio.Sound.createAsync({ uri: url });
//     await sound.playAsync();
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={ayahs}
//         keyExtractor={(item) => item.number.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.arabic}>{item.text}</Text>

//             <TouchableOpacity
//               style={styles.btn}
//               onPress={() => playAudio(item.audio)}
//             >
//               <Text style={{ color: "#fff" }}>▶ Play</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#fff",
//   },

//   card: {
//     backgroundColor: "#f4f4f4",
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 10,
//   },

//   arabic: {
//     fontSize: 26,
//     textAlign: "right",
//     lineHeight: 45,
//   },

//   btn: {
//     marginTop: 10,
//     backgroundColor: "green",
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//   },
// });

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Audio } from "expo-av";

export default function SurahScreen() {
  const [surah, setSurah] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // 📖 LOAD SURAH LIST
  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/surah");
        const json = await res.json();
        setSurah(json.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, []);

  // 🎧 GET AUDIO URL
  const getAudioUrl = (number) => {
    return `https://server8.mp3quran.net/afs/${String(number).padStart(3, "0")}.mp3`;
  };

  // ▶ PLAY
  const playAudio = async (item, index) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: getAudioUrl(item.number) },
        { shouldPlay: true }
      );

      setSound(newSound);
      setCurrentIndex(index);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          playNext(index);
        }
      });

    } catch (err) {
      console.log(err);
    }
  };

  // ⏸ PAUSE / RESUME
  const togglePlayPause = async () => {
    if (!sound) return;

    const status = await sound.getStatusAsync();

    if (status.isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  // ⏭ NEXT SURAH
  const playNext = async (index) => {
    if (index + 1 < surah.length) {
      playAudio(surah[index + 1], index + 1);
    }
  };

  // ⏮ PREVIOUS SURAH
  const playPrev = async (index) => {
    if (index - 1 >= 0) {
      playAudio(surah[index - 1], index - 1);
    }
  };

  // 🧹 CLEANUP
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading Quran...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        📖 Quran Surah
      </Text>

      {/* 🎛 CONTROL BAR */}
      {sound && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 15,
            backgroundColor: "#f2f2f2",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={() => playPrev(currentIndex)}>
            <Text style={{ fontSize: 18 }}>⏮ Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={togglePlayPause}>
            <Text style={{ fontSize: 18 }}>
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => playNext(currentIndex)}>
            <Text style={{ fontSize: 18 }}>⏭ Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 📜 SURAH LIST */}
      <FlatList
        data={surah}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => playAudio(item, index)}
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderColor: "#ddd",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: currentIndex === index ? "#e8ffe8" : "white",
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.number}. {item.englishName}
              </Text>
              <Text style={{ color: "gray" }}>{item.name}</Text>
            </View>

            <Text style={{ color: "green" }}>▶</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}