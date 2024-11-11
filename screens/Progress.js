import {
  View,
  Text,
  Pressable,
  Alert,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { useNavigation } from "@react-navigation/native";

const Progress = () => {
  const { auth } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Fetch progress logs
  const getLogs = () => {
    return axios.get(`/progress-log/client-logs/${auth?.userId}`);
  };

  const {
    isLoading: loadingLogs,
    data: logsData,
    refetch,
    isRefetching: refetchingData,
  } = useQuery({
    queryKey: [`user-logs-${auth?.userId}`],
    queryFn: getLogs,
    refetchOnMount: true,
    retry: false,
  });

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  if (loadingLogs || refetchingData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const logs = logsData?.data?.logs || [];

  // Prepare data for the chart
  const chartData = logs.map((log) => ({
    value: log.weight,
    label: new Date(log.createdAt).toLocaleDateString(),
  }));

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      contentContainerStyle={{ padding: 16 }}
    >
      <View>
        <Text className="text-lg font-bold my-2">Manage Progress</Text>
      </View>
      {!logs?.length ? (
        <View className="bg-light py-10 rounded-md ">
          <Text className="text-center my-1 italic font-bold ">
            You have not added your weight
          </Text>
          <Text className="text-center my-1 italic  ">
            Add/Log your weight to Manage
          </Text>
        </View>
      ) : (
        <View>
          {/* Chart */}
          <View style={{ marginBottom: 24 }}>
            <BarChart
              data={chartData}
              width={300}
              height={200}
              color="#4a90e2"
              isAnimated
              spacing={50}
              yAxisLabelWidth={40}
              yAxisTextStyle={{ color: "#999" }}
              xAxisTextStyle={{ color: "#999" }}
              xAxisLabelTextStyle={{ color: "#999" }}
              showGradient
              frontColor={"#1B6BB0"}
              gradientColor={"#FFEEFE"}
              backgroundColor={"#FCFAEE"}
            />
          </View>

          {/* Log History Table */}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
            Log History
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#f0f0f0",
                padding: 8,
              }}
            >
              <Text style={{ flex: 1, fontWeight: "bold" }}>Height</Text>
              <Text style={{ flex: 1, fontWeight: "bold" }}>Weight</Text>
              <Text style={{ flex: 1, fontWeight: "bold" }}>Date</Text>
            </View>
            {logs.map((log) => (
              <View key={log._id} style={{ flexDirection: "row", padding: 8 }}>
                <Text style={{ flex: 1 }}>{log.height} cm</Text>
                <Text style={{ flex: 1 }}>{log.weight} kg</Text>
                <Text style={{ flex: 1 }}>
                  {new Date(log.createdAt).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Log Weight Button */}
      <Pressable
        style={{
          backgroundColor: "#4a90e2",
          padding: 12,
          borderRadius: 8,
          marginTop: 24,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("LogWeight")}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Log Weight
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Progress;
