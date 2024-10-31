import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  TouchableHighlight,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const RestScreen = () => {
  const { auth } = useAuth();

  const navigation = useNavigation();
  let timer = 0;
  const [timeLeft, setTimeLeft] = useState(15);

  const startTime = () => {
    setTimeout(() => {
      if (timeLeft <= 0) {
        navigation.goBack();
        clearTimeout(timer);
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };
  useEffect(() => {
    startTime();
    //clean up
    return () => clearTimeout(timer);
  });
  return (
    <SafeAreaView>
      <Image
        // resizeMode="contain"
        source={{
          uri:
            "https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_500,ar_500:300,c_fit/dpr_2/image/carefit/bundle/CF01032_magazine_2.png",
        }}
        style={{ width: "100%", height: 420 }}
      />

      <Text
        style={{
          fontSize: 30,
          fontWeight: "900",
          marginTop: 50,
          textAlign: "center",
        }}
      >
        TAKE A BREAK!
      </Text>
      <View className="flex flex-row justify-center items-center gap-6 ">
        <Text
          style={{
            fontSize: 40,
            fontWeight: "800",
            textAlign: "center",
          }}
        >
          {timeLeft}
        </Text>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              textAlign: "center",
              textDecorationLine: "underline",
            }}
          >
            Skip
          </Text>
        </Pressable>
      </View>

      <View className={`${auth?.subscription?.length && "hidden"} mx-5  pb-5 `}>
        <Text className="text-center py-2">Get personalized plans </Text>
        <TouchableHighlight>
          <Pressable
            onPress={() => {
              navigation.navigate("Try Premium");
            }}
            className={` rounded-lg border bg-[#206320] border-[#164216] px-2 py-3`}
          >
            <Text className="px-2 mx-2 text-light text-center ">
              Try Premium
            </Text>
          </Pressable>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default RestScreen;

const styles = StyleSheet.create({});
