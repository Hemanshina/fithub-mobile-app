import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { FitnessContext } from "./Context";
import StackNavigator from "./StackNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import ToastManager from "toastify-react-native";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FitnessContext>
          <NavigationContainer>
            <ToastManager />
            <StatusBar backgroundColor="#206320" barStyle="light-content" />
            <StackNavigator />
          </NavigationContainer>
        </FitnessContext>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
