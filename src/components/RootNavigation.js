import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import TabNavigator from "./TabNavigator";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authState";

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  const [authValue, setAuthValue] = useRecoilState(authState);
  return (
    <Stack.Navigator>
      {authValue ? (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={TabNavigator}
          />
        </>
      ) : (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;
