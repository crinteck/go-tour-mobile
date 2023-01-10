import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import TabNavigator from "./TabNavigator";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authState";
import * as authHelper from "../utils/authHelper";

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  const [authValue, setAuthValue] = useRecoilState(authState);
  useEffect(() => {
    authHelper
      .getUser()
      .then((value) => {
        let userData = JSON.parse(value);
        if (typeof userData === "object" && userData?.token) {
          const decodedToken = jwt_decode(userData.token);
          const expirationTokenTime = new Date(
            decodedToken.exp * 1000
          ).getTime();

          const timeNow = new Date();
          if (timeNow > expirationTokenTime) {
            throw "expired token";
          }
          setAuthValue(userData);
        }
        //console.log(JSON.parse(value));
      })
      .catch((reason) => {
        setAuthValue(null);
      });
    return () => {};
  }, []);
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
