import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/search/SearchScreen";
import TicketListScreen from "../screens/search/TravelsListScreen";
import TravelReservation from "../screens/travels/TravelReservation";
import UserMenuScreen from "../screens/user/UserMenuScreen";

const Stack = createNativeStackNavigator();

const SearchNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="TicketListScreen" component={TicketListScreen} />
      <Stack.Screen
        name="TravelReservationScreen"
        component={TravelReservation}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
