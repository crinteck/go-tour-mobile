import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { RecoilRoot } from "recoil";
import RootNavigation from "./src/components/RootNavigation";

export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootNavigation />         
        </NavigationContainer>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}
