// // src/app/tasbih.tsx
// import * as Haptics from "expo-haptics";
// import React, { useEffect, useState } from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import { COLORS } from "@/constants/quranMeta";
// import { getTasbeeh, saveTasbeeh, TasbeehSession } from "@/services/storage";

// const DHIKR_OPTIONS = [
//   { text: "SubhanAllah", target: 33 },
//   { text: "Alhamdulillah", target: 33 },
//   { text: "Allahu Akbar", target: 34 },
//   { text: "Astaghfirullah", target: 100 },
// ];

// export default function TasbihScreen() {
//   const [selected, setSelected] = useState(DHIKR_OPTIONS[0]);
//   const [session, setSession] = useState<TasbeehSession | null>(null);

//   useEffect(() => {
//     getTasbeeh(selected.text, selected.target).then(setSession);
//   }, [selected]);

//   const increment = async () => {
//     if (!session) return;
//     const updated = { ...session, count: session.count + 1 };
//     setSession(updated);
//     await saveTasbeeh(updated);

//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

//     if (updated.count > 0 && updated.count % updated.target === 0) {
//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//     }
//   };

//   const reset = async () => {
//     if (!session) return;
//     const updated = { ...session, count: 0 };
//     setSession(updated);
//     await saveTasbeeh(updated);
//   };

//   if (!session) return null;

//   const progress = Math.min(session.count / session.target, 1);

//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.bg, padding: 20 }}>
//       <Text style={{ color: COLORS.textPrimary, fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
//         📿 Tasbeeh Counter
//       </Text>

//       <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20 }}>
//         {DHIKR_OPTIONS.map((opt) => (
//           <TouchableOpacity
//             key={opt.text}
//             onPress={() => setSelected(opt)}
//             style={{
//               padding: 10,
//               paddingHorizontal: 14,
//               borderRadius: 20,
//               backgroundColor: selected.text === opt.text ? COLORS.accent : COLORS.card,
//               marginRight: 8,
//               marginBottom: 8,
//             }}
//           >
//             <Text style={{ color: COLORS.textPrimary }}>{opt.text}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <TouchableOpacity
//         onPress={increment}
//         activeOpacity={0.8}
//         style={{
//           flex: 1,
//           backgroundColor: COLORS.card,
//           borderRadius: 24,
//           justifyContent: "center",
//           alignItems: "center",
//           marginBottom: 20,
//         }}
//       >
//         <Text style={{ color: COLORS.textSecondary, fontSize: 16, marginBottom: 6 }}>{selected.text}</Text>
//         <Text style={{ color: COLORS.textPrimary, fontSize: 72, fontWeight: "bold" }}>{session.count}</Text>
//         <Text style={{ color: COLORS.textSecondary, fontSize: 14, marginTop: 6 }}>
//           Target: {session.target}
//         </Text>

//         <View style={{ width: "70%", height: 6, backgroundColor: COLORS.cardActive, borderRadius: 3, marginTop: 20 }}>
//           <View
//             style={{
//               width: `${progress * 100}%`,
//               height: 6,
//               backgroundColor: COLORS.accent,
//               borderRadius: 3,
//             }}
//           />
//         </View>

//         <Text style={{ color: COLORS.textSecondary, marginTop: 20, fontSize: 13 }}>Tap anywhere to count</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={reset}
//         style={{
//           backgroundColor: COLORS.cardActive,
//           padding: 14,
//           borderRadius: 12,
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ color: COLORS.textPrimary, fontWeight: "600" }}>Reset</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }


// src/app/tasbih.tsx

import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/quranMeta";
import { getTasbeeh, saveTasbeeh, TasbeehSession } from "@/services/storage";

const DHIKR_OPTIONS = [
  {
    text: "SubhanAllah",
    arabic: "سُبْحَانَ ٱللَّٰهِ",
    meaning: "Glory be to Allah",
    target: 33,
  },
  {
    text: "Alhamdulillah",
    arabic: "ٱلْحَمْدُ لِلَّٰهِ",
    meaning: "Praise be to Allah",
    target: 33,
  },
  {
    text: "Allahu Akbar",
    arabic: "ٱللَّٰهُ أَكْبَرُ",
    meaning: "Allah is the Greatest",
    target: 34,
  },
  {
    text: "Astaghfirullah",
    arabic: "أَسْتَغْفِرُ ٱللَّٰهَ",
    meaning: "I seek forgiveness from Allah",
    target: 100,
  },
];

