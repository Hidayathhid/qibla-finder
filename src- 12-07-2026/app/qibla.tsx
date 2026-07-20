import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";
import { getGreatCircleBearing } from "geolib";

export default function QiblaScreen() {
  const [qibla, setQibla] = useState(0);
  const [heading, setHeading] = useState(0);
  const [loading, setLoading] = useState(true);

  const kaaba = {
    latitude: 21.4225,
    longitude: 39.8262,
  };

  useEffect(() => {
    getQibla();
    startCompass();

    return () => {
      Magnetometer.removeAllListeners();
    };
  }, []);

  // 📍 Get Qibla direction
  const getQibla = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});

    const bearing = getGreatCircleBearing(
      {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      },
      kaaba
    );

    setQibla(bearing);
    setLoading(false);
  };

  // 🧭 Phone compass
  const startCompass = () => {
    Magnetometer.setUpdateInterval(100);

    Magnetometer.addListener((data) => {
      let angle =
        Math.atan2(data.y, data.x) * (180 / Math.PI);

      angle = angle + 90;

      if (angle < 0) angle += 360;

      setHeading(angle);
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading Qibla...</Text>
      </View>
    );
  }

  const rotate = qibla - heading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧭 Qibla Finder</Text>

      <View style={styles.circle}>
        <Text style={styles.north}>N</Text>

        <View
          style={{
            transform: [{ rotate: `${rotate}deg` }],
          }}
        >
          <Text style={styles.kaaba}>🕋</Text>
        </View>
      </View>

      <Text style={styles.text}>
        Qibla: {Math.round(qibla)}°
      </Text>

      <Text style={styles.text}>
        Heading: {Math.round(heading)}°
      </Text>

      <Text style={styles.note}>
        Rotate phone until Kaaba aligns
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  circle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 6,
    borderColor: "#0a8f0a",
    justifyContent: "center",
    alignItems: "center",
  },

  kaaba: {
    fontSize: 60,
  },

  north: {
    position: "absolute",
    top: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "red",
  },

  text: {
    marginTop: 15,
    fontSize: 18,
  },

  note: {
    marginTop: 10,
    color: "gray",
  },
});