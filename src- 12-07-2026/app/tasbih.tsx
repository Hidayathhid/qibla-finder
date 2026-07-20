// import { ArrowLeft, RotateCcw } from "lucide-react";
// import { motion } from "motion/react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";

// export default function Tasbeeh() {
//   const navigate = useNavigate();
//   const [count, setCount] = useState(0);
//   const [totalCount, setTotalCount] = useState(0);
//   const [target, setTarget] = useState(33);
//   const [selectedDhikr, setSelectedDhikr] = useState(0);

//   const dhikrOptions = [
//     { arabic: "سُبْحَانَ ٱللَّٰهِ", transliteration: "SubhanAllah", meaning: "Glory be to Allah" },
//     { arabic: "ٱلْحَمْدُ لِلَّٰهِ", transliteration: "Alhamdulillah", meaning: "Praise be to Allah" },
//     { arabic: "ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest" },
//     { arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "La ilaha illallah", meaning: "There is no god but Allah" },
//   ];

//   useEffect(() => {
//     const saved = localStorage.getItem("tasbeeh_total");
//     if (saved) setTotalCount(parseInt(saved));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tasbeeh_total", totalCount.toString());
//   }, [totalCount]);

//   const handleCount = () => {
//     const newCount = count + 1;
//     setCount(newCount);
//     setTotalCount(totalCount + 1);
//     if (navigator.vibrate) navigator.vibrate(50);
//     if (newCount >= target) setTimeout(() => setCount(0), 500);
//   };

//   const resetCount = () => setCount(0);

//   const resetTotal = () => {
//     if (confirm("Reset total count?")) {
//       setTotalCount(0);
//       setCount(0);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white sticky top-0 z-10 shadow-lg">
//         <div className="flex items-center gap-4 px-4 py-4">
//           <button onClick={() => navigate("/")} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
//             <ArrowLeft size={24} />
//           </button>
//           <div className="flex-1">
//             <h1 className="text-2xl font-bold">Digital Tasbeeh</h1>
//             <p className="text-blue-100 text-sm">التسبيح الرقمي</p>
//           </div>
//         </div>
//       </div>

//       <div className="px-4 py-8 flex flex-col items-center">
//         <div className="w-full max-w-md mb-8">
//           <div className="bg-white rounded-2xl shadow-xl p-6">
//             <p className="text-sm font-semibold text-gray-700 mb-3">Select Dhikr:</p>
//             <div className="space-y-2">
//               {dhikrOptions.map((dhikr, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedDhikr(index)}
//                   className={`w-full p-3 rounded-xl text-left transition-all ${
//                     selectedDhikr === index
//                       ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
//                       : "bg-gray-50 hover:bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   <p className="text-xl mb-1" style={{ fontFamily: 'serif' }}>{dhikr.arabic}</p>
//                   <p className="text-xs opacity-90">{dhikr.meaning}</p>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <motion.div
//           key={selectedDhikr}
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="bg-white rounded-2xl shadow-xl p-8 mb-8 w-full max-w-md text-center"
//         >
//           <p className="text-4xl leading-relaxed mb-3" style={{ fontFamily: 'serif' }}>
//             {dhikrOptions[selectedDhikr].arabic}
//           </p>
//           <p className="text-lg font-semibold text-gray-700 mb-1">{dhikrOptions[selectedDhikr].transliteration}</p>
//           <p className="text-sm text-gray-600">{dhikrOptions[selectedDhikr].meaning}</p>
//         </motion.div>

//         <motion.div key={count} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }} className="mb-8">
//           <div className="relative">
//             <svg className="w-64 h-64 transform -rotate-90">
//               <circle cx="128" cy="128" r="110" stroke="#e5e7eb" strokeWidth="12" fill="none" />
//               <circle
//                 cx="128" cy="128" r="110"
//                 stroke="url(#gradient)" strokeWidth="12" fill="none"
//                 strokeLinecap="round"
//                 strokeDasharray={`${(count / target) * 691.15} 691.15`}
//                 className="transition-all duration-300"
//               />
//               <defs>
//                 <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stopColor="#3b82f6" />
//                   <stop offset="100%" stopColor="#8b5cf6" />
//                 </linearGradient>
//               </defs>
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center">
//                 <p className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{count}</p>
//                 <p className="text-sm text-gray-500 mt-2">of {target}</p>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         <motion.button
//           whileTap={{ scale: 0.95 }}
//           onClick={handleCount}
//           className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white text-2xl font-bold shadow-2xl hover:shadow-3xl transition-shadow mb-6 active:shadow-inner"
//         >
//           TAP
//         </motion.button>

