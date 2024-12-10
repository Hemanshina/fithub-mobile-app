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
  ActivityIndicator,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "../api/axios";
import { Toast } from "toastify-react-native";
import useAuth from "../hooks/useAuth";

const signupSchema = Yup.object().shape({
  weight: Yup.number().required("Please enter weight"),

  height: Yup.number().required("Please enter height"),
});

const LogWeight = () => {
  const { auth } = useAuth();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    mutate: registerMutate,
    isPending: registerLoading,
    error: mutationError,
  } = useMutation({
    mutationFn: (data) => {
      return axios.post("/progress-log", data);
    },
    onSuccess: (response) => {
      Toast.success(response?.data?.message || "Success");
      navigation.navigate("Progress");
    },

    onError: (error) => {
      Toast.error(error?.response?.data?.message || "Error");
      console.log(error);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView className="bg-light">
      <Formik
        initialValues={{
          weight: "",
          height: "",
        }}
        validateOnMount={true}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          console.log(values);
          values.clientId = auth?.userId;
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
            className="bg-[#feffff]  rounded-t-3xl "
            style={{ elevation: 7, shadowColor: "#03045E" }}
          >
            <View className="flex flex-col gap-3 px-3 py-5">
              <Text>Weight(in kg)</Text>
              <View>
                <TextInput
                  placeholder="Weight"
                  onChangeText={handleChange("weight")}
                  onBlur={handleBlur("weight")}
                  value={values.weight}
                  style={styles.textInput}
                />
                {errors?.weight && touched?.weight && (
                  <Text style={styles.errors}>{errors?.weight}</Text>
                )}
              </View>

              <View>
                <Text className="mb-4">Height(in cm)</Text>
                <TextInput
                  placeholder="Height"
                  onChangeText={handleChange("height")}
                  onBlur={handleBlur("height")}
                  value={values.height}
                  style={styles.textInput}
                />
                {errors?.height && touched?.height && (
                  <Text style={styles.errors}>{errors?.height}</Text>
                )}
              </View>
              {registerLoading ? (
                <View>
                  <ActivityIndicator size={30} color={"green"} />
                </View>
              ) : (
                <TouchableOpacity
                  disabled={!isValid || registerLoading}
                  onPress={() => handleSubmit()}
                  style={{
                    backgroundColor:
                      isValid || registerLoading ? "#206320" : "#CACFD2",
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
                    Submit
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LogWeight;

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
