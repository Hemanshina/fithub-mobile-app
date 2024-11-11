import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

const Plan = ({ route }) => {
  const { plan } = route.params;

  return (
    <ScrollView>
      <Text className="font-bold py-4 bg-primary text-light text-lg text-center">
        {plan?.planName}
      </Text>

      {/* Card */}
      <View className="relative">
        <Image
          source={require("../assets/plan.jpg")}
          className="h-[100px] w-full"
        />
        <Text className="font-bold py-4 absolute top-4 right-0 left-0 text-light text-lg text-center">
          7 Days Workout Meal Plan
        </Text>
      </View>

      {/* Display days and meals */}
      <View className="px-4 py-6">
        {Object.keys(plan).map((key) => {
          if (key.startsWith("day")) {
            return (
              <View
                key={key}
                className="mb-4 p-4 border bg-blue-300/20 border-blue-300  rounded-md"
              >
                <Text className="font-bold text-lg mb-2">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>

                <Text className="font-semibold text-md mb-1">Breakfast:</Text>
                <Text className="mb-2">{plan[key].breakfast}</Text>

                <Text className="font-semibold text-md mb-1">Lunch:</Text>
                <Text className="mb-2">{plan[key].lunch}</Text>

                <Text className="font-semibold text-md mb-1">Dinner:</Text>
                <Text className="mb-2">{plan[key].dinner}</Text>
              </View>
            );
          }
          return null;
        })}
      </View>
    </ScrollView>
  );
};

export default Plan;