//         <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mb-6">
//           <div className="flex justify-around">
//             <div className="text-center">
//               <p className="text-3xl font-bold text-indigo-600">{count}</p>
//               <p className="text-sm text-gray-600">Current</p>
//             </div>
//             <div className="w-px bg-gray-200"></div>
//             <div className="text-center">
//               <p className="text-3xl font-bold text-purple-600">{totalCount}</p>
//               <p className="text-sm text-gray-600">Total</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mb-6">
//           <p className="text-sm font-semibold text-gray-700 mb-3">Target:</p>
//           <div className="flex gap-2">
//             {[33, 99, 100, 1000].map((num) => (
//               <button
//                 key={num}
//                 onClick={() => setTarget(num)}
//                 className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
//                   target === num ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {num}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="flex gap-4 w-full max-w-md">
//           <button
//             onClick={resetCount}
//             className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-colors flex items-center justify-center gap-2"
//           >
//             <RotateCcw size={20} /> Reset Current
//           </button>
//           <button
//             onClick={resetTotal}
//             className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-colors flex items-center justify-center gap-2"
//           >
//             <RotateCcw size={20} /> Reset Total
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from "react-native";

export default function Tasbeeh() {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [selectedDhikr, setSelectedDhikr] = useState(0);

  const dhikrOptions = [
    { arabic: "سُبْحَانَ ٱللَّٰهِ", meaning: "Glory be to Allah" },
    { arabic: "ٱلْحَمْدُ لِلَّٰهِ", meaning: "Praise be to Allah" },
    { arabic: "ٱللَّٰهُ أَكْبَرُ", meaning: "Allah is the Greatest" },
    { arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", meaning: "No god but Allah" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("tasbeeh_total", totalCount.toString());
  }, [totalCount]);

  const loadData = async () => {
    const saved = await AsyncStorage.getItem("tasbeeh_total");
    if (saved) setTotalCount(parseInt(saved));
  };

  const handleCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    setTotalCount(totalCount + 1);

    Vibration.vibrate(50);

    if (newCount >= target) {
      setTimeout(() => setCount(0), 300);
    }
  };

  const resetCount = () => setCount(0);

  const resetTotal = () => {
    Alert.alert("Reset", "Reset total count?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          setTotalCount(0);
          setCount(0);
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <Text style={styles.title}>🕌 Digital Tasbeeh</Text>

      {/* DHIKR SELECT */}
      <View style={styles.box}>
        {dhikrOptions.map((d, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.dhikrBtn,
              selectedDhikr === i && styles.selected,
            ]}
            onPress={() => setSelectedDhikr(i)}
          >
            <Text style={styles.arabic}>{d.arabic}</Text>
            <Text style={styles.meaning}>{d.meaning}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* COUNTER */}
      <View style={styles.counterBox}>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.target}>of {target}</Text>
      </View>

      {/* TAP BUTTON */}
      <TouchableOpacity style={styles.tapBtn} onPress={handleCount}>
        <Text style={styles.tapText}>TAP</Text>
      </TouchableOpacity>

      {/* TOTAL */}
      <View style={styles.row}>
        <Text style={styles.smallText}>Current: {count}</Text>
        <Text style={styles.smallText}>Total: {totalCount}</Text>
      </View>

      {/* TARGET BUTTONS */}
      <View style={styles.row}>
        {[33, 99, 100, 1000].map((n) => (
          <TouchableOpacity
            key={n}
            style={[
              styles.targetBtn,
              target === n && styles.selectedTarget,
            ]}
            onPress={() => setTarget(n)}
          >
            <Text style={{ color: "white" }}>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* RESET */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.reset} onPress={resetCount}>
          <Text style={{ color: "white" }}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetRed} onPress={resetTotal}>
          <Text style={{ color: "white" }}>Reset Total</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
    padding: 15,
  },

  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },

  box: {
    backgroundColor: "#1e293b",
    padding: 10,
    borderRadius: 10,
  },

  dhikrBtn: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#334155",
    borderRadius: 8,
  },

  selected: {
    backgroundColor: "#2563eb",
  },

  arabic: {
    color: "white",
    fontSize: 18,
  },

  meaning: {
    color: "#94a3b8",
  },

  counterBox: {
    alignItems: "center",
    marginVertical: 20,
  },

  count: {
    fontSize: 60,
    color: "white",
  },

  target: {
    color: "#94a3b8",
  },

  tapBtn: {
    backgroundColor: "#2563eb",
    padding: 30,
    borderRadius: 100,
    alignItems: "center",
    marginVertical: 20,
  },

  tapText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  smallText: {
    color: "white",
  },

  targetBtn: {
    padding: 10,
    backgroundColor: "#334155",
    borderRadius: 8,
  },

  selectedTarget: {
    backgroundColor: "#22c55e",
  },

  reset: {
    backgroundColor: "#f97316",
    padding: 10,
    borderRadius: 8,
  },

  resetRed: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
  },
});