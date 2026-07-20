// src/hooks/useLocation.ts

import * as Location from "expo-location";
import { useEffect, useState } from "react";

type LocationState = {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
  permissionDenied: boolean;
};

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
    permissionDenied: false,
  });

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        if (isMounted) {
          setState({
            latitude: null,
            longitude: null,
            loading: false,
            error: "Location permission denied",
            permissionDenied: true,
          });
        }
        return;
      }

      try {
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (isMounted) {
          setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            loading: false,
            error: null,
            permissionDenied: false,
          });
        }
      } catch (e) {
        if (isMounted) {
          setState({
            latitude: null,
            longitude: null,
            loading: false,
            error: "Could not fetch location",
            permissionDenied: false,
          });
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
