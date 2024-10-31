import axios from "../api/axios";
import useAuth from "./useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    await AsyncStorage.clear();
    setAuth({});
    try {
      await axios.post("auth/logout", {
        withCredentials: true,
      });
    } catch (err) {}
  };

  return logout;
};

export default useLogout;
