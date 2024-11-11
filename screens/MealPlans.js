import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import image from "../assets/plan.jpg";
import { Skeleton } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";

const MealPlans = () => {
  const { auth } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  // get meal plans
  const getPlans = () => {
    return axios.get(`/meal-plan`);
  };

  const {
    isLoading: loadingPlans,
    data: plansData,
    refetch,
    isRefetching: refetchingAccountData,
  } = useQuery({
    queryKey: [`meal-plans`],
    queryFn: getPlans,
    refetchOnMount: true,
    retry: false,
  });

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  if (loadingPlans || refetchingAccountData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Text className="Fon-bold py-4 bg-primary text-light  text-lg text-center  ">
        Premium Meal Plans
      </Text>
      {/* card */}
      <View className="relative">
        <Image
          source={require("../assets/plan.jpg")}
          className="h-[150px] w-full  "
        />
        <Text className="Fon-bold py-4 absolute top-4 right-0 left-0 text-light  text-lg text-center  ">
          Discover best meal plans
        </Text>
      </View>

      {/* meal plans*/}
      <View className="px-3">
        {loadingPlans ? (
          <View>
            <Text className="italic text-center mt-4">
              Getting meal plans...
            </Text>
            <Skeleton h="20" className="my-3" />
            <Skeleton h="20" />
          </View>
        ) : plansData?.data?.message ? (
          <View className="py-10 bg-light mt-4 ">
            <Text className="text-center  ">{plansData?.data?.message} </Text>
          </View>
        ) : (
          <View>
            <Text></Text>
            {plansData?.data?.plans?.map((item, index) => {
              return (
                <View
                  key={index}
                  className="bg-secondary/20 my-2 rounded-md px-2 py-3 border border-gray-400  "
                >
                  <Text className="font-bold text-lg  ">{item?.planName}</Text>
                  <Text className="font-bold ">7 Days Meal Plan</Text>
                  <Pressable
                    onPress={() => {
                      !auth?.subscription?.length
                        ? Alert.alert(
                            "Premium Required",
                            "You need premium to access this feature.",
                            [
                              {
                                text: "Go to Premium",
                                onPress: () =>
                                  navigation.navigate("Try Premium"),
                              },
                              {
                                text: "Cancel",
                                style: "cancel",
                              },
                            ],
                            { cancelable: true }
                          )
                        :
                      navigation.navigate("MealPlan", { plan: item });
                    }}
                    className="bg-primary rounded-md my-3 py-3"
                  >
                    <Text className="text-center text-light font-bold">
                      Open Plan
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MealPlans;
