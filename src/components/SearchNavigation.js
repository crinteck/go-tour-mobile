import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/search/SearchScreen";
import TicketListScreen from "../screens/search/TravelsListScreen";
import UserMenuScreen from "../screens/user/UserMenuScreen";

const Stack = createNativeStackNavigator();

const SearchNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="TicketListScreen" component={TicketListScreen} />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
