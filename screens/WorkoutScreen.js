import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FitnessItems } from "../Context";
import { AntDesign } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";

const WorkOutScreen = () => {
  const route = useRoute();
  const { auth } = useAuth();

  //   console.log(route.params);
  const navigation = useNavigation();
  const { completed, setCompleted } = useContext(FitnessItems);
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{ backgroundColor: "white" }}
      >
        <View className="relative">
          <Image
            style={{ width: "100%", height: 190 }}
            source={{ uri: route.params.image }}
          />
          <Text className="text-[20px] text-light font-bold  text-center absolute bottom-2  left-[20%]  ">
            {route?.params?.name}
          </Text>
        </View>

        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 20, left: 20 }}
          name="arrow-back-outline"
          size={28}
          color="white"
        />
        <View
          className={` ${
            auth?.subscription?.length && "hidden"
          } absolute  right-0 top-2  mx-5  pb-5 `}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Try Premium");
            }}
            className=" rounded-lg border border-light px-2 py-2"
          >
            <Text className="px-2 mx-2 text-light ">Try Premium</Text>
          </Pressable>
        </View>

        {route.params.excersises.map((item, index) => (
          <Pressable
            style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
            key={index}
          >
            <Image
              style={{ width: 90, height: 90 }}
              source={{ uri: item.image }}
            />

            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold", width: 170 }}>
                {item.name}
              </Text>

              <Text style={{ marginTop: 4, fontSize: 18, color: "gray" }}>
                x{item.sets}
              </Text>
            </View>

            {completed.includes(item.name) ? (
              <AntDesign
                style={{ marginLeft: 40 }}
                name="checkcircle"
                size={24}
                color="green"
              />
            ) : null}
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        onPress={() => {
          navigation.navigate("Fit", {
            excersises: route.params.excersises,
          });
          setCompleted([]);
        }}
        style={{
          backgroundColor: "#206320",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
          width: 120,
          borderRadius: 6,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          START
        </Text>
      </Pressable>
      <View className="h-[40px] px-3"></View>
    </>
  );
};

export default WorkOutScreen;

const styles = StyleSheet.create({});
