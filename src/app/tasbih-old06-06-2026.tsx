import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Dimensions, Text, Vibration, View } from "react-native";
import {
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const SIZE = Dimensions.get("window").width * 0.85;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 35;
const TOTAL_BEADS = 33;
const STEP = 360 / TOTAL_BEADS;

export default function UltraTasbih() {
  const [count, setCount] = useState(0);

  const rotation = useSharedValue(0);
  const startRotation = useSharedValue(0);

  // 🧿 convert angle → bead index
  const getIndex = (angle) => {
    const normalized = Math.abs(Math.round(angle / STEP));
    return normalized % TOTAL_BEADS;
  };

  const updateCount = (angle) => {
    const index = getIndex(angle);
    setCount(index);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Vibration.vibrate(15);
  };

  // 🖐️ DRAG GESTURE (REAL FEEL)
  const gesture = Gesture.Pan()
    .onBegin(() => {
      startRotation.value = rotation.value;
    })
    .onUpdate((e) => {
      const newRotation = startRotation.value + e.translationX * 0.5;
      rotation.value = newRotation;

      runOnJS(updateCount)(newRotation);
    })
    .onEnd(() => {
      rotation.value = withSpring(
        Math.round(rotation.value / STEP) * STEP
      );
    });

  const ringStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#050b18",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* TITLE */}
      <Text style={{ color: "white", fontSize: 26, marginBottom: 10 }}>
        📿 Ultra Tasbih Pro Max
      </Text>

      {/* RING */}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              justifyContent: "center",
              alignItems: "center",
            },
            ringStyle,
          ]}
        >
          {/* BEADS */}
          {Array.from({ length: TOTAL_BEADS }).map((_, i) => {
            const angle = (i / TOTAL_BEADS) * 2 * Math.PI;

            const x = RADIUS * Math.cos(angle);
            const y = RADIUS * Math.sin(angle);

            const isActive = i === count;

            return (
              <Animated.View
                key={i}
                style={{
                  position: "absolute",
                  width: isActive ? 28 : 18,
                  height: isActive ? 28 : 18,
                  borderRadius: 20,
                  backgroundColor: isActive ? "#22c55e" : "#94a3b8",
                  left: CENTER + x,
                  top: CENTER + y,
                  marginLeft: -10,
                  marginTop: -10,
                  shadowColor: "#000",
                  shadowOpacity: 0.5,
                  shadowRadius: 6,
                  elevation: 8,
                }}
              />
            );
          })}

          {/* CENTER COUNTER */}
          <View
            style={{
              position: "absolute",
              width: 130,
              height: 130,
              borderRadius: 65,
              backgroundColor: "#0f172a",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderColor: "#22c55e",
            }}
          >
            <Text style={{ color: "white", fontSize: 40, fontWeight: "bold" }}>
              {count}
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>

      {/* RESET */}
      <Text
        onPress={() => {
          setCount(0);
          rotation.value = withSpring(0);
        }}
        style={{ color: "#f87171", marginTop: 20 }}
      >
        Reset
      </Text>
    </View>
  );
}