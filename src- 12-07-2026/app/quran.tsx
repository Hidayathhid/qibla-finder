// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// import axios from "axios";
// import { router } from "expo-router";

// export default function QuranScreen() {
//   const [surahs, setSurahs] = useState<any[]>([]);

//   useEffect(() => {
//     fetchSurahs();
//   }, []);

//   const fetchSurahs = async () => {
//     const res = await axios.get(
//       "https://api.alquran.cloud/v1/surah"
//     );

//     setSurahs(res.data.data);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={surahs}
//         keyExtractor={(item) => item.number.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() =>
//               router.push(`/surah/${item.number}`)
//             }
//           >
//             <Text style={styles.title}>
//               {item.number}. {item.englishName}
//             </Text>

//             <Text style={styles.arabic}>
//               {item.name}
//             </Text>
//           </TouchableOpacity>
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
//     backgroundColor: "#f2f2f2",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },

//   arabic: {
//     fontSize: 22,
//     textAlign: "right",
//     marginTop: 8,
//   },
// });


// import React, { useEffect, useState } from "react";
// import { FlatList, Text, TouchableOpacity, View } from "react-native";

// const TABS = ["Surah", "Para", "Manzil", "Sajdah"];

// export default function QuranScreen() {
//   const [tab, setTab] = useState("Surah");
//   const [surah, setSurah] = useState([]);

//   useEffect(() => {
//     fetch("https://api.alquran.cloud/v1/surah")
//       .then(res => res.json())
//       .then(data => setSurah(data.data));
//   }, []);

//   const getIcon = (revelation) => {
//     return revelation === "Meccan" ? "🕋" : "🕌";
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#0b1220", padding: 10 }}>

//       {/* HEADER */}
//       <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
//         📖 Holy Quran
//       </Text>

//       {/* TABS */}
//       <View style={{ flexDirection: "row", marginVertical: 15 }}>
//         {TABS.map((t) => (
//           <TouchableOpacity
//             key={t}
//             onPress={() => setTab(t)}
//             style={{
//               padding: 10,
//               marginRight: 10,
//               backgroundColor: tab === t ? "#22c55e" : "#1f2937",
//               borderRadius: 20,
//             }}
//           >
//             <Text style={{ color: "white" }}>{t}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* SURAH TAB */}
//       {tab === "Surah" && (
//         <FlatList
//           data={surah}
//           keyExtractor={(item) => item.number.toString()}
//           renderItem={({ item }) => (
//             <View
//               style={{
//                 padding: 12,
//                 backgroundColor: "#111827",
//                 marginBottom: 10,
//                 borderRadius: 12,
//               }}
//             >
//               <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                
//                 {/* LEFT */}
//                 <View>
//                   <Text style={{ color: "white", fontSize: 16 }}>
//                     {item.number}. {item.englishName}
//                   </Text>

//                   <Text style={{ color: "#94a3b8" }}>
//                     {item.name}
//                   </Text>
//                 </View>

//                 {/* RIGHT ICON */}
//                 <Text style={{ fontSize: 22 }}>
//                   {getIcon(item.revelationType)}
//                 </Text>

//               </View>

//               {/* ACTIONS */}
//               <View style={{ flexDirection: "row", marginTop: 10 }}>
//                 <Text style={{ color: "#22c55e", marginRight: 15 }}>
//                   ▶ Play
//                 </Text>
//                 <Text style={{ color: "#60a5fa" }}>
//                   ⬇ Download
//                 </Text>
//               </View>

//             </View>
//           )}
//         />
//       )}

//       {/* PLACEHOLDERS */}
//       {tab !== "Surah" && (
//         <View style={{ marginTop: 50, alignItems: "center" }}>
//           <Text style={{ color: "#94a3b8" }}>
//             {tab} coming soon...
//           </Text>
//         </View>
//       )}

//     </View>
//   );
// }

// - old code 

// 10-06-2026

import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TABS = ["Surah", "Para", "Manzil", "Sajdah"];

export default function QuranScreen() {
  const [tab, setTab] = useState("Surah");
  const [surah, setSurah] = useState([]);
  const [ayahs, setAyahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [sound, setSound] = useState(null);
  const [activeAyah, setActiveAyah] = useState(null);

  // LOAD SURAH LIST
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then(res => res.json())
      .then(data => setSurah(data.data));
  }, []);

  // LOAD AYAH WHEN SURAH SELECTED
  const openSurah = async (number) => {
    setSelectedSurah(number);
    setTab("Ayah");

    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${number}/ar.alafasy`
    );
    const json = await res.json();
    setAyahs(json.data.ayahs);
  };

  // PLAY AUDIO
  const playAudio = async (url, id) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );

      setSound(newSound);
      setActiveAyah(id);
    } catch (e) {
      Alert.alert("Error playing audio");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0b1220", padding: 10 }}>

      {/* HEADER */}
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        📖 Holy Quran
      </Text>

      {/* TABS */}
      <View style={{ flexDirection: "row", marginVertical: 15 }}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            style={{
              padding: 10,
              marginRight: 10,
              backgroundColor: tab === t ? "#22c55e" : "#1f2937",
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white" }}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SURAH LIST */}
      {tab === "Surah" && (
        <FlatList
          data={surah}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openSurah(item.number)}
              onLongPress={() => Alert.alert("Hold detected", "Tap to open")}
              delayLongPress={3000}
              style={{
                padding: 12,
                backgroundColor: "#111827",
                marginBottom: 10,
                borderRadius: 12,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {item.number}. {item.englishName}
                  </Text>

                  <Text style={{ color: "#94a3b8" }}>
                    {item.name}
                  </Text>
                </View>

                <Text style={{ fontSize: 22 }}>
                  {item.revelationType === "Meccan" ? "🕋" : "🕌"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* AYAH SCREEN */}
      {tab === "Ayah" && (
        <FlatList
          data={ayahs}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => setActiveAyah(item.number)} // 👈 3 sec hold
              delayLongPress={3000}
              style={{
                padding: 18,
                backgroundColor: "#111827",
                marginBottom: 10,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 22, textAlign: "center" }}>
                {item.text}
              </Text>

              {/* SHOW PLAY BUTTON AFTER LONG PRESS */}
              {activeAyah === item.number && (
                <TouchableOpacity
                  onPress={() => playAudio(item.audio, item.number)}
                  style={{
                    marginTop: 10,
                    backgroundColor: "#22c55e",
                    paddingHorizontal: 15,
                    paddingVertical: 6,
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ color: "white" }}>▶ Play Ayah</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          )}
        />
      )}

      {/* PLACEHOLDER */}
      {tab !== "Surah" && tab !== "Ayah" && (
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <Text style={{ color: "#94a3b8" }}>
            {tab} coming soon...
          </Text>
        </View>
      )}

    </View>
  );
}