import { useState } from "react";
import {
  Box,
  Heading,
  Stack,
  Icon,
  HStack,
  Divider,
  Button,
  FlatList,
  Input,
} from "native-base";
import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Modal, TouchableOpacity } from "react-native";

import * as citiesService from "../../services/citiesService";
const SearchCitiesModal = ({
  visible = false,
  setVisible = () => { },
  handleSelectCity = () => { },
  searchCityType = "",
}) => {
  const [cities, setCities] = useState();
  const [page, setPage] = useState(null);
  const [totalCities, setTotalCities] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchCities = () => {
    setLoading(true);
    citiesService.fetchCities().then(
      (response) => {
        setCities(response.data.data);
        setPage(response.data.page);
        setTotalCities(response.data.total);
      },
      (reason) => {}
    ).finally(() => setLoading(false));
  };

  const loadMoreCities = () => {
    if (page < totalCities) {
      setLoading(true);
      citiesService.fetchCities(page + 1).then(
        (response) => {
          setCities([...cities, ...response.data.data]);
          setPage(response.data.page);
          setTotalCities(response.data.total);
        },
        (reason) => {}
      ).finally(() => setLoading(false));
    }
  };

  return (
    <Modal
      visible={visible}
      onShow={() => {
        fetchCities();
      }}
      onRequestClose={() => {
        setVisible(false);
      }}
      animationType="slide"
    >
      <Box bg={"white"} p={4}>
        <HStack space={3}>
          <Button
            rounded={"full"}
            bg="#FFFF"
            shadow={3}
            onPress={() => setVisible(false)}
          >
            <Icon size={6} as={<MaterialCommunityIcons name="arrow-left" />} />
          </Button>
          <Input
            flex={1}
            rounded="full"
            placeholder="Rechercher une ville..."
          />
        </HStack>
      </Box>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, padding: 8 }}
        data={cities}
        keyExtractor={(item) => `${item.idcities}`}
        onEndReached={loadMoreCities}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={fetchCities}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleSelectCity(searchCityType, item);
              setVisible(false);
            }}
          >
            <HStack space={3} justifyContent="center" alignItems={"center"}>
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
                <Heading size={"sm"} numberOfLines={1}>
                  {`${item.libelle
                    ?.charAt(0)
                    ?.toUpperCase()}${item.libelle?.slice(1)}`}
                </Heading>
              </Stack>
              <Icon
                as={<MaterialCommunityIcons name="chevron-right" />}
                color="primary.900"
                size={6}
              />
            </HStack>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <Box h={3} mt={3}>
            <Divider />
          </Box>
        )}
      />
    </Modal>
  );
};

export default SearchCitiesModal;
