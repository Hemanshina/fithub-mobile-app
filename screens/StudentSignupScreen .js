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
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "../api/axios";
import { Toast } from "toastify-react-native";

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),

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

const StudentSignupScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    mutate: registerMutate,
    isPending: registerLoading,
    error: mutationError,
  } = useMutation({
    mutationFn: (data) => {
      return axios.post("/users/client", data);
    },
    onSuccess: (response) => {
      navigation.navigate("Login");
      Toast.success(response?.data?.message || "Success");
    },

    onError: (error) => {
      Toast.error(error?.response?.data?.message || "Error");
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView className="bg-light">
      <Image
        source={require("../assets/sign.jpg")}
        style={{
          width: "100%",
          height: 180,
          resizeMode: "cover",
          marginBottom: 2,
        }}
      />

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validateOnMount={true}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          console.log(values);
          registerMutate(values);
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
          <View
            className="bg-[#feffff]  rounded-t-3xl  mt-[-30px]"
            style={{ elevation: 7, shadowColor: "#03045E" }}
          >
            <View className="pt-3 bg-primary rounded-t-3xl">
              <Text className="text-2xl font-bold text-center text-light ">
                Welcome to Fithub{" "}
              </Text>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 30 }}
                className="text-center text-light"
              >
                Create Account
              </Text>
            </View>

            <View className="flex flex-col gap-3 px-3 py-5">
              <View>
                <TextInput
                  placeholder="Full Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  style={styles.textInput}
                />
                {errors?.name && touched?.name && (
                  <Text style={styles.errors}>{errors?.name}</Text>
                )}
              </View>

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
                    paddingVertical: 11,
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
              <TouchableOpacity
                disabled={!isValid || registerLoading}
                onPress={() => handleSubmit()}
                style={{
                  backgroundColor:
                    isValid || registerLoading ? "#206320" : "#CACFD2", // Change background color based on isValid
                  paddingVertical: 15,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                  textAlign: "center",
                  opacity: isValid ? 1 : 0.5, // Change opacity based on isValid
                }}
              >
                <Text
                  style={{
                    color: isValid || registerLoading ? "#fff" : "#000",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ marginTop: 20, fontSize: 16, textAlign: "center" }}>
              Already have an account?{" "}
              <Pressable
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={{ color: "#3498db", fontWeight: "bold" }}>
                  Log In
                </Text>
              </Pressable>
            </Text>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default StudentSignupScreen;

const styles = StyleSheet.create({
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
