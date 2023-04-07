import { Fragment, useState, useRef } from "react";
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
  Badge,
  Toast,
  AlertDialog,
} from "native-base";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { Modal, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import { getHourFromDate } from "../../utils/commonHelper";
import currency from "currency.js";

import * as ticketsService from "../../services/ticketsService";
import { useNavigation } from "@react-navigation/native";

const ConfirmReservationModal = ({
  visible = false,
  setVisible = () => {},
  travel,
  ticket,
}) => {
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);

  const handleCreateTicket = () => {
    setLoading(true);
    ticketsService
      .createTicket(ticket)
      .then(
        (response) => {
          Toast.show({
            bg: "success.400",
            description: `Réservation enregistrée avec succès!`,
          });
          navigation.goBack();
        },
        (reason) => {
          setIsOpen(true);
          setRequestError(reason?.response?.data || reason?.message);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Modal
      visible={visible}
      onShow={() => {}}
      onRequestClose={() => {
        setVisible(false);
      }}
      animationType="slide"
    >
      <Fragment>
        <Box flex={1} background={"gray.100"}>
          <HStack space={3} style={{ backgroundColor: "teal" }} p={3} alignItems={"center"}>
            <Button
              rounded={"full"}
              bg="#FFFF"
              shadow={3}
              onPress={() => setVisible(false)}
            >
              <Icon
                size={4}
                as={<MaterialCommunityIcons name="arrow-left" />}
              />
            </Button>
            <Heading color="white" size={"sm"}>
              Confirmation de la réservation
            </Heading>
          </HStack>
          <Box flex={1} p={3}>
            <Box
              mt={3}
              bg={"white"}
              borderRadius="lg"
              paddingLeft={4}
              paddingRight={4}
              paddingTop={10}
              paddingBottom={10}
              marginBottom={5}
            >
              <Box
                height={30}
                width={30}
                borderRadius="full"
                backgroundColor={"gray.100"}
                position={"absolute"}
                top={-15}
                left={"50%"}
              ></Box>
              <Box
                height={30}
                width={30}
                borderRadius="full"
                backgroundColor={"gray.100"}
                position={"absolute"}
                bottom={-15}
                left={"50%"}
              ></Box>
              <Stack space={4}>
                <HStack
                  space={4}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <Heading size="sm">
                    {dayjs(travel?.startDate).format("ddd DD MMM YYYY")}
                  </Heading>
                  {/*  <Badge
                  _text={{
                    fontSize: 16,
                    letterSpacing: 2,
                  }}
                  colorScheme="primary"
                  borderRadius={"full"}
                >
                  Actif
                </Badge> */}
                </HStack>
                <HStack space={4} justifyContent="space-between">
                  <Stack maxW={"80%"}>
                    <Heading size="sm" numberOfLines={1}>
                      {`${travel?.travels_params?.routes.cities_routes_iddepartureTocities?.libelle
                        ?.charAt(0)
                        ?.toUpperCase()}${travel?.travels_params?.routes.cities_routes_iddepartureTocities?.libelle?.slice(
                        1
                      )}`}
                    </Heading>
                    <Text color={"muted.400"}>Départ</Text>
                  </Stack>
                  <Heading size="sm">
                    {getHourFromDate(travel?.startHour)}
                  </Heading>
                </HStack>
                <HStack space={4} justifyContent="space-between">
                  <Stack maxW={"80%"}>
                    <Heading size="sm" numberOfLines={1}>
                      {`${travel?.travels_params?.routes.cities_routes_idarrivalTocities?.libelle
                        ?.charAt(0)
                        ?.toUpperCase()}${travel?.travels_params?.routes.cities_routes_idarrivalTocities?.libelle?.slice(
                        1
                      )}`}
                    </Heading>
                    <Text color={"muted.400"}>Arrivée</Text>
                  </Stack>
                  <Heading size="sm">
                    {getHourFromDate(travel?.endHour)}
                  </Heading>
                </HStack>
                <HStack space={4} justifyContent="space-between">
                  <Stack maxW={"80%"}>
                    <Heading size="sm" numberOfLines={1}>
                      {`${travel?.travels_params?.agencies?.compagnies?.denomination
                        ?.charAt(0)
                        ?.toUpperCase()}${travel?.travels_params?.agencies?.compagnies?.denomination?.slice(
                        1
                      )}`}
                    </Heading>
                    <Text color={"muted.400"}>Compagnie</Text>
                  </Stack>
                  <Heading size="sm">
                    <Icon size={4} as={<Feather name="users" />} /> 1
                  </Heading>
                </HStack>
                <HStack space={4} justifyContent="space-between">
                  <Stack maxW={"80%"}>
                    <Heading size="sm" numberOfLines={1}>
                      {`${ticket?.first_name} ${ticket?.last_name}`}
                    </Heading>
                    <Text color={"muted.400"}>Passager</Text>
                  </Stack>
                </HStack>
                <HStack space={4} justifyContent="space-between">
                  <Stack maxW={"80%"}>
                    <Heading size="sm" numberOfLines={1}>
                      {ticket?.phone || "Non précisé"}
                    </Heading>
                    <Text color={"muted.400"}>Téléphone</Text>
                  </Stack>
                </HStack>
                <HStack space={4} justifyContent="space-between">
                  <Stack maxW={"80%"}>
                    <Heading size="sm" numberOfLines={1}>
                      {ticket?.email || "Non précisé"}
                    </Heading>
                    <Text color={"muted.400"}>E-mail</Text>
                  </Stack>
                </HStack>
                <HStack space={4} justifyContent="space-between">
                  <Stack>
                    <Heading size="sm" numberOfLines={1}>
                      Montant à payer
                    </Heading>
                    <Text color={"muted.400"}>En XOF</Text>
                  </Stack>
                  <Badge
                    _text={{
                      fontSize: 16,
                      letterSpacing: 2,
                    }}
                    colorScheme="primary"
                    borderRadius={"full"}
                  >
                    {currency(Number(travel?.travels_params.price)).format({
                      separator: " ",
                      precision: 0,
                      symbol: "",
                    })}
                  </Badge>
                </HStack>
                <Button
                  isLoading={loading}
                  mt={3}
                  onPress={handleCreateTicket}
                  rounded={"full"}
                >
                  Confirmer la réservation
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Erreur</AlertDialog.Header>
            <AlertDialog.Body>{requestError}</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Fermer
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Fragment>
    </Modal>
  );
};

export default ConfirmReservationModal;
