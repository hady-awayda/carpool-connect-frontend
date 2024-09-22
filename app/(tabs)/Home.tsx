import BottomContent from "@/components/homeScreenComponents/BottomContent";
import SettingLocationSheet from "@/components/homeScreenComponents/SettingLocationSheet";
import SheetComponent from "@/components/homeScreenComponents/SheetComponent";
import { setDeparture, setLocation } from "@/data/redux/addressListSlice/slice";
import { RootState } from "@/data/redux/store";
import {
  setAnimationComplete,
  setUIState,
  UIState,
} from "@/data/redux/UIStateSlice/slice";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";

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
    "slide-1": 6,
  };

  const animateToState = (state: UIState) => {
    dispatch(setAnimationComplete(false));
    dispatch(setUIState(state));
    Animated.timing(animatedValue, {
      toValue: uiStateValues[state],
      duration: 300,
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
        if (uiState === "sheet-expanded") newState = "full";
        else if (uiState === "full") newState = "expanded";
        else if (uiState === "expanded") newState = "collapsed";
        else return;
      } else if (translationY < -50 || velocityY < -500) {
        if (uiState === "collapsed") newState = "expanded";
        else if (uiState === "expanded") newState = "full";
        else if (uiState === "full") newState = "sheet-expanded";
        else return;
      }

      animateToState(newState);
      gestureY.setValue(0);
    }
  };

  const sheetTranslateY = animatedValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [
      -height * 0.65,
      -height * 0.65,
      0,
      0,
      -height * 0.65,
      -height * 0.65,
    ],
  });

  const bottomContentTranslateY = animatedValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [
      height * 0.886,
      height * 0.68,
      height * 0.19,
      height * 0.19,
      height * 0.886,
      height * 0.886,
    ],
  });

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          <StatusBar style="auto" />

          <SettingLocationSheet {...{ animateToState, initialLocationFetch }} />

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
              <BottomContent {...{ animateToState }} />
            </Animated.View>
          </PanGestureHandler>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  sheetContainer: {
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
