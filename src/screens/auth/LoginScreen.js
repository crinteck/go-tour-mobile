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
  Toast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { useFormik, FormikProvider } from "formik";
import { useState } from "react";
import * as authService from "../../services/auth";
import { authState } from "../../atoms/authState";
import { useRecoilState } from "recoil";
import * as authHelper from "../../utils/authHelper";

const loginSchema = Yup.object().shape({
  login: Yup.string().min(8).required(),
  password: Yup.string().min(8).max(64).required(),
});

const LoginScreen = ({ navigation }) => {
  const [authValue, setAuthValue] = useRecoilState(authState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const formik = useFormik({
    initialValues: {
      login: "admin@gmail.com",
      password: "password",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      authService
        .login(values)
        .then(
          (response) => {
            authHelper.storeUser(response?.data).then(() => {
              setAuthValue(response?.data);
            });
          },
          (reason) => {
            Toast.show({
              bg: "error.400",
              description: `${reason?.response?.data || reason?.message}`,
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
    handleChange,
    handleSubmit,
    values,
    setSubmitting,
    isSubmitting,
  } = formik;
  return (
    <FormikProvider value={formik}>
      <Box safeArea flex={1} bg="white" p={4} justifyContent="center">
        <Center>
          <Image
            source={require("../../assets/images/logo_type_login_redim.png")}
            alt="App logo"
            h={"100"}
            w={"150"}
            resizeMode="contain"
          />
          <Text
            color={"orange.500"}
            marginBottom={10}
            fontWeight="bold"
            fontStyle={"italic"}
          >
            Voyager devient un plaisir!
          </Text>
          <Stack space={2} w="100%">
            <FormControl isRequired isInvalid={"login" in errors}>
              <FormControl.Label>E-mail</FormControl.Label>
              <Input
                fontSize={16}
                onChangeText={handleChange("login")}
                value={values.login}
                variant="rounded"
                p={2}
                placeholder=""
              />
              <FormControl.ErrorMessage>
                {errors.login}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"password" in errors}>
              <FormControl.Label>Mot de passe</FormControl.Label>
              <Input
                fontSize={16}
                variant="rounded"
                keyboardType="default"
                value={values.password}
                onChangeText={handleChange("password")}
                p={2}
                placeholder=""
                secureTextEntry={secureTextEntry}
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
            <Box>
              <Link alignSelf={"flex-end"} color="muted.400">
                Mot de passe oublié?
              </Link>
            </Box>
            <Button
              isLoading={isSubmitting}
              rounded={"full"}
              mt={4}
              onPress={handleSubmit}
            >
              Se connecter
            </Button>

            <Button
              rounded={"full"}
              variant={"outline"}
              mt="10"
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              S'inscrire
            </Button>
          </Stack>
        </Center>
      </Box>
    </FormikProvider>
  );
};

export default LoginScreen;
