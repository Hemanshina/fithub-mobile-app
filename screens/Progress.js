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
import { BarChart } from "react-native-gifted-charts";
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

  // Prepare data for the chart with both weight and BMI
  const chartData = logs.flatMap((log) => {
    const heightInMeters = log.height / 100;
    const bmi = (log.weight / (heightInMeters * heightInMeters)).toFixed(2);
    const dateLabel = new Date(log.createdAt).toLocaleDateString();

    return [
      {
        value: log.weight,
        label: dateLabel,
        frontColor: "#4a90e2",
        customDataPoint: {
          label: "Weight",
        },
      },
      {
        value: parseFloat(bmi),
        label: dateLabel,
        frontColor: "#ff0000",
        customDataPoint: {
          label: "BMI",
        },
      },
    ];
  });

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      contentContainerStyle={{ padding: 16 }}
    >
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          Manage Progress
        </Text>
      </View>
      {!logs?.length ? (
        <View
          style={{
            paddingVertical: 20,
            borderRadius: 8,
            backgroundColor: "#f0f0f0",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            You have not added your weight
          </Text>
          <Text style={{ textAlign: "center", fontStyle: "italic" }}>
            Add/Log your weight to Manage
          </Text>
        </View>
      ) : (
        <View>
          {/* Chart */}
          <View style={{ marginBottom: 24 }}>
            <Text className="mt-3 mb-2 font-bold   ">
              Weight & BMI progress bar chart
            </Text>
            <BarChart
              data={chartData}
              width={350}
              height={300}
              barWidth={15}
              barBorderRadius={4}
              spacing={30}
              noOfSections={4}
              isAnimated
              yAxisLabelWidth={40}
              yAxisTextStyle={{ color: "#999" }}
              xAxisTextStyle={{ color: "#999" }}
              xAxisLabelTextStyle={{ color: "#999" }}
              showXAxisIndices
              backgroundColor={"#fff"}
              showYAxisIndices
              initialSpacing={20}
              groupedBars={true}
            />
            <View className="flex-row  my-3 ">
              <View className="flex-row ml-3 ">
                <View className="bg-blue-600 px-3 py-1 rounded-sm mr-1  "></View>
                <Text>-Weight</Text>
              </View>
              <View className="flex-row ml-3 ">
                <View className="bg-red-600 px-3 py-1 rounded-sm mr-1  "></View>
                <Text>-BMI </Text>
              </View>
            </View>
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
              <Text style={{ flex: 1, fontWeight: "bold" }}>BMI</Text>
              <Text style={{ flex: 1, fontWeight: "bold" }}>Date</Text>
            </View>
            {logs.map((log) => (
              <View key={log._id} style={{ flexDirection: "row", padding: 8 }}>
                <Text style={{ flex: 1 }}>{log.height} cm</Text>
                <Text style={{ flex: 1 }}>{log.weight} kg</Text>
                <Text style={{ flex: 1 }}>
                  {(log.weight / (log.height / 100) ** 2).toFixed(2)}
                </Text>
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
