import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useLogout from "../hooks/useLogout";
import { useNavigation } from "@react-navigation/native";

const LogoutCard = () => {
  const navigation = useNavigation();
  const logOut = useLogout();
  const signOut = async () => {
    await logOut();
    navigation.navigate("LandingPage");
  };

  return (
    <View
      style={{ elevation: 3, shadowColor: "#03045E" }}
      className="bg-[#f8f7f7] p-2 rounded-md mt-3 py-3 "
    >
      <View>
        <Text className="font-bold text-[15px] ">Setting</Text>
      </View>
      <View className="flex flex-row flex-wrap justify-between gap-2 py-3 ">
        <TouchableOpacity
          className="bg-[#666] px-3 py-2 rounded-md  "
          onPress={() => {
            signOut();
          }}
        >
          <Text className="text-light">Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#206320] px-3 py-2 rounded-md  "
          onPress={() => {
            navigation.navigate("Change Password");
          }}
        >
          <Text className="text-light">Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogoutCard;
