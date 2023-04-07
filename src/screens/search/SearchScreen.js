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
import { LinearGradient } from "expo-linear-gradient";
import {
  formattedStartDateState,
  arrivalState,
  departureState,
  startDateState,
} from "../../atoms/globalState";
import { useRecoilState, useRecoilValue } from "recoil";
import { getHourFromDate } from "../../utils/commonHelper";
import currency from "currency.js";
import { Dimensions } from "react-native";
import TravelSuggestionItem from "../../components/TravelSuggestionItem";
import { travelsSuggestions } from "../../services/travelsService";

const SearchScreen = ({ navigation }) => {
  const [visibleCityModal, setVisibleCityModal] = useState(false);
  const [searchCityType, setSearchCityType] = useState();
  const [arrival, setArrival] = useRecoilState(arrivalState);
  const [departure, setDeparture] = useRecoilState(departureState);
  const [searchDate, setSearchDate] = useRecoilState(startDateState);
  const [dateTimePickerOpen, setDateTimePickerOpen] = useState(false);
  const formattedStartDate = useRecoilValue(formattedStartDateState);
  const [travels, setTravels] = useState();

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
    return () => {};
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

  const getTravelsSuggestions = () => {
    travelsSuggestions({
      page: 1,
      limit: 10,
    })
      .then((res) => {
        setTravels(res.data?.travels);
      })
      .catch((err) => {});
  };

  useLayoutEffect(() => {
    getTravelsSuggestions();
    return () => {};
  }, []);

  return (
    <>
      <StatusBar backgroundColor="teal" style="light" />
      <Box bgColor="white" flex={1} justifyContent="center">
        <Box h={"50%"} mt={-10}>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={{ flex: 1 }}
          >
            <ScrollView
              horizontal
              pb={15}
              pt={5}
              contentContainerStyle={{
                paddingHorizontal: 5,
                alignItems: "center",
                justifyContent: "center",
                minWidth: Dimensions.get("window").width,
              }}
            >
              {travels?.map((item, index) => (
                <TravelSuggestionItem  style={ { alignSelf: 'flex-start' } }  key={index} item={item} />
              ))}
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
