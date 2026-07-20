// src/services/qibla.ts
//
// Great-circle bearing calculation from the user's location to the Kaaba.
// Fully offline, no API needed.

import { KAABA_COORDS } from "@/constants/quranMeta";

function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

function toDegrees(rad: number) {
  return (rad * 180) / Math.PI;
}

/**
 * Returns the compass bearing (0-360, where 0 = true north) from the given
 * coordinates to the Kaaba in Mecca.
 */
export function getQiblaBearing(latitude: number, longitude: number): number {
  const lat1 = toRadians(latitude);
  const lat2 = toRadians(KAABA_COORDS.latitude);
  const deltaLon = toRadians(KAABA_COORDS.longitude - longitude);

  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

  const bearing = toDegrees(Math.atan2(y, x));
  return (bearing + 360) % 360;
}

/**
 * Given the device's current compass heading and the qibla bearing,
 * returns how many degrees to rotate the qibla needle relative to the screen.
 */
export function getNeedleRotation(deviceHeading: number, qiblaBearing: number): number {
  return (qiblaBearing - deviceHeading + 360) % 360;
}
