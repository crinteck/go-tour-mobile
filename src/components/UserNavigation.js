import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserMenuScreen from "../screens/user/UserMenuScreen";

const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserMenu" component={UserMenuScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
