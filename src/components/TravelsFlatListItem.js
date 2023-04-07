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
  Divider,
  Link,
} from "native-base";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import dayjs from "dayjs";
import { getHourFromDate } from "../utils/commonHelper";
import currency from "currency.js";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedBookingTravelState } from "../atoms/globalState";

const TravelsFlatListItem = ({ item }) => {
  const [selectedTravel, setSelectedTravel] = useRecoilState(
    selectedBookingTravelState
  );

  const navigation = useNavigation();
  return (
    <Box
      bg={"white"}
      borderRadius="lg"
      paddingLeft={4}
      paddingRight={4}
      paddingTop={5}
      paddingBottom={5}
      marginBottom={5}
    >
      <Box
        height={30}
        width={30}
        borderRadius="full"
        backgroundColor={"gray.100"}
        position={"absolute"}
        bottom={"25%"}
        left={-15}
      ></Box>
      <Box
        height={30}
        width={30}
        borderRadius="full"
        backgroundColor={"gray.100"}
        position={"absolute"}
        bottom={"25%"}
        right={-15}
      ></Box>
      <Divider
        borderStyle={"dashed"}
        borderWidth={1}
        position="absolute"
        bottom={"32%"}
        borderColor="muted.400"
        left={4}
      />
      <Stack space={4}>
        <HStack space={4} justifyContent="space-between">
          <Stack maxW={"80%"}>
            <Heading size="sm" numberOfLines={1}>
              {`${item?.travels_params?.routes.cities_routes_iddepartureTocities?.libelle
                ?.charAt(0)
                ?.toUpperCase()}${item?.travels_params?.routes.cities_routes_iddepartureTocities?.libelle?.slice(
                1
              )}`}
            </Heading>
            <Text color={"muted.400"}>
              {dayjs(item?.startDate).format("DD-MM-YYYY")}
            </Text>
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
            <Text color={"muted.400"}>
              {dayjs(item?.endDate).format("DD-MM-YYYY")}
            </Text>
          </Stack>
          <Heading size="sm">{getHourFromDate(item?.endHour)}</Heading>
        </HStack>
        <HStack space={4} justifyContent="space-between">
          <Stack>
            <Heading size="sm" numberOfLines={1}>
              {`${item?.travels_params?.agencies?.compagnies?.denomination
                ?.charAt(0)
                ?.toUpperCase()}${item?.travels_params?.agencies?.compagnies?.denomination?.slice(
                1
              )}`}
            </Heading>
            <Text color={"muted.400"}>Agence</Text>
          </Stack>
        </HStack>
        <Stack space={4} justifyContent="center" alignItems={"center"} mt={4}>
          <Button
          mt={3}
            color={"muted.400"}
            onPress={() => {
              setSelectedTravel(item);
              navigation?.navigate("TravelReservationScreen");
            }}
            rounded="full"
          >
            <Text color={"white"}>
              Réserver maintenant à{" "}
              <Text fontWeight={"bold"} color="orange.400">
                {currency(item?.travels_params.price).format({
                  separator: " ",
                  precision: 0,
                  symbol: "",
                })}
                FCFA
              </Text>
            </Text>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TravelsFlatListItem;
