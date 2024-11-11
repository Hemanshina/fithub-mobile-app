import React from "react";
import { Text, View, ScrollView, StatusBar } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import WorkOuts from "./HomeScreen";
import Account from "./Account";
import Progress from "./Progress";
import MealPlans from "./MealPlans";
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Tab = createMaterialBottomTabNavigator();

function Home() {
  return (
    <View style={{ flex: 1 }}>
      {/* Bottom Tab Navigation */}
      <Tab.Navigator
        initialRouteName="WorkOuts"
        activeColor="#206320"
        inactiveColor="#3e2465"
        barStyle={{ paddingBottom: 0 }}
      >
        <Tab.Screen
          name="WorkOuts"
          component={WorkOuts}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={"#206320"} size={23} />
            ),
          }}
        />
        <Tab.Screen
          name="MealPlans"
          component={MealPlans}
          options={{
            tabBarLabel: "Meal Plans",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="food-fork-drink"
                color={"#206320"}
                size={30}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Progress"
          component={Progress}
          options={{
            tabBarLabel: "Progress",
            tabBarIcon: ({}) => (
              <MaterialCommunityIcons
                name="chart-timeline-variant-shimmer"
                color={"#206320"}
                size={23}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-cog-outline"
                color={"#206320"}
                size={23}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default Home;
