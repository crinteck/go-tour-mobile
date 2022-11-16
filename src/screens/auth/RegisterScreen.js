import { useState } from "react";
import {
  View,
  Text,
  Box,
  Center,
  Image,
  FormControl,
  Stack,
  Input,
  Link,
  Button,
  Pressable,
  Icon,
  Heading,
  Select,
  ScrollView,
  Toast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import * as authService from "../../services/auth";

const registerSchema = Yup.object().shape({
  gender: Yup.string().required(),
  phone: Yup.string().min(8).max(8).required(),
  email: Yup.string().email().required(),
  last_name: Yup.string().min(3).max(60).required(),
  first_name: Yup.string().min(3).max(60).required(),
  password: Yup.string().min(8).max(60).required(),
});

const RegisterScreen = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const formik = useFormik({
    initialValues: {
      gender: "",
      phone: "",
      email: "",
      last_name: "",
      first_name: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      authService
        .register(values)
        .then(
          (response) => {
            Toast.show({
              bg: "success.400",
              description: "Votre compte a été crée avec succès!",
            });
            navigation?.navigate("LoginScreen");
          },
          (reason) => {
            let statusCode = reason?.response?.status;
            if (statusCode) {
              return Toast.show({
                bg: "error.400",
                description: `${
                  reason?.response?.data
                    ? reason?.response?.data
                    : reason.message
                }`,
              });
            }
            Toast.show({
              bg: "error.400",
              description: "Réseau indisponible!",
            });
          }
        )
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = formik;
  return (
    <FormikProvider value={formik}>
      <ScrollView
        safeArea
        flexGrow={1}
        bg="white"
        p={4}
        contentContainerStyle={{
          paddingTop: 50,
          paddingBottom: 50,
          justifyContent: "center",
        }}
      >
        <Center>
          <Box w={"100%"} marginBottom={8}>
            <Heading>Inscription</Heading>
            <Heading fontSize={"md"} color={"muted.500"}>
              Des milliers de voyageurs nous font confiance!
            </Heading>
          </Box>
          <Stack space={2} w="100%">
            <FormControl isRequired isInvalid={"gender" in errors}>
              <FormControl.Label>Vous êtes</FormControl.Label>
              <Select
                onValueChange={handleChange("gender")}
                variant="rounded"
                placeholder="Vous êtes ?"
              >
                <Select.Item label="Femme" value="FEMME" />
                <Select.Item label="Homme" value="HOMME" />
                <Select.Item label="Autre" value="AUTRE" />
              </Select>
              <FormControl.ErrorMessage>
                {errors.gender}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"phone" in errors}>
              <FormControl.Label>Téléphone</FormControl.Label>
              <Input
                value={values.phone}
                onChangeText={handleChange("phone")}
                variant="rounded"
                p={2}
                placeholder="ex: 72611214"
                keyboardType="phone-pad"
              />
              <FormControl.ErrorMessage>
                {errors.phone}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"email" in errors}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={values.email}
                onChangeText={handleChange("email")}
                variant="rounded"
                p={2}
                placeholder="ex: mmm@gmail.com"
                keyboardType="email-address"
              />
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"last_name" in errors}>
              <FormControl.Label>Nom</FormControl.Label>
              <Input
                value={values.last_name}
                onChangeText={handleChange("last_name")}
                variant="rounded"
                p={2}
                placeholder="Bah"
              />
              <FormControl.ErrorMessage>
                {errors.last_name}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"first_name" in errors}>
              <FormControl.Label>Prénom</FormControl.Label>
              <Input
                value={values.first_name}
                onChangeText={handleChange("first_name")}
                variant="rounded"
                p={2}
                placeholder="Ousmane"
              />
              <FormControl.ErrorMessage>
                {errors.first_name}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"password" in errors}>
              <FormControl.Label>Mot de passe</FormControl.Label>
              <Input
                value={values.password}
                onChangeText={handleChange("password")}
                secureTextEntry={secureTextEntry}
                variant="rounded"
                p={2}
                placeholder=""
                InputRightElement={
                  <Pressable
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                  >
                    <Icon
                      as={
                        <MaterialIcons
                          size={26}
                          name={
                            secureTextEntry ? "visibility" : "visibility-off"
                          }
                        />
                      }
                      size={5}
                      color="muted.400"
                      mr={2}
                    />
                  </Pressable>
                }
              />
              <FormControl.ErrorMessage>
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              isLoading={isSubmitting}
              onPress={handleSubmit}
              rounded={"full"}
              mt={4}
            >
              S'inscrire
            </Button>

            <Button
              rounded={"full"}
              variant={"outline"}
              mt="10"
              onPress={() => navigation?.navigate("LoginScreen")}
            >
              Se connecter
            </Button>
          </Stack>
        </Center>
      </ScrollView>
    </FormikProvider>
  );
};

export default RegisterScreen;
