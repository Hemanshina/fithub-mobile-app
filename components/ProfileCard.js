import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const ProfileCard = ({ user }) => {
  const { auth } = useAuth();
  const navigation = useNavigation();

  const goToEditPage = () => {
    return navigation.navigate("Edit Profile", { user });
  };
  const goToNotificationPage = () => {
    return navigation.navigate("Notification");
  };

  return (
    <View
      style={{ elevation: 3, shadowColor: "#206320" }}
      className="bg-[#f8f7f7] p-2 rounded-md "
    >
      <View className="flex flex-row items-center gap-2">
        <View>
          <Avatar.Image size={80} source={{ uri: user?.imgUrl }} />
          <TouchableOpacity
            onPress={() => navigation.navigate("Upload Profile")}
          >
            <Feather name="edit" size={20} color={"#206320"} />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
      </View>
      <View className="flex flex-row">
        <TouchableOpacity
          onPress={() => goToEditPage()}
          style={styles.viewProfileButton}
        >
          <Text style={styles.viewProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goToNotificationPage()}
          style={styles.notificationBtn}
          className="mx-1 border "
        >
          <Text>Schedule Workout Reminder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#206320",
  },
  image: {
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 3,
  },
  viewProfileButton: {
    backgroundColor: "#206320",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  notificationBtn: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  viewProfileButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileCard;
