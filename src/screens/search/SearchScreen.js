import { useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Box,
  Heading,
  Center,
  Stack,
  VStack,
  Icon,
  FormControl,
  HStack,
  Select,
  Pressable,
  Divider,
  Button,
  Image,
  Toast,
  ScrollView,
} from "native-base";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ImageBackground, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import SearchCitiesModal from "../../components/Modals/SearchCitiesModal";
import dayjs from "dayjs";
import { LinearGradient } from 'expo-linear-gradient';
import {
  formattedStartDateState,
  arrivalState,
  departureState,
  startDateState,
} from "../../atoms/globalState";
import { useRecoilState, useRecoilValue } from "recoil";
import TravelsFlatListItem from "../../components/TravelsFlatListItem";
import { getHourFromDate } from "../../utils/commonHelper";
import currency from "currency.js";

const SearchScreen = ({ navigation }) => {
  const [visibleCityModal, setVisibleCityModal] = useState(false);
  const [searchCityType, setSearchCityType] = useState();
  const [arrival, setArrival] = useRecoilState(arrivalState);
  const [departure, setDeparture] = useRecoilState(departureState);
  const [searchDate, setSearchDate] = useRecoilState(startDateState);
  const [dateTimePickerOpen, setDateTimePickerOpen] = useState(false);
  const formattedStartDate = useRecoilValue(formattedStartDateState);
  const item = null;

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: "teal" },
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/logo_type_login_redim.png")}
            alt="App logo"
            h={"50"}
            w={"50"}
            resizeMode="contain"
          />
          <Text style={{ color: "white", fontSize: 20, marginLeft: 10 }}>
            Rechercher
          </Text>

        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("UserMenuScreen")}
          style={{ marginRight: 10 }}
        >
          <FontAwesome name="user-circle" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
    return () => { };
  }, []);

  const handleSelectCity = (searchCityType, city) => {
    if (searchCityType === "ARRIVAL") {
      return setArrival(city);
    }
    if (searchCityType === "DEPARTURE") {
      return setDeparture(city);
    }
  };

  const goToTravelsList = () => {
    if (!departure) {
      return Toast.show({
        bg: "error.400",
        description: `Sélectionnez une ville de départ.`,
      });
    }
    if (!arrival) {
      return Toast.show({
        bg: "error.400",
        description: `Sélectionnez une ville d'arrivée.`,
      });
    }
    if (arrival.idcities === departure.idcities) {
      return Toast.show({
        bg: "error.400",
        description: `La ville d'arrivée doit être différente de la ville départ.`,
      });
    }
    navigation?.navigate("TicketListScreen");
  };

  return (
    <>
      <StatusBar backgroundColor="teal" style="light" />
      <Box bgColor="white" flex={1} justifyContent="center">
        <Box h={"50%"} mt={-10}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{ flex: 1 }}
          >

            <ScrollView horizontal pt={5} pb={5} >
              <Box
                bg={"white"}
                borderRadius="lg"
                paddingLeft={4}
                paddingRight={4}
                paddingTop={5}

                marginLeft={5}
                marginRight={5}
                shadow={2}
                width={330}
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
            </ScrollView>
          </LinearGradient>
        </Box>
        <Box
          bgColor={"white"}
          borderTopLeftRadius={25}
          borderTopRadius={25}
          mt={-50}
          p={4}
          justifyContent="center"
        >
          <Stack space={4}>
            <TouchableOpacity
              onPress={() => {
                setSearchCityType("DEPARTURE");
                setVisibleCityModal(true);
              }}
            >
              <HStack space={3}>
                <Box
                  h={45}
                  w={45}
                  bg={"gray.100"}
                  borderRadius={8}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Icon
                    as={<MaterialCommunityIcons name="bus" />}
                    color="primary.900"
                    size={6}
                  />
                </Box>

                <Stack flex={1}>
                  <Text color={"muted.400"}>DEPART</Text>
                  <Heading size={"sm"} numberOfLines={1}>
                    {departure
                      ? `${departure.libelle
                        ?.charAt(0)
                        ?.toUpperCase()}${departure.libelle?.slice(1)}`
                      : "Votre ville de départ"}
                  </Heading>
                </Stack>
              </HStack>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => {
                setSearchCityType("ARRIVAL");
                setVisibleCityModal(true);
              }}
            >
              <HStack space={3}>
                <Box
                  h={45}
                  w={45}
                  bg={"gray.100"}
                  borderRadius={8}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Icon
                    as={<MaterialCommunityIcons name="bus-stop" />}
                    color="primary.900"
                    size={6}
                  />
                </Box>

                <Stack flex={1}>
                  <Text color={"muted.400"}>ARRIVEE</Text>
                  <Heading size={"sm"} numberOfLines={1}>
                    {arrival
                      ? `${arrival.libelle
                        ?.charAt(0)
                        ?.toUpperCase()}${arrival.libelle?.slice(1)}`
                      : "Votre ville de destination"}
                  </Heading>
                </Stack>
              </HStack>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => {
                setDateTimePickerOpen(true);
              }}
            >
              {dateTimePickerOpen === true && (
                <DateTimePicker
                  value={searchDate.toDate()}
                  onChange={(ev, date) => {
                    setSearchDate(dayjs(date));
                    setDateTimePickerOpen(false);
                  }}
                />
              )}
              <HStack space={3}>
                <Box
                  h={45}
                  w={45}
                  bg={"gray.100"}
                  borderRadius={8}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Icon
                    as={<FontAwesome name="calendar" />}
                    color="primary.900"
                    size={6}
                  />
                </Box>
                <Stack flex={1}>
                  <Text color={"muted.400"}>DATE</Text>
                  <Heading size={"sm"} numberOfLines={1}>
                    {formattedStartDate}
                  </Heading>
                </Stack>
              </HStack>
            </TouchableOpacity>
            <Divider />
            <Button onPress={goToTravelsList} mt={4} rounded={"full"}>
              Rechercher
            </Button>
          </Stack>
        </Box>
      </Box>
      <SearchCitiesModal
        visible={visibleCityModal}
        setVisible={setVisibleCityModal}
        searchCityType={searchCityType}
        handleSelectCity={handleSelectCity}
      />
    </>
  );
};

export default SearchScreen;
