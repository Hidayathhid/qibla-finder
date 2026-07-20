// src/services/prayerTimes.ts
//
// Fully offline prayer time calculation using the `adhan` package (no API call needed).
// Also handles scheduling local notifications for each prayer.
//
// npm install adhan expo-notifications

import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from "adhan";
import * as Notifications from "expo-notifications";

export type CalculationMethodKey =
  | "MuslimWorldLeague"
  | "Egyptian"
  | "Karachi"
  | "UmmAlQura"
  | "NorthAmerica"
  | "Dubai"
  | "MoonsightingCommittee"
  | "Singapore";

export function getPrayerTimesForToday(
  latitude: number,
  longitude: number,
  methodKey: CalculationMethodKey = "MuslimWorldLeague",
  madhab: "Shafi" | "Hanafi" = "Shafi"
) {
  const coordinates = new Coordinates(latitude, longitude);
  const params = (CalculationMethod as any)[methodKey]();
  params.madhab = madhab === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi;

  const date = new Date();
  const prayerTimes = new PrayerTimes(coordinates, date, params);

  return {
    fajr: prayerTimes.fajr,
    sunrise: prayerTimes.sunrise,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha,
  };
}

export function getNextPrayer(times: ReturnType<typeof getPrayerTimesForToday>) {
  const now = new Date();
  const entries = Object.entries(times) as [string, Date][];
  const upcoming = entries.find(([, time]) => time > now);
  return upcoming ?? entries[0]; // wrap to Fajr tomorrow conceptually
}

// ---------- Notifications ----------

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function schedulePrayerNotifications(times: ReturnType<typeof getPrayerTimesForToday>) {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const entries = Object.entries(times) as [string, Date][];
  for (const [name, time] of entries) {
    if (time.getTime() <= Date.now()) continue; // don't schedule times already passed today

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${capitalize(name)} time`,
        body: `It's time for ${capitalize(name)} prayer.`,
        sound: true,
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: time },
    });
  }
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
