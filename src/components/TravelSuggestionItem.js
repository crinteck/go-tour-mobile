import {
    Text,
    Box,
    Heading,
    Stack,
    HStack,
    Button,
} from "native-base";

import dayjs from "dayjs";

import currency from "currency.js";
import { Dimensions } from "react-native";
import { getHourFromDate } from "../utils/commonHelper";
import { formattedStartDateState, selectedBookingTravelState } from "../atoms/globalState";
import { useRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";

const TravelSuggestionItem = ({ item }) => {
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

            marginLeft={5}
            marginRight={5}
            shadow={2}
            width={Dimensions.get("window").width - 20}
            height={"80%"}
        >
            <Stack >
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
                <Stack justifyContent="center" alignItems={"center"} mt={4} >
                    <Button
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
    )
}

export default TravelSuggestionItem