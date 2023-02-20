import { Fragment, useLayoutEffect, useEffect, useState } from "react";
import {
  Box,
  Icon,
  HStack,
  Button,
  ScrollView,
  StatusBar,
  Input,
  FlatList,
  VStack,
  Heading,
  Text,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TravelsFlatListItem from "../../components/TravelsFlatListItem";
import * as travelsService from "../../services/travelsService";
import * as compagniesService from "../../services/compagniesService";
import CompagnyFlatListItem from "../../components/CompagnyFlatListItem";
import {
  arrivalState,
  departureState,
  startDateState,
  formattedStartDateState,
} from "../../atoms/globalState";
import { useRecoilState, useRecoilValue } from "recoil";

const TravelsListScreen = ({ navigation }) => {
  const [travels, setTravels] = useState();
  const [compagnies, setCompagnies] = useState();

  const [arrival, setArrival] = useRecoilState(arrivalState);
  const [departure, setDeparture] = useRecoilState(departureState);
  const [searchDate, setSearchDate] = useRecoilState(startDateState);
  const formattedStartDate = useRecoilValue(formattedStartDateState);

  const [selectedCompany, setSelectedCompany] = useState();

  const fetchTravels = () => {
    travelsService
      .findAll(
        `arrival=${arrival?.idcities}&departure=${
          departure?.idcities
        }&startDate=${searchDate.format(
          "YYYY-MM-DD"
        )}&company=${selectedCompany}`
      )
      .then(
        (response) => {
          setTravels(response?.data);
        },
        (reason) => {
        }
      );
  };
  const fetchCompagnies = () => {
    compagniesService.findAll().then(
      (response) => {
        let data = response.data;

        data.unshift({
          uuid: "display-all-items",
          denomination: "Toutes",
          idcompagnies: undefined,
        });
        setCompagnies(data);
      },
      (reason) => {
      }
    );
  };

  const _renderItem = ({ item }) => <TravelsFlatListItem item={item} />;

  useEffect(() => {
    fetchTravels();
    return () => {};
  }, [selectedCompany]);
  useEffect(() => {
    fetchCompagnies();

    return () => {};
  }, []);

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });
    return () => {};
  }, []);

  const handleCompanyItem = (idcompanies) => {
    setSelectedCompany(idcompanies);
  };
  return (
    <Fragment>
      <StatusBar barStyle={"dark-content"} />
      <Box safeArea bg={"white"} p={3} pt={1} shadow={3}>
        <VStack space={2}>
          <HStack>
            <Button
              rounded={"full"}
              bg="#FFFF"
              shadow={3}
              onPress={() => navigation?.goBack()}
            >
              <Icon
                size={6}
                as={<MaterialCommunityIcons name="arrow-left" />}
              />
            </Button>
            <VStack flex={1}>
              <Heading textAlign={"center"} numberOfLines={1} size={"sm"}>
                {`${departure?.libelle
                  ?.charAt(0)
                  .toUpperCase()}${departure?.libelle?.slice(1)}`}{" "}
                -
                {` ${arrival?.libelle
                  ?.charAt(0)
                  .toUpperCase()}${arrival?.libelle?.slice(1)}`}
              </Heading>
              <Text textAlign={"center"} color="gray.400">
                {formattedStartDate}
              </Text>
            </VStack>
          </HStack>
          <FlatList
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 5 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={compagnies}
            keyExtractor={(item) => item.uuid}
            renderItem={({ item, index }) => (
              <CompagnyFlatListItem
                item={item}
                selectedCompany={selectedCompany}
                onPress={handleCompanyItem}
              />
            )}
          />
        </VStack>
      </Box>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, padding: 8 }}
        keyExtractor={(item) => item.uuid}
        data={travels}
        renderItem={_renderItem}
      />
    </Fragment>
  );
};

export default TravelsListScreen;
