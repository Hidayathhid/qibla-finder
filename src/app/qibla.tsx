// src/app/qibla.tsx
import { Magnetometer } from "expo-sensors";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import Svg, { Circle, Line, Polygon } from "react-native-svg";
import { COLORS } from "@/constants/quranMeta";
import { useLocation } from "@/hooks/useLocation";
import { getQiblaBearing } from "@/services/qibla";

function angleToHeading(x: number, y: number) {
  let angle = Math.atan2(y, x) * (180 / Math.PI);
  angle = angle - 90; // adjust so 0 = north, matches typical compass orientation
  return (angle + 360) % 360;
}

export default function QiblaScreen() {
  const { latitude, longitude, loading, permissionDenied } = useLocation();
  const [heading, setHeading] = useState(0);
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Magnetometer.setUpdateInterval(150);
    const sub = Magnetometer.addListener((data) => {
      const h = angleToHeading(data.x, data.y);
      setHeading(h);
    });
    return () => sub.remove();
  }, []);

  const qiblaBearing = latitude != null && longitude != null ? getQiblaBearing(latitude, longitude) : null;
  const needleRotation = qiblaBearing != null ? (qiblaBearing - heading + 360) % 360 : 0;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: needleRotation,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [needleRotation]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: COLORS.textSecondary }}>Getting your location…</Text>
      </View>
    );
  }

  if (permissionDenied || qiblaBearing == null) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ color: COLORS.textPrimary, textAlign: "center" }}>
          Location access is needed to calculate the Qibla direction from where you are.
        </Text>
      </View>
    );
  }

  const isAligned = Math.abs(((needleRotation + 180) % 360) - 180) < 5;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center", padding: 24 }}>
      <Text style={{ color: COLORS.textPrimary, fontSize: 22, fontWeight: "bold", marginBottom: 30 }}>
        🕋 Qibla Direction
      </Text>

      <View style={{ width: 260, height: 260, justifyContent: "center", alignItems: "center" }}>
        <Svg width={260} height={260} viewBox="0 0 260 260">
          <Circle cx={130} cy={130} r={120} stroke={COLORS.cardActive} strokeWidth={2} fill="none" />
          <Circle cx={130} cy={130} r={4} fill={COLORS.textSecondary} />
        </Svg>

        <Animated.View
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            justifyContent: "center",
            alignItems: "center",
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
        >
          <Svg width={260} height={260} viewBox="0 0 260 260">
            <Polygon points="130,20 118,70 142,70" fill={isAligned ? COLORS.accent : COLORS.accentBlue} />
            <Line x1={130} y1={70} x2={130} y2={130} stroke={isAligned ? COLORS.accent : COLORS.accentBlue} strokeWidth={3} />
          </Svg>
        </Animated.View>
      </View>

      <Text style={{ color: isAligned ? COLORS.accent : COLORS.textSecondary, marginTop: 24, fontSize: 16 }}>
        {isAligned ? "✓ Facing Qibla" : "Rotate your device until the arrow points up"}
      </Text>

      <Text style={{ color: COLORS.textSecondary, marginTop: 8, fontSize: 13 }}>
        Bearing: {qiblaBearing.toFixed(1)}° from true north
      </Text>
    </View>
  );
}
