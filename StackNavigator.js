import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useAutt from "./hooks/useAuth";
import AuthNavigator from "./navigation/AuthNavigator";
import MainNavigator from "./navigation/MainNavigator";

const StackNavigator = () => {
  const { auth } = useAutt();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth && auth.userId !== undefined) {
      setLoading(false);
    }
  }, [auth]);

  if (!auth.userId) {
    return <AuthNavigator />;
  } else {
    return <MainNavigator />;
  }
};

export default StackNavigator;

const styles = StyleSheet.create({});
