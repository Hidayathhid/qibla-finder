import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function PrayerScreen() {
  const [loading, setLoading] = useState(true);
  const [prayers, setPrayers] = useState([]);
  const [nextPrayer, setNextPrayer] = useState('');
  const [countdown, setCountdown] = useState('');
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    requestLocationAndFetchTimes();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (prayers.length > 0) updateNextPrayer();
    }, 1000);
    return () => clearInterval(timer);
  }, [prayers]);

  const requestLocationAndFetchTimes = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission denied',
          'Location permission is required to get accurate prayer times.'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      fetchPrayerTimes(location.coords.latitude, location.coords.longitude);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to get location.');
      setLoading(false);
    }
  };

  const fetchPrayerTimes = async (latitude: number, longitude: number) => {
    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const data = await res.json();
      const timings = data.data.timings;

      const prayerData = [
        { name: 'Fajr', time: timings.Fajr },
        { name: 'Sunrise', time: timings.Sunrise },
        { name: 'Dhuhr', time: timings.Dhuhr },
        { name: 'Asr', time: timings.Asr },
        { name: 'Maghrib', time: timings.Maghrib },
        { name: 'Isha', time: timings.Isha },
      ];

      setPrayers(prayerData);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to fetch prayer times.');
    } finally {
      setLoading(false);
    }
  };

  const updateNextPrayer = () => {
    const now = new Date();
    let upcomingPrayer = prayers[0];
    let smallestDiff = Number.MAX_SAFE_INTEGER;

    prayers.forEach((p) => {
      const [h, m] = p.time.split(':').map(Number);
      const prayerDate = new Date();
      prayerDate.setHours(h);
      prayerDate.setMinutes(m);
      prayerDate.setSeconds(0);

      let diff = prayerDate.getTime() - now.getTime();
      if (diff < 0) diff += 24 * 60 * 60 * 1000;

      if (diff < smallestDiff) {
        smallestDiff = diff;
        upcomingPrayer = p;

        if (diff < 1000) playAdhan();
      }
    });

    setNextPrayer(upcomingPrayer.name);

    const totalSeconds = Math.floor(smallestDiff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setCountdown(
      `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    );
  };

  const playAdhan = async () => {
    try {
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: 'https://download.quranicaudio.com/adhan/adhan.mp3', // replace with preferred adhan
      });
      setSound(newSound);
      await newSound.playAsync();
    } catch (err) {
      console.log('Adhan error', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  const today = new Date().toDateString();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>🕌 Prayer Times</Text>
      <Text style={styles.date}>{today}</Text>

      <View style={styles.nextPrayerCard}>
        <Text style={styles.nextPrayerLabel}>NEXT PRAYER</Text>
        <Text style={styles.nextPrayerName}>{nextPrayer}</Text>
        <Text style={styles.countdown}>{countdown} remaining</Text>
      </View>

      <FlatList
        data={prayers}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View
            style={[
              styles.prayerCard,
              item.name === nextPrayer && styles.activeCard,
            ]}
          >
            <Text style={styles.prayerName}>{item.name}</Text>
            <Text style={styles.prayerTime}>{item.time}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071320', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { color: '#fff', fontSize: 30, fontWeight: '700', marginBottom: 5 },
  date: { color: '#94A3B8', fontSize: 14, marginBottom: 20 },
  nextPrayerCard: {
    backgroundColor: '#16A34A',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    elevation: 8,
  },
  nextPrayerLabel: { color: '#DCFCE7', fontSize: 12, fontWeight: '600' },
  nextPrayerName: { color: '#fff', fontSize: 30, fontWeight: '700', marginTop: 6 },
  countdown: { color: '#fff', fontSize: 16, marginTop: 8 },
  prayerCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeCard: { borderWidth: 2, borderColor: '#22C55E', backgroundColor: '#10241A' },
  prayerName: { color: '#fff', fontSize: 18, fontWeight: '600' },
  prayerTime: { color: '#22C55E', fontSize: 18, fontWeight: '700' },
});