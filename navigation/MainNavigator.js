import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WorkOutScreen from "../screens/WorkoutScreen";
import FitScreen from "../screens/FitScreen";
import RestScreen from "../screens/RestScreen";
import Purchases from "../screens/Purchase";
import Account from "../screens/Account";
import StudentEditPage from "../screens/StudentEditPage";
import ImageUpload from "../components/ImageUpload";
import ChangePassword from "../components/ChangePassword";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={HomeScreen}
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
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Workout"
        component={WorkOutScreen}
        options={{ headerShown: false }}
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
