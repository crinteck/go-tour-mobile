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
import {
  formattedStartDateState,
  arrivalState,
  departureState,
  startDateState,
} from "../../atoms/globalState";
import { useRecoilState, useRecoilValue } from "recoil";

const SearchScreen = ({ navigation }) => {
  const [visibleCityModal, setVisibleCityModal] = useState(false);
  const [searchCityType, setSearchCityType] = useState();
  const [arrival, setArrival] = useRecoilState(arrivalState);
  const [departure, setDeparture] = useRecoilState(departureState);
  const [searchDate, setSearchDate] = useRecoilState(startDateState);
  const [dateTimePickerOpen, setDateTimePickerOpen] = useState(false);
  const formattedStartDate = useRecoilValue(formattedStartDateState);

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: false,
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

  return (
    <>
      <Box bgColor="white" flex={1} justifyContent="center">
        <StatusBar style="light" />
        <Box h={"50%"} safeArea>
          <ImageBackground
            style={{ flex: 1, marginTop: -80 }}
            source={require("../../assets/images/coach-bus-rental-800x600.jpg")}
            resizeMode="cover"
          >
            <BlurView
              intensity={80}
              tint="dark"
              style={{ flex: 1, justifyContent: "center", padding: 4 }}
            >
              <Heading color={"white"}>
                Achetez un ticket pour votre prochain voyage!
              </Heading>
              <Heading color="white" size="sm">
                Où voulez-vous aller ?
              </Heading>
            </BlurView>
          </ImageBackground>
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
                  value={searchDate}
                  onChange={(ev, date) => {
                    setSearchDate(date);
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
            <Button
              onPress={() => navigation?.navigate("TicketListScreen")}
              mt={4}
              rounded={"full"}
            >
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
