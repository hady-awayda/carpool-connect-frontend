import { Schedule } from "@/components/scheduleScreenComponents/ScheduleInterfaces";
import { Colors } from "@/constants/Variables";
import useCoords from "@/hooks/useCoords";
import useInitialRegion from "@/hooks/useInitialRegion";
import usePolylineRoute from "@/hooks/usePolylineRoute";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

const { width } = Dimensions.get("window");

const mapSizes = {
  normal: {
    width,
    height: width * 1.35,
  },
  mini: {
    width: width / 2.75,
    height: width / 2.75,
    borderRadius: 10,
  },
};

const Mapbox = ({
  scheduleData,
  mapSize,
}: {
  scheduleData: Schedule;
  mapSize: "normal" | "mini";
}) => {
  const mapSizeStyles = mapSize === "mini" ? mapSizes.mini : mapSizes.normal;

  const { depLat, depLng, destLat, destLng } = useCoords(scheduleData);

  const { latitude, longitude, latitudeDelta, longitudeDelta } =
    useInitialRegion(scheduleData);

  const { route } = usePolylineRoute(depLat, depLng, destLat, destLng);

  return (
    <View style={[styles.mapContainer, { ...mapSizeStyles }]}>
      <MapView
        style={styles.map}
        initialRegion={{ latitude, longitude, latitudeDelta, longitudeDelta }}
        {...(mapSize === "mini" && {
          scrollEnabled: false,
          zoomEnabled: false,
          customMapStyle: [
            {
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        })}
        {...(mapSize === "normal" && {
          scrollEnabled: true,
          zoomEnabled: true,
        })}
        showsCompass={false}
      >
        <Marker coordinate={{ latitude: depLat, longitude: depLng }}>
          <MaterialCommunityIcons
            name="map-marker"
            size={30}
            color={Colors.light.secondary}
          />
        </Marker>

        <Marker coordinate={{ latitude: destLat, longitude: destLng }}>
          <MaterialCommunityIcons
            name="map-marker"
            size={28}
            color={Colors.light.blue}
          />
        </Marker>

        {route.length > 0 && (
          <Polyline
            coordinates={route}
            strokeColor={Colors.light.primary}
            strokeWidth={3}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    overflow: "hidden",
  },
});

export default Mapbox;
