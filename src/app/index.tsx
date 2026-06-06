// // // import * as Device from 'expo-device';
// // // import { Platform, StyleSheet } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // import { AnimatedIcon } from '@/components/animated-icon';
// // // import { HintRow } from '@/components/hint-row';
// // // import { ThemedText } from '@/components/themed-text';
// // // import { ThemedView } from '@/components/themed-view';
// // // import { WebBadge } from '@/components/web-badge';
// // // import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

// // // function getDevMenuHint() {
// // //   if (Platform.OS === 'web') {
// // //     return <ThemedText type="small">use browser devtools</ThemedText>;
// // //   }
// // //   if (Device.isDevice) {
// // //     return (
// // //       <ThemedText type="small">
// // //         shake device or press <ThemedText type="code">m</ThemedText> in terminal
// // //       </ThemedText>
// // //     );
// // //   }
// // //   const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
// // //   return (
// // //     <ThemedText type="small">
// // //       press <ThemedText type="code">{shortcut}</ThemedText>
// // //     </ThemedText>
// // //   );
// // // }

// // // export default function HomeScreen() {
// // //   return (
// // //     <ThemedView style={styles.container}>
// // //       <SafeAreaView style={styles.safeArea}>
// // //         <ThemedView style={styles.heroSection}>
// // //           <AnimatedIcon />
// // //           <ThemedText type="title" style={styles.title}>
// // //             Welcome to&nbsp;Expo
// // //           </ThemedText>
// // //         </ThemedView>

// // //         <ThemedText type="code" style={styles.code}>
// // //           get started by hid
// // //         </ThemedText>

// // //         <ThemedView type="backgroundElement" style={styles.stepContainer}>
// // //           <HintRow
// // //             title="Try editing"
// // //             hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
// // //           />
// // //           <HintRow title="Dev tools" hint={getDevMenuHint()} />
// // //           <HintRow
// // //             title="Fresh start"
// // //             hint={<ThemedText type="code">npm run reset-project</ThemedText>}
// // //           />
// // //         </ThemedView>

// // //         {Platform.OS === 'web' && <WebBadge />}
// // //       </SafeAreaView>
// // //     </ThemedView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     flexDirection: 'row',
// // //   },
// // //   safeArea: {
// // //     flex: 1,
// // //     paddingHorizontal: Spacing.four,
// // //     alignItems: 'center',
// // //     gap: Spacing.three,
// // //     paddingBottom: BottomTabInset + Spacing.three,
// // //     maxWidth: MaxContentWidth,
// // //   },
// // //   heroSection: {
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     flex: 1,
// // //     paddingHorizontal: Spacing.four,
// // //     gap: Spacing.four,
// // //   },
// // //   title: {
// // //     textAlign: 'center',
// // //   },
// // //   code: {
// // //     textTransform: 'uppercase',
// // //   },
// // //   stepContainer: {
// // //     gap: Spacing.three,
// // //     alignSelf: 'stretch',
// // //     paddingHorizontal: Spacing.three,
// // //     paddingVertical: Spacing.four,
// // //     borderRadius: Spacing.four,
// // //   },
// // // });



// // import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// // import { router } from "expo-router";

// // export default function Home() {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>🕌 Islamic App</Text>

// //       {/* QIBLA BUTTON */}
// //       <TouchableOpacity
// //         style={styles.button}
// //         onPress={() => router.push("/qibla")}
// //       >
// //         <Text style={styles.text}>🧭 Qibla Finder</Text>
// //       </TouchableOpacity>

// //       {/* QURAN BUTTON */}
// //       <TouchableOpacity
// //         style={styles.button}
// //         onPress={() => router.push("/quran")}
// //       >
// //         <Text style={styles.text}>📖 Quran</Text>
// //       </TouchableOpacity>

      
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     padding: 20,
// //     backgroundColor: "#fff",
// //   },

// //   title: {
// //     fontSize: 30,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     marginBottom: 40,
// //   },

// //   button: {
// //     backgroundColor: "#0f8a0f",
// //     padding: 18,
// //     borderRadius: 12,
// //     marginBottom: 15,
// //   },

// //   text: {
// //     color: "white",
// //     fontSize: 18,
// //     textAlign: "center",
// //     fontWeight: "bold",
// //   },
// // });

// import { router } from "expo-router";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function Home() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🕌 Islamic App</Text>

//       {/* QIBLA */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/qibla")}
//       >
//         <Text style={styles.text}>🧭 Qibla Finder</Text>
//       </TouchableOpacity>

//       {/* QURAN */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/quran")}
//       >
//         <Text style={styles.text}>📖 Quran</Text>
//       </TouchableOpacity>

//       {/* TASBIH (FIXED) */}
//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: "#1e88e5" }]}
//         onPress={() => router.push("/tasbih")}
//       >
//         <Text style={styles.text}>📿 Tasbih Counter</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#fff",
//   },

