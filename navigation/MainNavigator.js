import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import Home from "../screens/Home";
import WorkOutScreen from "../screens/WorkoutScreen";
import FitScreen from "../screens/FitScreen";
import RestScreen from "../screens/RestScreen";
import Purchases from "../screens/Purchase";
import Account from "../screens/Account";
import StudentEditPage from "../screens/StudentEditPage";
import ImageUpload from "../components/ImageUpload";
import ChangePassword from "../components/ChangePassword";
import SetNotification from "../screens/SetNotification";
import Plan from "../screens/Plan";
import LogWeight from "../screens/LogWeight";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Home}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#206320",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Workout"
        component={WorkOutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MealPlan"
        component={Plan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LogWeight"
        component={LogWeight}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Fit"
        component={FitScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rest"
        component={RestScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Try Premium"
        component={Purchases}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Notification"
        component={SetNotification}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerShown: true, backgroundColor: "#206320" }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={StudentEditPage}
        options={{ headerShown: true, backgroundColor: "#206320" }}
      />
      <Stack.Screen
        name="Upload Profile"
        component={ImageUpload}
        options={{ headerShown: true, backgroundColor: "#206320" }}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={{ headerShown: true, backgroundColor: "#206320" }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
