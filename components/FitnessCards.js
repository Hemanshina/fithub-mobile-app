import { StyleSheet, Text, View, Pressable, Image, Alert } from "react-native";
import React from "react";
import fitness from "../data/fitness";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const FitnessCards = () => {
  const FitnessData = fitness;
  const navigation = useNavigation();
  const { auth } = useAuth();
  return (
    <View>
      {FitnessData?.map((item, key) => (
        <Pressable
          onPress={() =>
            item?.premium && !auth?.subscription?.length
              ? Alert.alert(
                  "Premium Required",
                  "You need premium to access this feature.",
                  [
                    {
                      text: "Go to Premium",
                      onPress: () => navigation.navigate("Try Premium"),
                    },
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                  ],
                  { cancelable: true }
                )
              : navigation.navigate("Workout", {
                  image: item.image,
                  excersises: item.excersises,
                  id: item.id,
                  name: item.name,
                })
          }
          style={{
            alignItems: "center",
            position: "relative",
            justifyContent: "center",
            margin: 10,
          }}
          key={key}
        >
          <Image
            style={{ width: "95%", height: 140, borderRadius: 7 }}
            source={{ uri: item.image }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              left: 20,
              top: 20,
            }}
          >
            {item.name}
          </Text>
          {item?.premium && (
            <Text
              className="bg-primary px-3 rounded-md"
              style={{
                position: "absolute",
                color: "white",
                top: 15,
                right: 20,
              }}
            >
              Premium
            </Text>
          )}

          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: "white",
              bottom: 15,
              left: 20,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
        </Pressable>
      ))}
    </View>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({});
