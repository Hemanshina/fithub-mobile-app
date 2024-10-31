import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import ToastManager, { Toast } from "toastify-react-native";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox, RadioButton } from "react-native-paper";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const { auth, setAuth } = useAuth();
  const [userType, setUserType] = useState("Student");
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const options = ["Student", "Tutor"];

  const handleSelect = (value) => {
    setUserType(value);
    setModalVisible(false);
  };

  // login mutate
  const {
    mutate: loginMutate,
    isPending: loginLoading,
    error: mutationError,
  } = useMutation({
    mutationFn: (data) => {
      return axios.post("/auth/login", data);
    },
    onSuccess: async (response) => {
      // extract data from the response
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const userId = response?.data?.user_Id;
      const name = response?.data?.name;
      const imgUrl = response?.data?.imgUrl;
      const createdAt = response?.data?.createdAt;
      const subscription = response?.data?.subscription;

      // update app context using setAuth
      setAuth({ roles, accessToken, userId, name, createdAt, imgUrl, subscription });
      Toast.success("Welcome Back!");

      // to persist the session save userId to request refreshToken when app reloads
      await AsyncStorage.setItem("userType", roles[0]);
      if (checked) {
        await AsyncStorage.setItem("userId", userId);
      }
    },

    onError: (error) => {
      Toast.error(error?.response?.data?.message || "Error");
    },
  });

  //hemanshi patel  

  return (
    <ScrollView style={{}} className="bg-light">
      <ToastManager />
      <Image
        source={require("../assets/log3.webp")}
        style={{
          width: "100%",
          height: 250,
          resizeMode: "cover",
          marginBottom: 2,
        }}
      />
      <View className=" rounded-t-3xl mt-[-30px] ">
        <View className="pt-3 bg-primary rounded-t-3xl">
          <Text className="text-2xl font-bold text-center text-light ">
            Welcome to Fithub{" "}
          </Text>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", marginBottom: 30 }}
            className="text-center text-light"
          >
            Login
          </Text>
        </View>

        {/* login formik */}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validateOnMount={true}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            values.userType = "client";
            loginMutate(values);
          }}
        >
          {({
            handleChange,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            values,
            isValid,
          }) => (
            <View className="px-3">
              <View className="flex flex-col gap-3 py-5 ">
                <View>
                  <TextInput
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    style={styles.textInput}
                  />
                  {errors?.email && touched?.email && (
                    <Text style={styles.errors}>{errors?.email}</Text>
                  )}
                </View>

                <View
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#000",
                  }}
                >
                  <TextInput
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                    }}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Text style={{ paddingHorizontal: 10 }}>
                      {showPassword ? "Hide" : "Show"}{" "}
                      {/* Display text based on the showPassword state */}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors?.password && touched?.password && (
                  <Text style={styles.errors}>{errors?.password}</Text>
                )}
              </View>
              <View className="flex flex-row items-center">
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text className="">Remember me</Text>
              </View>

              <TouchableOpacity
                disabled={!isValid || loginLoading}
                onPress={() => handleSubmit()}
                style={{
                  backgroundColor:
                    isValid || loginLoading ? "#206320" : "#CACFD2", // Change background color based on isValid
                  paddingVertical: 15,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                  textAlign: "center",
                  opacity: isValid ? 1 : 0.5, // Change opacity based on isValid
                }}
              >
                <Text
                  style={{
                    color: isValid || loginLoading ? "#fff" : "#000",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  {loginLoading ? (
                    <View className="flex flex-row items-center ">
                      <Text className="text-light">Login...</Text>
                      <ActivityIndicator color="#fff" size={20} />
                    </View>
                  ) : (
                    "Login"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Text style={{ marginTop: 20, fontSize: 16, textAlign: "center" }}>
          Don't have an account?{" "}
          <Pressable
            onPress={() => {
              navigation.navigate("StudentSignupScreen");
            }}
          >
            <Text style={{ color: "#3498db", fontWeight: "bold" }}>
              Sign Up
            </Text>
          </Pressable>
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  dropdownButton: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  dropdownButtonText: {
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "50%",
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  option: {
    padding: 15, // Increase padding for bigger buttons
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  optionText: {
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
  errors: {
    fontSize: 12,
    color: "red",
    marginTop: 3,
  },
  textInput: {
    height: 50,
    width: "100%",
    borderColor: "#03045E",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
