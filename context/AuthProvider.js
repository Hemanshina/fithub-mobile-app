import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, View } from "react-native";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persistedUserId, setPersistedUserId] = useState("");
  const [persistedUserType, setPersistedUserType] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false); // Flag to track if data has been loaded

  const getRefreshToken = async (userType, id) => {
    try {
      const response = await axios.get(`/auth/refresh/${userType}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching refreshToken:", error);
      throw error;
    }
  };

  const getUserIdFromStorage = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const userType = await AsyncStorage.getItem("userType");
      if (userId && userType) {
        setPersistedUserId(userId);
        setPersistedUserType(userType);
        setDataLoaded(true); // Set flag to true when data is loaded
      }
    } catch (error) {
      console.error("Error fetching userId from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserIdFromStorage();

      // Check if both userId and userType are loaded before proceeding
      if (!dataLoaded) {
        setLoading(false);
        return;
      }

      try {
        const tokenData = await getRefreshToken(
          persistedUserType,
          persistedUserId
        );
        const accessToken = tokenData.accessToken;
        const roles = tokenData.roles;
        const userId = tokenData.user_Id;
        const name = tokenData.name;
        const imgUrl = tokenData.imgUrl;
        const createdAt = tokenData.createdAt;
        const subscription = tokenData?.subscription;


        setAuth({ roles, accessToken, userId, name, createdAt, imgUrl, subscription });
        setLoading(false);
      } catch (error) {
        console.error("Error setting auth:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dataLoaded]); // Add dataLoaded to dependency array

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
