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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastManager, { Toast } from "toastify-react-native";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const editSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

const StudentEditPage = ({ route }) => {
  const user = route.params.user;
  const navigation = useNavigation();
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const {
    mutate: editMutate,
    isLoading: editLoading,
    error: mutationError,
  } = useMutation({
    mutationFn: (data) => {
      return axios.patch("/users/update/profile", data);
    },
    onSuccess: (response) => {
      Toast.success(response?.data?.message || "Success");
      queryClient.invalidateQueries([`account-details-${auth?.userId}`]);
      navigation.navigate("Account");
    },

    onError: (error) => {
      Toast.error(error?.response?.data?.message || "Error");
    },
  });

  return (
    <ScrollView>
      <ToastManager />
      <Formik
        initialValues={{
          name: user?.name || "",
          email: user?.email || "",
        }}
        validateOnMount={true}
        validationSchema={editSchema}
        onSubmit={(values) => {
          values.userType = "client";
          values.userId = auth?.userId;
          editMutate(values);
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
            className="bg-[#feffff] pb-4 mx-3 p-3 rounded-lg mb-5 mt-[30px]"
            style={{ elevation: 7, shadowColor: "#03045E" }}
          >
            <View className="flex flex-col gap-3 py-5">
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
            </View>

            <TouchableOpacity
              disabled={!isValid || editLoading}
              onPress={() => handleSubmit()}
              style={{
                backgroundColor: isValid || editLoading ? "#206320" : "#CACFD2", // Change background color based on isValid
                paddingVertical: 15,
                paddingHorizontal: 30,
                borderRadius: 10,
                textAlign: "center",
                opacity: isValid ? 1 : 0.5, // Change opacity based on isValid
              }}
            >
              <Text
                style={{
                  color: isValid || editLoading ? "#fff" : "#000",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default StudentEditPage;

const styles = StyleSheet.create({
  errors: {
    fontSize: 12,
    color: "red",
    marginTop: 3,
  },
  textInput: {
    height: 40,
    width: "100%",
    borderColor: "#03045E",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
