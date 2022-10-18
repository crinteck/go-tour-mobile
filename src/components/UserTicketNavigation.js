import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserTicketDetails from "../screens/user_tickets/userTicketDetails";
import UserTickets from "../screens/user_tickets/UserTickets";

const Stack = createNativeStackNavigator();
const UserTicketNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserTicketList" component={UserTickets} />
      <Stack.Screen name="UserTicketDetails" component={UserTicketDetails} />
    </Stack.Navigator>
  );
};

export default UserTicketNavigation;
