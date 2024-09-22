import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ScheduleScreen from "../../components/scheduleScreenComponents/Schedule";
import ScheduleDetailsScreen from "../../components/scheduleScreenComponents/ScheduleDetailsScreen";

const Stack = createStackNavigator();

const ScheduleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScheduleMain"
        component={ScheduleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScheduleDetails"
        component={ScheduleDetailsScreen}
        options={{ headerShown: true, title: "Details" }}
      />
    </Stack.Navigator>
  );
};

export default ScheduleStack;
