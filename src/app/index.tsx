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

// 08-06-2026 - OLD MENU
// import { router } from "expo-router";
// import React from "react";
// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// type MenuCardProps = {
//   title: string;
//   icon: string;
//   route: string;
//   color: string;
// };

// const MenuCard = ({ title, icon, route, color }: MenuCardProps) => (
//   <TouchableOpacity
//     style={[styles.card, { backgroundColor: color }]}
//     onPress={() => {
//       console.log("CARD PRESSED:", title);
//       console.log("NAVIGATING TO:", route);
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
//           ✨ Made with Islamic Loves
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



// import React from 'react';
// import {
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const menuItems = [
//   {
//     id: '1',
//     title: 'Start Reading',
//     color1: '#1FBF9F',
//     color2: '#1E9B83',
//     icon: '📖',
//   },
//   {
//     id: '2',
//     title: 'Continue Reading',
//     color1: '#22C55E',
//     color2: '#16A34A',
//     icon: '▶️',
//   },
//   {
//     id: '3',
//     title: 'Prayer Times',
//     color1: '#14B8A6',
//     color2: '#0F766E',
//     icon: '🕒',
//   },
//   {
//     id: '4',
//     title: 'Qibla Direction',
//     color1: '#F59E0B',
//     color2: '#D97706',
//     icon: '🧭',
//   },
//   {
//     id: '5',
//     title: 'Mosque Finder',
//     color1: '#34D399',
//     color2: '#10B981',
//     icon: '🕌',
//   },
//   {
//     id: '6',
//     title: 'Zakat Calculator',
//     color1: '#F59E0B',
//     color2: '#D97706',
//     icon: '🧮',
//   },
//   {
//     id: '7',
//     title: 'Tasbeeh Counter',
//     color1: '#8B5CF6',
//     color2: '#7C3AED',
//     icon: '📿',
//   },
//   {
//     id: '8',
//     title: 'Bookmarks',
//     color1: '#A855F7',
//     color2: '#9333EA',
//     icon: '🔖',
//   },
// ];

// const MenuCard = ({ item }) => {
//   return (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       style={[
//         styles.card,
//         {
//           backgroundColor: item.color1,
//           borderLeftColor: item.color2,
//         },
//       ]}>
//       <View style={styles.leftContent}>
//         <View style={styles.iconContainer}>
//           <Text style={styles.icon}>{item.icon}</Text>
//         </View>

//         <Text style={styles.title}>{item.title}</Text>
//       </View>

//       <Text style={styles.arrow}>›</Text>
//     </TouchableOpacity>
//   );
// };

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#083344" />

//       <View style={styles.header}>
//         <Text style={styles.name}>Kanzul Iman</Text>
//         <Text style={styles.sub}>Home</Text>
//       </View>

//       <FlatList
//         data={menuItems}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <MenuCard item={item} />}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0B5563',
//     paddingHorizontal: 22,
//     paddingTop: 20,
//   },

//   header: {
//     marginBottom: 25,
//   },

//   name: {
//     color: '#fff',
//     fontSize: 26,
//     fontWeight: '700',
//   },

//   sub: {
//     color: '#CFFAFE',
//     marginTop: 4,
//     fontSize: 14,
//   },

//   card: {
//     height: 72,
//     borderRadius: 20,
//     marginBottom: 15,
//     marginLeft: 30,
//     marginRight:30,
//     paddingHorizontal: 18,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',

//     borderLeftWidth: 4,

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,

//     elevation: 5,
//   },

//   leftContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
    
//   },

//   iconContainer: {
//     width: 42,
//     height: 42,
//     borderRadius: 14,
//     backgroundColor: 'rgba(255,255,255,0.18)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 14,
//   },

//   icon: {
//     fontSize: 20,
//   },

//   title: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '600',
//   },

//   arrow: {
//     color: '#fff',
//     fontSize: 29,
//     fontWeight: '300',
//   },
// });

// import React from 'react';
// import { router } from 'expo-router';
// import {
//   FlatList,
//   ImageBackground,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const menuItems = [
//   { id: '1', title: 'Start Reading', color1: '#1FBF9F', color2: '#1E9B83', icon: '📖' },
//   { id: '2', title: 'Continue Reading', color1: '#22C55E', color2: '#16A34A', icon: '▶️' },
//   { id: '3', title: 'Prayer Times', color1: '#14B8A6', color2: '#0F766E', icon: '🕒' },
//   { id: '4', title: 'Qibla Direction', color1: '#F59E0B', color2: '#D97706', icon: '🧭' },
//   { id: '5', title: 'Mosque Finder', color1: '#34D399', color2: '#10B981', icon: '🕌' },
//   { id: '6', title: 'Zakat Calculator', color1: '#F59E0B', color2: '#D97706', icon: '🧮' },
//   { id: '7', title: 'Tasbeeh Counter', color1: '#8B5CF6', color2: '#7C3AED', icon: '📿', onClick: () => router.push('/tasbih')},
//   { id: '8', title: 'Bookmarks', color1: '#A855F7', color2: '#9333EA', icon: '🔖' },
// ];

// const MenuCard = ({ item }) => {
//   return (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       style={[
//         styles.card,
//         {
//           backgroundColor: item.color1,
//           borderLeftColor: item.color2,
//         },
//       ]}
//     >
//       <View style={styles.leftContent}>
//         <View style={styles.iconContainer}>
//           <Text style={styles.icon}>{item.icon}</Text>
//         </View>

//         <Text style={styles.title}>{item.title}</Text>
//       </View>

//       <Text style={styles.arrow}>›</Text>
//     </TouchableOpacity>
//   );
// };

// export default function App() {
//   return (
//     <ImageBackground
//       source={{
//         uri: 'https://images.unsplash.com/photo-1731405717211-00dc10f91792?q=80&w=229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       }} // replace with Madina image if you want
//       style={styles.background}
//       resizeMode="cover"
//     >
//       {/* Dark overlay for readability */}
//       <View style={styles.overlay} />

//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor="#083344" />

//         <View style={styles.header}>
//           <Text style={styles.name}>Kanzul Iman</Text>
//           <Text style={styles.sub}>Home</Text>
//         </View>

//         <FlatList
//           data={menuItems}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => <MenuCard item={item} />}
//           contentContainerStyle={{ paddingBottom: 30 }}
//           showsVerticalScrollIndicator={false}
//         />
//       </SafeAreaView>
//     </ImageBackground>
//   );
// }

// import { router } from 'expo-router';
// import React from 'react';
// import {
//   FlatList,
//   ImageBackground,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const menuItems = [
//   { id: '1', title: 'Start Reading', color1: '#1FBF9F', color2: '#1E9B83', icon: '📖', route: '/quran' },
//   { id: '2', title: 'Continue Reading', color1: '#22C55E', color2: '#16A34A', icon: '▶️', route: '/continue' },
//   { id: '3', title: 'Prayer Times', color1: '#14B8A6', color2: '#0F766E', icon: '🕒', route: '/prayer' },
//   { id: '4', title: 'Qibla Direction', color1: '#F59E0B', color2: '#D97706', icon: '🧭', route: '/qibla' },
//   { id: '5', title: 'Mosque Finder', color1: '#34D399', color2: '#10B981', icon: '🕌', route: '/mosques' },
//   { id: '6', title: 'Zakat Calculator', color1: '#F59E0B', color2: '#D97706', icon: '🧮', route: '/zakat' },
//   { id: '7', title: 'Tasbeeh Counter', color1: '#8B5CF6', color2: '#7C3AED', icon: '📿', route: '/tasbih' },
//   { id: '8', title: 'Bookmarks', color1: '#A855F7', color2: '#9333EA', icon: '🔖', route: '/bookmarks' },
// ];

// const MenuCard = ({ item }) => {
//   return (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       onPress={() => item.route && router.push(item.route)}
//       style={[
//         styles.card,
//         {
//           backgroundColor: item.color1,
//           borderLeftColor: item.color2,
//         },
//       ]}
//     >
//       <View style={styles.leftContent}>
//         <View style={styles.iconContainer}>
//           <Text style={styles.icon}>{item.icon}</Text>
//         </View>

//         <Text style={styles.title}>{item.title}</Text>
//       </View>

//       <Text style={styles.arrow}>›</Text>
//     </TouchableOpacity>
//   );
// };

// export default function App() {
//   return (
//     <ImageBackground
//       source={{
//         uri: 'https://images.unsplash.com/photo-1731405717211-00dc10f91792?q=80&w=800&auto=format&fit=crop',
//       }}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay} />

//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="light-content" />

//         <View style={styles.header}>
//           <Text style={styles.name}>Kanzul Iman</Text>
//           <Text style={styles.sub}>Home</Text>
//         </View>

//         <FlatList
//           data={menuItems}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => <MenuCard item={item} />}
//           contentContainerStyle={{ paddingBottom: 30 }}
//           showsVerticalScrollIndicator={false}
//         />
//       </SafeAreaView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.45)',
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal: 22,
//     paddingTop: 20,
//   },

//   header: {
//     marginBottom: 25,
//   },

//   name: {
//     color: '#fff',
//     fontSize: 26,
//     fontWeight: '700',
//   },

//   sub: {
//     color: '#CFFAFE',
//     marginTop: 4,
//     fontSize: 14,
//   },

//   card: {
//     height: 72,
//     borderRadius: 20,
//     marginBottom: 15,
//     marginLeft: 30,
//     marginRight: 30,
//     paddingHorizontal: 18,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderLeftWidth: 4,

//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },

//   leftContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   iconContainer: {
//     width: 42,
//     height: 42,
//     borderRadius: 14,
//     backgroundColor: 'rgba(255,255,255,0.18)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 14,
//   },

//   icon: {
//     fontSize: 20,
//   },

//   title: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '600',
//   },

//   arrow: {
//     color: '#fff',
//     fontSize: 29,
//     fontWeight: '300',
//   },
// });

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const menuItems = [
  { id: '1', title: 'Start Reading', color1: '#1FBF9F', color2: '#1E9B83', icon: '📖', route: '/quran' },
  { id: '2', title: 'Continue Reading', color1: '#22C55E', color2: '#16A34A', icon: '▶️', route: '/continue' },
  { id: '3', title: 'Prayer Times', color1: '#14B8A6', color2: '#0F766E', icon: '🕒', route: '/prayer' },
  { id: '4', title: 'Qibla Direction', color1: '#F59E0B', color2: '#D97706', icon: '🧭', route: '/qibla' },
  { id: '5', title: 'Mosque Finder', color1: '#34D399', color2: '#10B981', icon: '🕌', route: '/mosques' },
  { id: '6', title: 'Zakat Calculator', color1: '#F59E0B', color2: '#D97706', icon: '🧮', route: '/zakat' },
  { id: '7', title: 'Tasbeeh Counter', color1: '#8B5CF6', color2: '#7C3AED', icon: '📿', route: '/tasbih' },
  { id: '8', title: 'Bookmarks', color1: '#A855F7', color2: '#9333EA', icon: '🔖', route: '/bookmarks' },
];

const MenuCard = ({ item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => item.route && router.push(item.route)}
      style={[
        styles.card,
        {
          backgroundColor: item.color1,
          borderLeftColor: item.color2,
        },
      ]}
    >
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(true); // initial theme dark

  const theme = {
    background: isDark ? '#020617' : '#F8FAFC',
    headerText: isDark ? '#FFFFFF' : '#0F172A',
    subText: isDark ? '#CBD5E1' : '#64748B',
    statusBar: isDark ? 'light-content' : 'dark-content',
    cardText: isDark ? '#FFFFFF' : '#FFFFFF',
  };

  return (
    <View style={[styles.background, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={theme.statusBar} backgroundColor={theme.background} />

        {/* Header + Theme Toggle */}
        <View style={styles.header}>
          <Text style={[styles.name, { color: theme.headerText }]}></Text>
          <Text style={[styles.sub, { color: theme.subText }]}>Islamic App</Text>

          {/* Theme Toggle Button */}
          <TouchableOpacity
            style={[
              styles.themeButton,
              { backgroundColor: isDark ? '#64748B' : '#0F172A' },
            ]}
            onPress={() => setIsDark(!isDark)}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>
              {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuCard item={item} />}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
  },
  header: {
    marginBottom: 25,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
  },
  sub: {
    marginTop: 4,
    fontSize: 14,
  },
  themeButton: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  card: {
    height: 72,
    borderRadius: 20,
    marginBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  arrow: {
    fontSize: 29,
    fontWeight: '300',
    color: '#fff',
  },
});