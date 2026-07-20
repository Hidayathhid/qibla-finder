// // src/app/explore.tsx
// //
// // Mosque Finder. Uses Google Places API (Nearby Search) directly from the client.
// // You MUST restrict this API key in Google Cloud Console (Android app restriction +
// // Places API only) since there's no backend to hide it behind.
// //
// // Get a key: https://console.cloud.google.com/apis/credentials
// // Enable: "Places API"

// import * as Linking from "expo-linking";
// import { getDistance } from "geolib";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
// import { COLORS } from "@/constants/quranMeta";
// import { useLocation } from "@/hooks/useLocation";

// const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY_HERE";

// type Mosque = {
//   place_id: string;
//   name: string;
//   vicinity: string;
//   geometry: { location: { lat: number; lng: number } };
// };

// export default function MosqueFinderScreen() {
//   const { latitude, longitude, loading: locLoading, permissionDenied } = useLocation();
//   const [mosques, setMosques] = useState<(Mosque & { distanceMeters: number })[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (latitude == null || longitude == null) return;

//     if (GOOGLE_PLACES_API_KEY === "YOUR_GOOGLE_PLACES_API_KEY_HERE") {
//       setError("Add your Google Places API key in src/app/explore.tsx to enable Mosque Finder.");
//       setLoading(false);
//       return;
//     }

//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=mosque&key=${GOOGLE_PLACES_API_KEY}`;

//     fetch(url)
//       .then((res) => res.json())
//       .then((json) => {
//         const results: Mosque[] = json.results ?? [];
//         const withDistance = results
//           .map((m) => ({
//             ...m,
//             distanceMeters: getDistance(
//               { latitude, longitude },
//               { latitude: m.geometry.location.lat, longitude: m.geometry.location.lng }
//             ),
//           }))
//           .sort((a, b) => a.distanceMeters - b.distanceMeters);
//         setMosques(withDistance);
//       })
//       .catch(() => setError("Could not load nearby mosques. Check your connection."))
//       .finally(() => setLoading(false));
//   }, [latitude, longitude]);

//   const openInMaps = (mosque: Mosque) => {
//     const { lat, lng } = mosque.geometry.location;
//     const label = encodeURIComponent(mosque.name);
//     Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${mosque.place_id}&q=${label}`);
//   };

//   if (locLoading || loading) {
//     return (
//       <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator color={COLORS.accent} size="large" />
//       </View>
//     );
//   }

//   if (permissionDenied) {
//     return (
//       <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center", padding: 24 }}>
//         <Text style={{ color: COLORS.textPrimary, textAlign: "center" }}>
//           Location access is needed to find mosques near you.
//         </Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center", padding: 24 }}>
//         <Text style={{ color: COLORS.textSecondary, textAlign: "center" }}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.bg, padding: 10 }}>
//       <Text style={{ color: COLORS.textPrimary, fontSize: 24, fontWeight: "bold", margin: 10 }}>
//         🕌 Nearby Mosques
//       </Text>
//       <FlatList
//         data={mosques}
//         keyExtractor={(item) => item.place_id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => openInMaps(item)}
//             style={{ padding: 16, backgroundColor: COLORS.card, marginBottom: 8, borderRadius: 12 }}
//           >
//             <Text style={{ color: COLORS.textPrimary, fontSize: 16 }}>{item.name}</Text>
//             <Text style={{ color: COLORS.textSecondary, marginTop: 4, fontSize: 13 }}>{item.vicinity}</Text>
//             <Text style={{ color: COLORS.accent, marginTop: 4, fontSize: 12 }}>
//               {(item.distanceMeters / 1000).toFixed(1)} km away · Tap to open in Maps
//             </Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }


// src/app/explore.tsx

import * as Linking from "expo-linking";
import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/quranMeta";
import { useLocation } from "@/hooks/useLocation";

type Mosque = {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

export default function MosqueFinderScreen() {
  const {
    latitude,
    longitude,
    loading: locLoading,
    permissionDenied,
  } = useLocation();

  const [mosques, setMosques] = useState<
    (Mosque & { distanceMeters: number })[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (latitude == null || longitude == null) return;

    loadMosques();
  }, [latitude, longitude]);

  const loadMosques = async () => {
    try {
      setLoading(true);
      setError(null);

      const radius = 5000;

      const query = `
[out:json];
(
  node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${latitude},${longitude});
  way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${latitude},${longitude});
  relation["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${latitude},${longitude});
);
out center;
`;

      const response = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: query,
        }
      );

      const json = await response.json();

      const results: Mosque[] = (json.elements || []).map((item: any) => ({
        place_id: String(item.id),
        name: item.tags?.name || "Mosque",
        vicinity:
          item.tags?.["addr:street"] ||
          item.tags?.addr?.street ||
          item.tags?.["addr:city"] ||
          item.tags?.["addr:suburb"] ||
          "Nearby Mosque",
        geometry: {
          location: {
            lat: item.lat ?? item.center?.lat,
            lng: item.lon ?? item.center?.lon,
          },
        },
      }));

      const validResults = results.filter(
        (m) =>
          m.geometry.location.lat != null &&
          m.geometry.location.lng != null
      );

      const withDistance = validResults
        .map((m) => ({
          ...m,
          distanceMeters: getDistance(
            {
              latitude,
              longitude,
            },
            {
              latitude: m.geometry.location.lat,
              longitude: m.geometry.location.lng,
            }
          ),
        }))
        .sort((a, b) => a.distanceMeters - b.distanceMeters);

      setMosques(withDistance);
    } catch (e) {
      console.log(e);
      setError("Unable to load nearby mosques.");
    } finally {
      setLoading(false);
    }
  };

  const openInMaps = (mosque: Mosque) => {
    const { lat, lng } = mosque.geometry.location;

    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    );
  };

  if (locLoading || loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.bg,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
          color={COLORS.accent}
        />
      </View>
    );
  }

  if (permissionDenied) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.bg,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Text
          style={{
            color: COLORS.textPrimary,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Location permission is required to find nearby mosques.
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.bg,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Text
          style={{
            color: COLORS.textSecondary,
            textAlign: "center",
          }}
        >
          {error}
        </Text>
      </View>
    );
  }

  if (mosques.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.bg,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.textSecondary,
          }}
        >
          No nearby mosques found.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        padding: 10,
      }}
    >
      <Text
        style={{
          color: COLORS.textPrimary,
          fontSize: 24,
          fontWeight: "bold",
          margin: 10,
        }}
      >
        🕌 Nearby Mosques
      </Text>

      <FlatList
        data={mosques}
        keyExtractor={(item) => item.place_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openInMaps(item)}
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 12,
              padding: 16,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.textPrimary,
                fontSize: 17,
                fontWeight: "600",
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                color: COLORS.textSecondary,
                marginTop: 5,
              }}
            >
              {item.vicinity}
            </Text>

            <Text
              style={{
                color: COLORS.accent,
                marginTop: 8,
                fontSize: 13,
              }}
            >
              {(item.distanceMeters / 1000).toFixed(2)} km away • Tap to open
              in Google Maps
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}