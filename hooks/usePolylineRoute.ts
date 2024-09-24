import axios from "axios";
import { useState, useEffect } from "react";
import { LatLng } from "react-native-maps";

const usePolylineRoute = (
  depLat: number,
  depLng: number,
  destLat: number,
  destLng: number
) => {
  const [route, setRoute] = useState<LatLng[]>([]);

  const fetchRoute = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${depLat},${depLng}&destination=${destLat},${destLng}&key=${"AIzaSyCzduXSDjg5mbh4txUTEVVu7LN1O53_fEc"}`
      );
      const points = response.data.routes[0].overview_polyline.points;
      const decodedPoints = decodePolyline(points);
      setRoute(decodedPoints);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  const decodePolyline = (encoded: string): LatLng[] => {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  useEffect(() => {
    if (depLat && depLng && destLat && destLng) {
      fetchRoute();
    }
  }, [depLat, depLng, destLat, destLng]);

  return { route };
};

export default usePolylineRoute;
