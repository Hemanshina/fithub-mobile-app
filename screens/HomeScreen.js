import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import FitnessCards from "../components/FitnessCards";
import { FitnessItems } from "../Context";
import useAuth from "../hooks/useAuth";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { auth } = useAuth();
  const navigation = useNavigation();
  const {
    minutes,

    calories,

    workout,
  } = useContext(FitnessItems);
  return (
    <ScrollView>
      <View
        className="bg-[#206320]"
        style={{
          padding: 10,
          height: 200,
          width: "100%",
        }}
      >
        <View className="flex flex-row items-center justify-between">
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            HOME WORKOUT
          </Text>

          <Pressable
            className="flex flex-row items-center gap-1 "
            onPress={() => {
              navigation.navigate("Account");
            }}
          >
            <Text className="font-bold text-light">{auth?.name}</Text>

            <AntDesign name="down" color={"#ffffff"} />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {workout}
            </Text>
            <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
              WORKOUTS
            </Text>
          </View>

          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {calories?.toFixed(2)}
            </Text>
            <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
              KCAL
            </Text>
          </View>

          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {minutes}
            </Text>
            <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
              MINS
            </Text>
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{
              width: "90%",
              height: 120,
              marginTop: 20,
              borderRadius: 7,
            }}
            source={{
              uri:
                "https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png",
              // uri: 'https://img.freepik.com/free-photo/athlete-african-sportwear-doing-fitness-exercices-putting-cronometer-phone_482257-6948.jpg?w=1380&t=st=1706086676~exp=1706087276~hmac=0f250fac21af363548be9ddde2174a814d7297785b84a668a8368cdad0f30972'
            }}
          />
        </View>
      </View>
      <View className="mt-10">
        <FitnessCards />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
