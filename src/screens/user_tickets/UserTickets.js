import { useLayoutEffect } from "react";
import { View, Text, Box, ScrollView } from "native-base";
import UserFlatListItem from "../../components/UserFlatListItem";

const UserTickets = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });

    return () => {};
  }, []);
  return (
    <ScrollView
      safeArea
      paddingLeft={4}
      paddingRight={4}
      paddingTop={10}
      paddingBottom={10}
    >
      <UserFlatListItem />
      <UserFlatListItem />
      <UserFlatListItem />
      <UserFlatListItem />
    </ScrollView>
  );
};

export default UserTickets;
