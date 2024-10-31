import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import { ActivityIndicator } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import useAuth from "../hooks/useAuth";

const Purchases = () => {
  const { auth } = useAuth();
  const getSubscriptions = () => {
    return axios.get(`/subscriptions?""=${""}`);
  };

  const {
    isLoading: loadingSubs,
    data: subscriptionsData,
    refetch,
    isRefetching: refetchingSubs,
  } = useQuery({
    queryKey: [`subscriptions-hesi-${""}`],
    queryFn: getSubscriptions,
    keepPreviousData: true,
  });

  const splitStringIntoArray = (str) => {
    return str.split(",").map((item) => item.trim());
  };

  //   subscribe
  const subscribeFn = (data) => {
    return axios.post("/subscriptions/subscribe", data);
  };

  const {
    mutate: subscribeMutate,
    isPending: loadingSubscribe,
    error,
  } = useMutation({
    mutationFn: subscribeFn,
    onSuccess: (response) => {
      const url = response.data.url;
      const text = response.data.message;
      handleOpenURL(url);
    },
    onError: (err) => {
      const text = err?.response.data.message || "Something went wrong";
      Alert.alert("Something went wrong!");
    },
  });

  const handleOpenURL = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Can't open payment link: ${url}`);
    }
  };

  return (
    <ScrollView>
      {/* subscriptions cards  */}

      <View>
        {loadingSubs ? (
          <View className="pt-4">
            <ActivityIndicator />
          </View>
        ) : !subscriptionsData?.data?.length ? (
          <View className="mt-2">
            <Text className="text-center italic  ">No subscriptions found</Text>
          </View>
        ) : (
          <View className=" px-3 py-3">
            {subscriptionsData?.data?.map((item, index) => {
              return (
                <View
                  key={index}
                  className="bg-[#091057] rounded-md px-4 py-2 mb-3"
                >
                  <Text className="text-light text-xl font-bold ">
                    {item?.name}
                  </Text>
                  <View className="flex flex-row items-center my-3">
                    <Text className="text-light text-xl font-bold ">
                      ${item?.amount}
                    </Text>
                    <Text className="ml-1 text-light">/ Month</Text>
                  </View>
                  <View className="mb-2">
                    <Pressable
                      className="bg-primary/80 px-4 py-2 rounded-sm"
                      onPress={() => {
                        subscribeMutate({
                          clientId: auth?.userId,
                          subscriptionId: item?._id,
                          serviceName: "premium",
                        });
                      }}
                      disabled={loadingSubscribe}
                    >
                      <Text className="text-light text-center ">
                        {loadingSubscribe ? "Please wait..." : "Get Started"}
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    <Text className="text-light">{item?.description}</Text>
                  </View>
                  <View className="my-2">
                    {splitStringIntoArray(item?.points)?.map((item, index) => {
                      return (
                        <View
                          key={index}
                          className="flex flex-row items-center"
                        >
                          <Ionicons
                            name="checkmark-circle-sharp"
                            color={"#347928"}
                            size={24}
                          />

                          <Text className="text-light">{item}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Purchases;
