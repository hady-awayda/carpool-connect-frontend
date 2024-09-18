import BottomContent from "@/components/homeScreenComponents/BottomContent";
import MapComponent from "@/components/homeScreenComponents/MapComponent";
import SheetComponent from "@/components/homeScreenComponents/SheetComponent";
import { setDeparture, setLocation } from "@/data/redux/addressListSlice/slice";
import { RootState } from "@/data/redux/store";
import {
  setAnimationComplete,
  setUIState,
  UIState,
} from "@/data/redux/UIStateSlice/slice";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

const { height } = Dimensions.get("window");

const HomeScreen = () => {
  const dispatch = useDispatch();
  const uiState = useSelector((state: RootState) => state.uiState.uiState);
  const departure = useSelector((state: RootState) => state.address.departure);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const gestureY = useRef(new Animated.Value(0)).current;

  const uiStateValues = {
    collapsed: 0,
    expanded: 1,
    full: 2,
    "sheet-expanded": 3,
    "setting-departure": 4,
    "setting-destination": 5,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      };

      let name = "Unknown Location";

      try {
        let [address] = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        name =
          address.city || address.region || address.name || "Unknown Location";
      } catch (error) {
        console.error("Error in reverse geocoding:", error);
      }

      dispatch(setLocation({ name, coords }));

      if (!departure.name) {
        dispatch(setDeparture({ name, coords }));
      }
    })();
  }, []);

  const animateToState = (state: UIState) => {
    dispatch(setAnimationComplete(false));
    dispatch(setUIState(state));
    Animated.timing(animatedValue, {
      toValue: uiStateValues[state],
      duration: 600,
      easing: Easing.bezier(0.35, 0.14, 0.29, 0.99),
      useNativeDriver: true,
    }).start(() => {
      dispatch(setAnimationComplete(true));
    });
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: gestureY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let newState = uiState;
      const { translationY, velocityY } = event.nativeEvent;

      if (translationY > 50 || velocityY > 500) {
        if (uiState === "full") newState = "expanded";
        else if (uiState === "expanded") newState = "collapsed";
      } else if (translationY < -50 || velocityY < -500) {
        if (uiState === "collapsed") newState = "expanded";
        else if (uiState === "expanded") newState = "full";
      }

      animateToState(newState);
      gestureY.setValue(0);
    }
  };

  const sheetTranslateY = animatedValue.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [-height * 1.4, -height * 1.4, -height * 0.71, -height * 0.41],
  });

  const bottomContentTranslateY = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [height * 0.88, height * 0.66, height * 0.194],
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableOpacity activeOpacity={1} style={styles.container}>
        <StatusBar style="auto" />

        <MapComponent />

        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.sheetContainer,
              { transform: [{ translateY: sheetTranslateY }] },
            ]}
          >
            <SheetComponent {...{ animateToState }} />
          </Animated.View>
        </PanGestureHandler>

        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.bottomContentContainer,
              { transform: [{ translateY: bottomContentTranslateY }] },
            ]}
          >
            <BottomContent showRouteSheet={() => animateToState("full")} />
          </Animated.View>
        </PanGestureHandler>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  sheetContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 2,
  },
  bottomContentContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 1,
  },
});

export default HomeScreen;
