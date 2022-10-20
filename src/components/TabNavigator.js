import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Fontisto, AntDesign } from "@expo/vector-icons";
import UserTicketNavigation from "./UserTicketNavigation";
import UserNavigation from "./UserNavigation";
import SearchNavigation from "./SearchNavigation";

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
          headerShown: false,
          tabBarIcon: (props) => <Ionicons name="search" {...props} />,
        }}
        name="Search"
        component={SearchNavigation}
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
          headerShown: false,
          tabBarIcon: (props) => <AntDesign name="user" {...props} />,
        }}
        component={UserNavigation}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
