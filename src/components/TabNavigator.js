import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Fontisto, AntDesign } from "@expo/vector-icons";
import SearchScreen from "../screens/search/SearchScreen";
import UserTicketNavigation from "./UserTicketNavigation";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#005c4b",
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <Ionicons name="search" {...props} />,
        }}
        name="SearchScreen"
        component={SearchScreen}
      />
      <Tab.Screen
        name="UserTickets"
        options={{
          headerShown: false,
          tabBarIcon: (props) => <Fontisto name="bus-ticket" {...props} />,
        }}
        component={UserTicketNavigation}
      />
      <Tab.Screen
        name="User"
        options={{
          tabBarIcon: (props) => <AntDesign name="user" {...props} />,
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
