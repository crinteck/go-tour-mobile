import { Fragment, useState } from "react";
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
  ScrollView,
  StatusBar,
  FlatList,
  Input,
} from "native-base";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Modal, TouchableOpacity } from "react-native";

import * as citiesService from "../../services/citiesService";
const SearchCitiesModal = ({
  visible = false,
  setVisible = () => {},
  handleSelectCity = () => {},
  searchCityType = "",
}) => {
  const [cities, setCities] = useState();
  const fetchCities = () => {
    citiesService.fetchCities().then(
      (response) => {
        setCities(response.data);
      },
      (reason) => console.log(reason?.response?.data)
    );
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
