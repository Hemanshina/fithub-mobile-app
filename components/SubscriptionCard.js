import { View, Text, TouchableHighlight, Pressable } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import CountdownTimer from "./CountdownTimer";
import { useNavigation } from "@react-navigation/native";

const SubscriptionCard = () => {
  const { auth } = useAuth();
  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{ elevation: 3, shadowColor: "#03045E" }}
        className="bg-[#f8f7f7] p-2 rounded-md mt-3 py-3 "
      >
        <View>
          <Text className="font-bold text-[15px] ">My Subscriptions</Text>
        </View>
        <View className="">
          {!auth?.subscription?.length ? (
            <View>
              <Text className="mt-3">You don't have a subscription yet</Text>
              <TouchableHighlight>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Try Premium");
                  }}
                  className={` rounded-lg border bg-[#5a43ad] my-4 border-[#164216] px-2 py-3`}
                >
                  <Text className="px-2 mx-2 text-light text-center ">
                    Try Premium
                  </Text>
                </Pressable>
              </TouchableHighlight>
            </View>
          ) : (
            <View>
              {auth?.subscription?.map((item, index) => {
                return (
                  <View key={index} className='bg-[#32385a] py-2 px-2 my-3 rounded-md '>
                    <Text className="text-light  ">{item?.subscriptionId?.name}</Text>
                    <CountdownTimer expiryDate={item?.expiryDate} />
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default SubscriptionCard;
