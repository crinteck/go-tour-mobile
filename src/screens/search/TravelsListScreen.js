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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState();
  const [loading, setLoading] = useState(false);

  const fetchTravels = () => {
    setLoading(true);
    travelsService
      .findAll(
        {
          arrival: arrival?.idcities,
          departure: departure?.idcities,
          startDate: searchDate.format(
            "YYYY-MM-DD"),
          company: selectedCompany || null,
        }
      )
      .then(
        (response) => {
          setTravels(response?.data.travels);
          setTotalPages(response?.data.totalPages);
          setCurrentPage(response?.data.currentPage);
        },
        (reason) => {
        }
      ).finally(() => setLoading(false));
  };
  const fetchCompagnies = () => {
    compagniesService.findAll({ limit: -1 }).then(
      (response) => {
        let data = response.data.data;

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


  useEffect(() => {
    fetchTravels();
    return () => { };
  }, [selectedCompany]);
  useEffect(() => {
    fetchCompagnies();

    return () => { };
  }, []);
  const _renderItem = ({ item }) => <TravelsFlatListItem item={item} />;

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });
    return () => { };
  }, []);

  const handleCompanyItem = (idcompanies) => {
    setSelectedCompany(idcompanies);
  };

  //load more data
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      travelsService
        .findAll(
          {
            arrival: arrival?.idcities,
            departure: departure?.idcities,
            startDate: searchDate.format("YYYY-MM-DD"),
            company: selectedCompany || null,
            page: currentPage + 1,
          }
        )
        .then(
          (response) => {
            setTravels([...travels, ...response?.data.travels]);
            setTotalPages(response?.data.totalPages);
            setCurrentPage(response?.data.currentPage);
          },
          (reason) => {
          }
        );
    }
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="teal" style="light" />
      <Box safeArea style={{ backgroundColor: "teal" }} pt={2} shadow={3}>
        <VStack space={2}>
          <HStack>
            <Button
              ml={3}
              rounded={"full"}
              bg="#FFFF"
              shadow={3}
              onPress={() => navigation?.goBack()}
            >
              <Icon
                size={4}
                as={<MaterialCommunityIcons name="arrow-left" />}
              />
            </Button>
            <VStack flex={1} mr={3} pr={3}>
              <Heading textAlign={"center"} color={"white"} numberOfLines={1} size={"sm"}>
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
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 5, paddingHorizontal: 8 }}
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
        pt={2}
        keyExtractor={(item) => item.uuid}
        data={travels}
        renderItem={_renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={fetchTravels}
        ListFooterComponent={() => {
          return (
            <VStack space={2} alignItems={"center"} mt={5}>
              {loading && (
                <Text color={"gray.400"}>Chargement des données...</Text>
              )}
            </VStack>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <VStack space={2} alignItems={"center"} mt={5}>
              <Text color={"gray.400"}>Aucun résultat</Text>
            </VStack>
          );
        }}


      />
    </Fragment>
  );
};

export default TravelsListScreen;
