import BottomContent from "@/components/homeScreenComponents/BottomContent";
import MapComponent from "@/components/homeScreenComponents/MapComponent";
import SheetComponent from "@/components/homeScreenComponents/SheetComponent";
import { setDeparture, setLocation } from "@/data/redux/addressListSlice/slice";
import { RootState } from "@/data/redux/store";
import { setUIState, UIState } from "@/data/redux/UIStateSlice/slice";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

const HomeScreen = () => {
  const dispatch = useDispatch();
  const uiState = useSelector((state: RootState) => state.uiState.uiState);
  const departure = useSelector((state: RootState) => state.address.departure);

  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const gestureY = useRef(new Animated.Value(0)).current;
  // const [isSelectingLocation, setIsSelectingLocation] = useState(false);

  const uiStateValues = {
    collapsed: 0,
    expanded: 1,
    full: 2,
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

      !departure.name && dispatch(setDeparture({ name, coords }));
    })();
  }, [dispatch]);

  const animateToState = (state: UIState) => {
    dispatch(setUIState(state));
    Animated.timing(animatedValue, {
      toValue: uiStateValues[state],
      duration: 600,
      easing: Easing.bezier(0.35, 0.14, 0.29, 0.99),
      useNativeDriver: true,
    }).start(() => {
      if (state === "collapsed") {
        Keyboard.dismiss();
      }
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
    inputRange: [0, 1, 2],
    outputRange: [-height * 1.2, -height * 1.2, -height * 0.704],
  });

  const bottomContentTranslateUp = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [height * 0.88, height * 0.66, height * 0.194],
  });

  // const setMapLocation = (focusedField: "departure" | "destination") => {
  //   if (focusedField === "departure") {
  //     console.log(focusedField);
  //     // closeRouteSheet();
  //     setIsSelectingLocation(true);
  //     // setDeparture(value);
  //   } else if (focusedField === "destination") {
  //     console.log(focusedField);
  //     // closeRouteSheet();
  //     setIsSelectingLocation(true);
  //     // setDestination(value);
  //   }
  // };

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
            <SheetComponent
              {...{
                closeRouteSheet: () => animateToState("expanded"),
                isAnimationComplete,
              }}
            />
          </Animated.View>
        </PanGestureHandler>

        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.bottomContentContainer,
              { transform: [{ translateY: bottomContentTranslateUp }] },
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
  map: {
    flex: 1,
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