//   title: {
//     fontSize: 30,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 40,
//   },

//   button: {
//     backgroundColor: "#0f8a0f",
//     padding: 18,
//     borderRadius: 12,
//     marginBottom: 15,
//   },

//   text: {
//     color: "white",
//     fontSize: 18,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });

// import React from "react";
// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// // const MenuCard = ({ title, icon, route, color }) => (
// //   <TouchableOpacity
// //     style={[styles.card, { backgroundColor: color }]}
// //     onPress={() => router.push(route)}
// //   >
// //     <Text style={styles.icon}>{icon}</Text>
// //     <Text style={styles.cardText}>{title}</Text>
// //   </TouchableOpacity>
// // );

// const MenuCard = ({ title, icon, route, color }) => (
//   <TouchableOpacity
//     style={[styles.card, { backgroundColor: color }]}
//     onPress={() => {
//       console.log("CARD PRESSED");
//       console.log("Route:", route);
//       router.push(route);
//     }}
//   >
//     <Text style={styles.icon}>{icon}</Text>
//     <Text style={styles.cardText}>{title}</Text>
//   </TouchableOpacity>
// );

// export default function Home() {
//   return (
//     <ScrollView style={styles.container}>

//       {/* HEADER */}
//       <View style={styles.header}>
//         <Text style={styles.title}>🕌 Islamic Hub</Text>
//         <Text style={styles.subtitle}>Kanzul Iman Style App</Text>
//       </View>

//       {/* GRID MENU */}
//       <View style={styles.grid}>

//         <MenuCard
//           icon="📖"
//           title="Quran"
//           route="/quran"
//           color="#16a34a"
//         />

//         <MenuCard
//           icon="🧭"
//           title="Qibla"
//           route="/qibla"
//           color="#0ea5e9"
//         />

//         <MenuCard
//           icon="📿"
//           title="Tasbih"
//           route="/tasbih"
//           color="#f97316"
//         />

//         <MenuCard
//           icon="📚"
//           title="Surah List"
//           route="/quran"
//           color="#8b5cf6"
//         />

//         <MenuCard
//           icon="🎧"
//           title="Audio Quran"
//           route="/quran"
//           color="#ef4444"
//         />

//         <MenuCard
//           icon="📅"
//           title="Coming Soon"
//           route="/"
//           color="#64748b"
//         />

//       </View>

//       {/* FOOTER */}
//       <View style={styles.footer}>
//         <Text style={{ color: "#94a3b8" }}>
//           ✨ Made with Islamic Love
//         </Text>
//       </View>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0b1220",
//     padding: 15,
//   },

//   header: {
//     marginTop: 40,
//     marginBottom: 20,
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "white",
//   },

//   subtitle: {
//     color: "#94a3b8",
//     marginTop: 5,
//   },

//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },

//   card: {
//     width: "47%",
//     height: 120,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     elevation: 6,
//   },

//   icon: {
//     fontSize: 32,
//   },

//   cardText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "white",
//     fontWeight: "bold",
//   },

//   footer: {
//     marginTop: 30,
//     alignItems: "center",
//   },
// });

import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MenuCardProps = {
  title: string;
  icon: string;
  route: string;
  color: string;
};

const MenuCard = ({ title, icon, route, color }: MenuCardProps) => (
  <TouchableOpacity
    style={[styles.card, { backgroundColor: color }]}
    onPress={() => {
      console.log("CARD PRESSED:", title);
      console.log("NAVIGATING TO:", route);
      router.push(route);
    }}
  >
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.cardText}>{title}</Text>
  </TouchableOpacity>
);

export default function Home() {
  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>🕌 Islamic Hub</Text>
        <Text style={styles.subtitle}>Kanzul Iman Style App</Text>
      </View>

      {/* GRID MENU */}
      <View style={styles.grid}>

        <MenuCard
          icon="📖"
          title="Quran"
          route="/quran"
          color="#16a34a"
        />

        <MenuCard
          icon="🧭"
          title="Qibla"
          route="/qibla"
          color="#0ea5e9"
        />

        <MenuCard
          icon="📿"
          title="Tasbih"
          route="/tasbih"
          color="#f97316"
        />

        <MenuCard
          icon="📚"
          title="Surah List"
          route="/quran"
          color="#8b5cf6"
        />

        <MenuCard
          icon="🎧"
          title="Audio Quran"
          route="/quran"
          color="#ef4444"
        />

        <MenuCard
          icon="📅"
          title="Coming Soon"
          route="/"
          color="#64748b"
        />

      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={{ color: "#94a3b8" }}>
          ✨ Made with Islamic Loves
        </Text>
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

  header: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: 5,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "47%",
    height: 120,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },

  icon: {
    fontSize: 32,
  },

  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  footer: {
    marginTop: 30,
    alignItems: "center",
  },
});