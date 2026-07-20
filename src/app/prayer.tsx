// src/app/prayer.tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { COLORS, PRAYER_NAMES } from "@/constants/quranMeta";
import { useLocation } from "@/hooks/useLocation";
import {
  getNextPrayer,
  getPrayerTimesForToday,
  requestNotificationPermission,
  schedulePrayerNotifications,
} from "@/services/prayerTimes";

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function PrayerScreen() {
  const { latitude, longitude, loading, error, permissionDenied } = useLocation();
  const [times, setTimes] = useState<ReturnType<typeof getPrayerTimesForToday> | null>(null);
  const [notifStatus, setNotifStatus] = useState<"idle" | "enabled" | "denied">("idle");

  useEffect(() => {
    if (latitude != null && longitude != null) {
      setTimes(getPrayerTimesForToday(latitude, longitude));
    }
  }, [latitude, longitude]);

  const enableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (!granted) {
      setNotifStatus("denied");
      return;
    }
    if (times) {
      await schedulePrayerNotifications(times);
      setNotifStatus("enabled");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  if (permissionDenied || error) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ color: COLORS.textPrimary, textAlign: "center", fontSize: 16 }}>
          Location access is needed to calculate accurate prayer times for where you are.
        </Text>
        <Text style={{ color: COLORS.textSecondary, textAlign: "center", marginTop: 8 }}>
          Please enable location permission in your device settings.
        </Text>
      </View>
    );
  }

  if (!times) return null;

  const [nextName, nextTime] = getNextPrayer(times);
  const orderedEntries: [string, Date][] = [
    ["fajr", times.fajr],
    ["sunrise", times.sunrise],
    ["dhuhr", times.dhuhr],
    ["asr", times.asr],
    ["maghrib", times.maghrib],
    ["isha", times.isha],
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.bg }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: COLORS.textPrimary, fontSize: 26, fontWeight: "bold", marginBottom: 16 }}>
        🕌 Prayer Times
      </Text>

      <View
        style={{
          backgroundColor: COLORS.cardActive,
          padding: 20,
          borderRadius: 16,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: COLORS.textSecondary, fontSize: 13 }}>NEXT PRAYER</Text>
        <Text style={{ color: COLORS.accent, fontSize: 28, fontWeight: "bold", marginTop: 4 }}>
          {nextName.charAt(0).toUpperCase() + nextName.slice(1)}
        </Text>
        <Text style={{ color: COLORS.textPrimary, fontSize: 18, marginTop: 4 }}>{formatTime(nextTime)}</Text>
      </View>

      {orderedEntries.map(([name, time]) => (
        <View
          key={name}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 14,
            backgroundColor: COLORS.card,
            borderRadius: 12,
            marginBottom: 8,
          }}
        >
          <Text style={{ color: COLORS.textPrimary, fontSize: 16 }}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
          <Text style={{ color: COLORS.textSecondary, fontSize: 16 }}>{formatTime(time)}</Text>
        </View>
      ))}

      <TouchableOpacity
        onPress={enableNotifications}
        style={{
          marginTop: 16,
          backgroundColor: notifStatus === "enabled" ? COLORS.accent : COLORS.cardActive,
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: COLORS.textPrimary, fontWeight: "600" }}>
          {notifStatus === "enabled"
            ? "🔔 Notifications enabled"
            : notifStatus === "denied"
            ? "Notification permission denied — tap to retry"
            : "🔔 Enable prayer notifications"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
