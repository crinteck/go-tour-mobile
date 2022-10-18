import { useLayoutEffect } from "react";
import { View, Text, Box, ScrollView } from "native-base";
import UserTicketDetailsFlatListItem from "../../components/UserTicketDetailsFlatListItem";

const UserTicketDetails = ({ navigation }) => {
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
      <UserTicketDetailsFlatListItem />
      <UserTicketDetailsFlatListItem />
      <UserTicketDetailsFlatListItem />
      <UserTicketDetailsFlatListItem />
    </ScrollView>
  );
};

export default UserTicketDetails;
