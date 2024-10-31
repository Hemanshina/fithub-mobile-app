import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const LandingPage = () => {
  const navigation = useNavigation();
  return (
    <ScrollView className="flex-1 bg-light">
      {/* Logo Section */}
      <View className="flex items-center justify-center mt-12">
        <Text className="text-2xl font-bold text-primary">FitHub</Text>
        <Text className="mt-2 text-lg text-center text-gray-600">
          Make your move fun
        </Text>
      </View>

      {/* Illustration */}
      <View className="flex items-center mt-8">
        <Image
          source={require("../assets/land.png")}
          className="w-80 h-80"
          resizeMode="contain"
        />
      </View>

      {/* Get Started Button */}
      <View className="px-6 mt-8">
        <TouchableOpacity
          className="py-4 rounded-lg bg-primary"
          onPress={() => {
            navigation.navigate("StudentSignupScreen");
          }}
        >
          <Text className="text-lg font-bold text-center text-white">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Link */}
      <View className="flex items-center mt-4">
        <Text className="text-gray-600">
          Already have account?{" "}
          <Pressable
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text className="font-bold text-primary">Login</Text>
          </Pressable>
        </Text>
      </View>
    </ScrollView>
  );
};

export default LandingPage;
