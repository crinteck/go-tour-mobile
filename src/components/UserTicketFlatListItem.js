import React from "react";
import {
  View,
  Text,
  Box,
  VStack,
  Heading,
  Badge,
  HStack,
  Stack,
  Button,
  Icon,
  Pressable,
} from "native-base";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { getHourFromDate } from "../utils/commonHelper";
import currency from "currency.js";
import QRCode from "react-native-qrcode-svg";

const UserTicketFlatListItem = ({ item, showDetails = false }) => {
  const navigation = useNavigation();
  return (
    <Box
      bg={"white"}
      borderRadius="lg"
      paddingLeft={4}
      paddingRight={4}
      paddingTop={10}
      paddingBottom={10}
      marginBottom={5}
    >
      <Box
        height={30}
        width={30}
        borderRadius="full"
        backgroundColor={"gray.100"}
        position={"absolute"}
        top={-15}
        left={"50%"}
      ></Box>
      <Box
        height={30}
        width={30}
        borderRadius="full"
        backgroundColor={"gray.100"}
        position={"absolute"}
        bottom={-15}
        left={"50%"}
      ></Box>
      <Pressable on>
        <Stack space={4}>
          <HStack
            space={4}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Heading size="sm">
              {dayjs(item?.startDate).format("ddd DD MMM YYYY")}
            </Heading>
            <Badge
              _text={{
                fontSize: 16,
                letterSpacing: 2,
              }}
              colorScheme={
                dayjs().diff(dayjs(item.startDate)) >= 0
                  ? "coolGray"
                  : "primary"
              }
              borderRadius={"full"}
            >
              {item.validated === 1
                ? "Validé"
                : dayjs().diff(dayjs(item.startDate)) >= 0
                ? "Expiré"
                : "Actif"}
            </Badge>
          </HStack>
          <HStack space={4} justifyContent="space-between">
            <Stack maxW={"80%"}>
              <Heading size="sm" numberOfLines={1}>
                {`${item?.travels_params?.routes.cities_routes_iddepartureTocities?.libelle
                  ?.charAt(0)
                  ?.toUpperCase()}${item?.travels_params?.routes.cities_routes_iddepartureTocities?.libelle?.slice(
                  1
                )}`}
              </Heading>
              <Text color={"muted.400"}>Départ</Text>
            </Stack>
            <Heading size="sm">{getHourFromDate(item?.startHour)}</Heading>
          </HStack>
          <HStack space={4} justifyContent="space-between">
            <Stack maxW={"80%"}>
              <Heading size="sm" numberOfLines={1}>
                {`${item?.travels_params?.routes.cities_routes_idarrivalTocities?.libelle
                  ?.charAt(0)
                  ?.toUpperCase()}${item?.travels_params?.routes.cities_routes_idarrivalTocities?.libelle?.slice(
                  1
                )}`}
              </Heading>
              <Text color={"muted.400"}>Arrivée</Text>
            </Stack>
            <Heading size="sm">{getHourFromDate(item?.endHour)}</Heading>
          </HStack>
          <HStack space={4} justifyContent="space-between">
            <Stack maxW={"80%"}>
              <Heading size="sm" numberOfLines={1}>
                {`${item?.travels_params?.routes?.compagnies?.denomination
                  ?.charAt(0)
                  ?.toUpperCase()}${item?.travels_params?.routes?.compagnies?.denomination?.slice(
                  1
                )}`}
              </Heading>
              <Text color={"muted.400"}>Compagnie</Text>
            </Stack>
            <Heading size="sm">
              <Icon size={4} as={<Feather name="users" />} /> 1
            </Heading>
          </HStack>
          <HStack space={4} justifyContent="space-between">
            <Stack maxW={"80%"}>
              <Heading size="sm" numberOfLines={1}>
                {`${item?.ticket_passenger?.first_name} ${item?.ticket_passenger?.last_name}`}
              </Heading>
              <Text color={"muted.400"}>Passager</Text>
            </Stack>
          </HStack>
          <HStack space={4} justifyContent="space-between">
            <Stack>
              <Heading size="sm" numberOfLines={1}>
                {`#${item?.code}`}
              </Heading>
              <Text color={"muted.400"}>ID</Text>
            </Stack>
            <Badge
              _text={{
                fontSize: 16,
                letterSpacing: 2,
              }}
              colorScheme={
                dayjs().diff(dayjs(item.startDate)) >= 0
                  ? "coolGray"
                  : "primary"
              }
              borderRadius={"full"}
            >
              {currency(Number(item?.price)).format({
                separator: " ",
                precision: 0,
                symbol: "",
              })}
            </Badge>
          </HStack>
          {showDetails !== true && (
            <Button
              mt={3}
              onPress={() =>
                navigation?.navigate("UserTicketDetails", {
                  ticketId: item.idticket,
                })
              }
              rounded={"full"}
            >
              Détails du ticket
            </Button>
          )}
          {showDetails === true && (
            <Stack
              space={4}
              justifyContent="center"
              alignItems={"center"}
              mt={4}
            >
              <QRCode value={item?.code} />
              <HStack justifyContent={"space-between"} mt={4} w={"100%"}>
                <Pressable>
                  <Icon size={6} as={<Feather name="download" />} />
                </Pressable>
                <Pressable>
                  <Icon size={6} as={<Feather name="info" />} />
                </Pressable>
              </HStack>
            </Stack>
          )}
        </Stack>
      </Pressable>
    </Box>
  );
};

export default UserTicketFlatListItem;
