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
  FormControl,
  Divider,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  arrivalState,
  departureState,
  startDateState,
  formattedStartDateState,
  selectedBookingTravelState,
} from "../../atoms/globalState";
import { useRecoilState, useRecoilValue } from "recoil";
import ConfirmReservationModal from "../../components/Modals/ConfirmReservationModal";
import { getHourFromDate } from "../../utils/commonHelper";
import { FormikProvider, useFormik } from "formik";

import * as yup from "yup";
import { authState } from "../../atoms/authState";

const validationSchema = yup.object().shape({
  is_owner: yup.number().max(1).min(0).required(),
  first_name: yup.string().required().trim(),
  last_name: yup.string().required().trim(),
  phone: yup.string().min(8).max(12).notRequired().trim(),
  email: yup.string().email().notRequired().trim().lowercase(),
  idtravels: yup.number().required(),
});
const TravelReservation = ({ navigation }) => {
  const [arrival, setArrival] = useRecoilState(arrivalState);
  const [departure, setDeparture] = useRecoilState(departureState);
  const formattedStartDate = useRecoilValue(formattedStartDateState);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedTravel, setSelectedTravel] = useRecoilState(
    selectedBookingTravelState
  );
  const authValue = useRecoilValue(authState);

  const formik = useFormik({
    initialValues: {
      is_owner: 0,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      idtravels: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setConfirmModalVisible(true);
    },
  });

  const {
    values,
    handleChange,
    errors,
    setFieldValue,
    handleSubmit,
    handleReset,
  } = formik;
  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });
    return () => {};
  }, []);

  useEffect(() => {
    setFieldValue("idtravels", selectedTravel?.idtravels);

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
        </VStack>
      </Box>
      <ScrollView
        bg="white"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
          paddingTop: 10,
          padding: 8,
        }}
      >
        <FormikProvider value={formik}>
          <VStack bg="white" p={3} borderRadius={5} shadow={3} mb={4}>
            <VStack>
              <Heading size={"sm"} color="muted.400">
                Compagnie
              </Heading>
              <Text textAlign={"right"} fontWeight="bold">
                {`${selectedTravel?.travels_params?.agencies?.compagnies?.denomination
                  ?.charAt(0)
                  ?.toUpperCase()}${selectedTravel?.travels_params?.agencies?.compagnies?.denomination?.slice(
                  1
                )}`}
              </Text>
            </VStack>
            <Divider mb={1} mt={1} />
            <VStack>
              <Heading size={"sm"} color="muted.400">
                Heure de départ
              </Heading>
              <Text textAlign={"right"} fontWeight="bold">
                {getHourFromDate(selectedTravel?.startHour)}
              </Text>
            </VStack>
          </VStack>
          <VStack space={2}>
            <Heading size={"sm"}>Pour qui voulez-vous réserver?</Heading>
            <HStack space={2}>
              <Button
                borderRadius={"full"}
                onPress={() => {
                  setFieldValue("is_owner", 1);
                  setFieldValue("last_name", authValue?.user?.last_name);
                  setFieldValue("phone", authValue?.user?.phone);
                  setFieldValue("first_name", authValue?.user?.first_name);
                  setFieldValue("email", authValue?.user?.email);
                }}
                colorScheme="teal"
                bg={values.is_owner === 1 ? "black" : "#0e98b4"}
                _text={{
                  color: "white",
                }}
              >
                Moi même
              </Button>
              <Button
                borderRadius={"full"}
                onPress={() => {
                  setFieldValue("is_owner", 0);
                  setFieldValue("last_name", "");
                  setFieldValue("phone", "");
                  setFieldValue("first_name", "");
                  setFieldValue("email", "");
                }}
                bg={values.is_owner === 0 ? "black" : "#0e98b4"}
                _text={{
                  color: "white",
                }}
              >
                Tiers personne
              </Button>
            </HStack>
          </VStack>
          <VStack space={2} mt={2}>
            <FormControl
              isRequired
              isInvalid={"first_name" in errors}
              isReadOnly={values.is_owner === 1}
            >
              <FormControl.Label>Prénom</FormControl.Label>
              <Input
                borderRadius={"full"}
                value={values.first_name}
                onChangeText={(text) => setFieldValue("first_name", text)}
              />
              <FormControl.ErrorMessage>
                {errors.first_name}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={"last_name" in errors}
              isReadOnly={values.is_owner === 1}
            >
              <FormControl.Label>Nom</FormControl.Label>
              <Input
                borderRadius={"full"}
                value={values.last_name}
                onChangeText={(text) => setFieldValue("last_name", text)}
              />
              <FormControl.ErrorMessage>
                {errors.last_name}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={"phone" in errors}
              isReadOnly={values.is_owner === 1}
            >
              <FormControl.Label>Téléphone</FormControl.Label>
              <Input
                borderRadius={"full"}
                keyboardType="phone-pad"
                value={values.phone}
                onChangeText={(text) => setFieldValue("phone", text)}
              />
              <FormControl.ErrorMessage>
                {errors.phone}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={"email" in errors}
              isReadOnly={values.is_owner === 1}
            >
              <FormControl.Label>Email</FormControl.Label>
              <Input
                borderRadius={"full"}
                value={values.email}
                onChangeText={(text) => setFieldValue("email", text)}
                keyboardType="email-address"
              />
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button rounded={"full"} mt={2} onPress={handleSubmit}>
              Continuer
            </Button>
          </VStack>
        </FormikProvider>
      </ScrollView>
      <ConfirmReservationModal
        setVisible={setConfirmModalVisible}
        visible={confirmModalVisible}
        travel={selectedTravel}
        ticket={values}
      />
    </Fragment>
  );
};

export default TravelReservation;
