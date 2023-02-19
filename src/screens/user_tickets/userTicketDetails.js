import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Box, ScrollView } from "native-base";
import UserTicketDetailsFlatListItem from "../../components/UserTicketDetailsFlatListItem";

import * as ticketsService from "../../services/ticketsService";
import UserTicketFlatListItem from "../../components/UserTicketFlatListItem";
import { ActivityIndicator, RefreshControl } from "react-native";

const UserTicketDetails = ({ navigation, route }) => {
  const [ticket, setTicket] = useState();
  const [loading, setLoading] = useState(false);
  const { ticketId } = route.params;
  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });

    return () => {};
  }, []);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const response = await ticketsService.findById(ticketId);
      if (response.status === 200 && typeof response.data === "object") {
        setTicket(response.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketId !== undefined) {
      fetchTicket();
    }

    return () => {};
  }, [ticketId]);

  return (
    <ScrollView
      safeArea
      paddingLeft={4}
      paddingRight={4}
      marginTop={20}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchTicket} />
      }
    >
      {ticket && (
        <Box>
          <UserTicketFlatListItem item={ticket} showDetails={true} />
        </Box>
      )}
    </ScrollView>
  );
};

export default UserTicketDetails;
