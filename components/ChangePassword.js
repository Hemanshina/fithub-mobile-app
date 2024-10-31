import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";
import axios from "../api/axios";

const changePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { auth, setAuth } = useAuth();

  // change pass mutate
  const {
    mutate: changePassMutate,
    isLoading: changePassLoading,
    error: mutationError,
  } = useMutation({
    mutationFn: (data) => {
      return axios.patch("/auth/change-password", data);
    },
    onSuccess: async (response) => {
      Toast.success(response?.data?.message);
      ToastAndroid.showWithGravity(
        "Password updated successfully!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      navigation.navigate("Account");
    },

    onError: (error) => {
      Toast.error(error?.response?.data?.message || "Error");
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <ToastManager />
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        validateOnMount={true}
        validationSchema={changePasswordSchema}
        onSubmit={(values) => {
          // Handle password change submission
          const data = {
            password: values.newPassword,
            userId: auth?.userId,
            userType: auth?.roles[0],
          };
          changePassMutate(data);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View
            className="bg-[#feffff]  flex flex-col gap-4 pb-4  p-3 rounded-lg py-5 mt-[10px]"
            style={{ elevation: 7, shadowColor: "#03045E" }}
          >
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
                placeholder="New Password"
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
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
            {errors?.newPassword && touched?.newPassword && (
              <Text style={styles.errors}>{errors?.newPassword}</Text>
            )}

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
                placeholder="Confirm Password"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
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
            {errors?.confirmPassword && touched?.confirmPassword && (
              <Text style={styles.errors}>{errors?.confirmPassword}</Text>
            )}

            <TouchableOpacity
              disabled={!isValid || changePassLoading}
              onPress={handleSubmit}
              style={[
                styles.button,
                { backgroundColor: isValid ? "#206320" : "#CACFD2" },
              ]}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  input: {
    height: 40,
    borderColor: "#03045E",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    bottom: 15,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  errors: {
    fontSize: 12,
    color: "red",
    marginTop: 3,
  },
});

export default ChangePassword;
