import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "toastify-react-native";
import { useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const ImageUpload = () => {
  const [profileImage, setProfileImage] = useState("");
  const [sending, setSending] = useState(false);
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { auth } = useAuth();

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!response.canceled) {
        setProfileImage(response.assets[0].uri);
      }
    }
  };

  const handleUpload = () => {
    // Create a new FormData object
    const formData = new FormData();

    const uriParts = profileImage.split("/");
    const fileName = uriParts[uriParts.length - 1];

    // Append the selected file to the FormData object
    formData.append("file", {
      uri: profileImage,
      type: "image/jpg",
      name: fileName,
    });
    setSending(!sending);

    axios
      .patch(
        `/auth/update-profile/${auth?.roles[0]}/${auth?.userId}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        Toast.success(response?.data?.message);
        queryClient.invalidateQueries([`account-details-${auth?.userId}`]);
        navigation.navigate("Account");
        setSending(false);
      })
      .catch((error) => {
        Toast.error(error?.response?.data?.message);
        setSending(false);
      });
  };

  const uploadProfileImage = async () => {
    try {
      handleUpload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          disabled={sending}
          onPress={openImageLibrary}
          style={styles.uploadBtnContainer}
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text style={styles.uploadBtn}>Upload Profile Image</Text>
          )}
        </TouchableOpacity>
        {profileImage ? (
          <View>
            {sending ? (
              <View>
                <View className="mt-3">
                  <ActivityIndicator color="#0000ff" size={30} />
                </View>
              </View>
            ) : (
              <Text
                onPress={() => uploadProfileImage()}
                style={[
                  styles.skip,
                  {
                    backgroundColor: "green",
                    color: "white",
                    borderRadius: 8,
                    marginTop: 10,
                  },
                ]}
              >
                Upload
              </Text>
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  skip: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.5,
  },
});

export default ImageUpload;
