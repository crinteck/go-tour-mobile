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

const TravelsListScreen = ({ navigation }) => {
  const [travels, setTravels] = useState();
  const [compagnies, setCompagnies] = useState();
  const fetchTravels = () => {
    travelsService.findAll().then(
      (response) => {
        setTravels(response?.data);
      },
      (reason) => {
        console.log(reason?.response?.data);
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
          idcompagnies: null,
        });
        setCompagnies(data);
        console.log(response?.data);
      },
      (reason) => {
        console.log(reason?.response?.data);
      }
    );
  };

  const _renderItem = ({ item }) => <TravelsFlatListItem item={item} />;

  useEffect(() => {
    fetchTravels();
    fetchCompagnies();

    return () => {};
  }, []);

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });

    return () => {};
  }, []);
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
                Kaye - Bamako
              </Heading>
              <Text textAlign={"center"} color="gray.400">
                Lun,12 Mars 2023
              </Text>
            </VStack>
          </HStack>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            horizontal
            data={compagnies}
            keyExtractor={(item) => item.uuid}
            renderItem={({ item, index }) => (
              <CompagnyFlatListItem item={item} />
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
