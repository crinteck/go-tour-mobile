import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserTickets from "../screens/user_tickets/UserTickets";

const Stack = createNativeStackNavigator();
const UserTicketNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserTicketList" component={UserTickets} />
    </Stack.Navigator>
  );
};

export default UserTicketNavigation;
