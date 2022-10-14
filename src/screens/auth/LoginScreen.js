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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  return (
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
          <FormControl isRequired>
            <FormControl.Label>Téléphone</FormControl.Label>
            <Input variant="rounded" p={2} placeholder="" />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Mot de passe</FormControl.Label>
            <Input
              variant="rounded"
              p={2}
              placeholder=""
              InputRightElement={
                <Pressable>
                  <Icon
                    as={<MaterialIcons size={26} name="visibility" />}
                    size={5}
                    color="muted.400"
                    mr={2}
                  />
                </Pressable>
              }
            />
          </FormControl>
          <Box>
            <Link alignSelf={"flex-end"} color="muted.400">
              Mot de passe oublié?
            </Link>
          </Box>
          <Button
            rounded={"full"}
            mt={4}
            onPress={() => navigation.navigate("HomeScreen")}
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
  );
};

export default LoginScreen;
