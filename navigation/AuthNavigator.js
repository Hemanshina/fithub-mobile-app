import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login";
import StudentSignupScreen from "../screens/StudentSignupScreen ";
import LandingPage from "../screens/LandingPage";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={LandingPage}
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
        name="LandingPage"
        component={LandingPage}
        options={{ headerShown: false }}
        backgroundColor="#fff"
        screenOptions={{ headerBackground: "#fff" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: true }}
        backgroundColor="#fff"
        screenOptions={{ headerBackground: "#fff" }}
      />
      <Stack.Screen
        name="StudentSignupScreen"
        component={StudentSignupScreen}
        options={{ headerShown: true, title: "Sign up" }}
        backgroundColor="#fff"
        screenOptions={{ headerBackground: "#fff" }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
