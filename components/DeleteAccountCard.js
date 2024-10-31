import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import axios from "../api/axios";

const DeleteAccountCard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { auth } = useAuth();

  const logout = useLogout();

  // login mutate
  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    error: mutationError,
  } = useMutation({
    mutationFn: (data) => {
      return axios.delete(`/users/delete/${auth?.roles[0]}/${auth?.userId}`, data);
    },
    onSuccess: async (response) => {
      logout();
    },

    onError: (error) => {
      Toast.error(error?.response?.data?.message || "Error");
    },
  });

  const handleDelete = () => {
 
    deleteMutate()
    setModalVisible(false); // Close modal after deletion
  };

  return (
    <View
      style={{ elevation: 3, shadowColor: "#03045E" }}
      className="bg-[#f8f7f7] p-2 rounded-md mt-3 py-3 "
    >
      <View>
        <Text className="font-bold text-[15px] ">Delete your account</Text>
      </View>
      <View className="flex flex-row flex-wrap justify-between gap-2 py-3 ">
        <Text className="font- text-[15px] ">
          Deleting your account is an irreversible action
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="px-3 py-2 bg-red-500 rounded-md "
        >
          <Text className="text-light">Delete</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}
          >
            <Text style={{ marginBottom: 20 }}>
              Are you sure you want to delete your account?
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: "gray",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={{ backgroundColor: "red", padding: 10, borderRadius: 5 }}
              >
                <Text style={{ color: "white" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteAccountCard;