export default function TasbihScreen() {
  const [selected, setSelected] = useState(DHIKR_OPTIONS[0]);
  const [session, setSession] = useState<TasbeehSession | null>(null);

  useEffect(() => {
    getTasbeeh(selected.text, selected.target).then(setSession);
  }, [selected]);

  const increment = async () => {
    if (!session) return;

    const updated = {
      ...session,
      count: session.count + 1,
    };

    setSession(updated);
    await saveTasbeeh(updated);

    Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Medium
    );

    if (updated.count > 0 && updated.count % updated.target === 0) {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    }
  };


  const reset = async () => {
    if (!session) return;

    Alert.alert(
      "Reset Tasbeeh",
      "Reset current count?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: async () => {
            const updated = {
              ...session,
              count: 0,
            };

            setSession(updated);
            await saveTasbeeh(updated);
          },
        },
      ]
    );
  };


  if (!session) return null;


  const progress = Math.min(
    session.count / session.target,
    1
  );


  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}
      <Text style={styles.title}>
        📿 Digital Tasbeeh
      </Text>


      {/* DHIKR SELECT */}
      <View style={styles.box}>

        {DHIKR_OPTIONS.map((item) => (

          <TouchableOpacity
            key={item.text}
            onPress={() => setSelected(item)}
            style={[
              styles.dhikrBtn,
              selected.text === item.text &&
              styles.selected,
            ]}
          >

            <Text style={styles.arabic}>
              {item.arabic}
            </Text>

            <Text style={styles.meaning}>
              {item.text}
            </Text>

          </TouchableOpacity>

        ))}

      </View>



      {/* COUNTER CARD */}

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={increment}
        style={styles.counterCard}
      >

        <Text style={styles.currentDhikr}>
          {selected.text}
        </Text>


        <Text style={styles.count}>
          {session.count}
        </Text>


        <Text style={styles.target}>
          Target : {session.target}
        </Text>


        {/* PROGRESS */}

        <View style={styles.progressBg}>
          <View
            style={[
              styles.progress,
              {
                width: `${progress * 100}%`,
              },
            ]}
          />
        </View>


        <Text style={styles.tapText}>
          Tap anywhere to count
        </Text>

      </TouchableOpacity>



      {/* TOTAL INFO */}

      <View style={styles.row}>

        <Text style={styles.info}>
          Current: {session.count}
        </Text>

        <Text style={styles.info}>
          Target: {session.target}
        </Text>

      </View>



      {/* TARGET BUTTONS */}

      <View style={styles.row}>

        {[33, 34, 99, 100].map((num) => (

          <TouchableOpacity
            key={num}
            onPress={() =>
              setSelected({
                ...selected,
                target: num,
              })
            }
            style={[
              styles.targetBtn,
              selected.target === num &&
              styles.activeTarget,
            ]}
          >

            <Text style={styles.white}>
              {num}
            </Text>

          </TouchableOpacity>

        ))}

      </View>



      {/* RESET */}

      <TouchableOpacity
        onPress={reset}
        style={styles.reset}
      >

        <Text style={styles.white}>
          Reset Count
        </Text>

      </TouchableOpacity>


    </ScrollView>
  );
}



const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:COLORS.bg,
    padding:15,
  },


  title:{
    color:COLORS.textPrimary,
    fontSize:26,
    fontWeight:"bold",
    textAlign:"center",
    marginVertical:20,
  },


  box:{
    backgroundColor:COLORS.card,
    borderRadius:12,
    padding:10,
  },


  dhikrBtn:{
    backgroundColor:COLORS.cardActive,
    padding:12,
    borderRadius:10,
    marginBottom:8,
  },


  selected:{
    backgroundColor:COLORS.accent,
  },


  arabic:{
    color:COLORS.textPrimary,
    fontSize:22,
  },


  meaning:{
    color:COLORS.textSecondary,
    marginTop:4,
  },


  counterCard:{
    backgroundColor:COLORS.card,
    marginTop:20,
    borderRadius:24,
    padding:30,
    alignItems:"center",
  },


  currentDhikr:{
    color:COLORS.textSecondary,
    fontSize:18,
  },


  count:{
    color:COLORS.textPrimary,
    fontSize:80,
    fontWeight:"bold",
    marginVertical:15,
  },


  target:{
    color:COLORS.textSecondary,
  },


  progressBg:{
    width:"80%",
    height:8,
    backgroundColor:COLORS.cardActive,
    borderRadius:10,
    marginTop:25,
  },


  progress:{
    height:8,
    backgroundColor:COLORS.accent,
    borderRadius:10,
  },


  tapText:{
    color:COLORS.textSecondary,
    marginTop:20,
  },


  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginVertical:15,
  },


  info:{
    color:COLORS.textPrimary,
  },


  targetBtn:{
    backgroundColor:COLORS.cardActive,
    padding:12,
    borderRadius:10,
  },


  activeTarget:{
    backgroundColor:COLORS.accent,
  },


  reset:{
    backgroundColor:"#ef4444",
    padding:15,
    borderRadius:12,
    alignItems:"center",
    marginBottom:20,
  },


  white:{
    color:"#fff",
    fontWeight:"bold",
  },

});