import { Fragment, useLayoutEffect, useState, useEffect } from "react";
import { Box, FlatList, ScrollView, StatusBar } from "native-base";
import UserFlatListItem from "../../components/UserFlatListItem";

import * as ticketsService from "../../services/ticketsService";

const UserTickets = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchTickets = () => {
    ticketsService.tickets().then((response) => {
      console.log(response.data);
      setTickets(response?.data);
    });
  };

  const _renderItem = ({ item }) => <UserFlatListItem item={item} />;

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });

    return () => {};
  }, []);

  useEffect(() => {
    fetchTickets();

    return () => {};
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />
      <Box mt={3}>
        <FlatList
          safeArea
          paddingLeft={4}
          paddingRight={4}
          paddingTop={10}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          data={tickets}
          keyExtractor={(item) => item?.code}
          renderItem={_renderItem}
        />
      </Box>
    </Fragment>
  );
};

export default UserTickets;
