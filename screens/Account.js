import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import React, { useCallback, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import DeleteAccountCard from "../components/DeleteAccountCard";
import LogoutCard from "../components/LogoutCard";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import axios from "../api/axios";
import SubscriptionCard from "../components/SubscriptionCard";

const Account = () => {
  const navigation = useNavigation();
  const { auth } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  // get user data
  const getAccountDetails = () => {
    return axios.get(`/users/student/account/${auth?.userId}`);
  };


  const {
    isLoading: loadingAccountData,
    data: accountData,
    refetch,
    error: errorGettingAccountDetails,
    isRefetching: refetchingAccountData,
  } = useQuery({
    queryKey: [`account-details-${auth?.userId}`, auth?.userId],
    queryFn: getAccountDetails,
    enabled: !!auth?.userId,
  });

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  if (loadingAccountData || refetchingAccountData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (errorGettingAccountDetails) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error fetching account details</Text>
      </View>
    );
  }


  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    >
      <View className="px-2 mt-2 min-h-[50vh] pb-5 ">
        <Text className="pb-2 font-bold ">Profile</Text>
        <ProfileCard user={accountData?.data} />
        <SubscriptionCard/>
     
        <Text className="pt-2 font-bold ">Delete Account</Text>
        <DeleteAccountCard />
        <LogoutCard />
      </View>
    </ScrollView>
  );
};

export default Account;
