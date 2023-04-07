import { Fragment, useLayoutEffect, useState, useEffect } from "react";
import { Box, FlatList, HStack, Icon, ScrollView, StatusBar, Text } from "native-base";
import UserTicketFlatListItem from "../../components/UserTicketFlatListItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as ticketsService from "../../services/ticketsService";

const UserTickets = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = () => {
    setLoading(true);
    ticketsService
      .tickets()
      .then((response) => {
        setTickets(response?.data);
      })
      .catch((error) => { })
      .finally(() => {
        setLoading(false);
      });
  };

  const _renderItem = ({ item }) => <UserTicketFlatListItem item={item} />;

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: true,
      headerTitle: () => (
        <HStack justifyContent={"center"} alignItems={"center"} space={3}>
          <Icon
            as={<MaterialCommunityIcons name="ticket" />}
            size="sm"
            color="white"
          />
          <Text color="white" fontSize="lg">
            Mes billets
          </Text>
        </HStack>
      ),
      headerTitleStyle: {
        color: "white",
      },
      headerStyle: {
        backgroundColor: "teal",
      },
    });

    return () => { };
  }, []);

  useEffect(() => {
    fetchTickets();

    return () => { };
  }, []);

  return (
    <Fragment>
      <StatusBar backgroundColor="teal" style="light" />
      <Box mt={3}>
        <FlatList
          safeArea
          paddingLeft={4}
          paddingRight={4}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          data={tickets}
          keyExtractor={(item) => item?.code}
          renderItem={_renderItem}
          refreshing={loading}
          onRefresh={fetchTickets}
        />
      </Box>
    </Fragment>
  );
};

export default UserTickets;
