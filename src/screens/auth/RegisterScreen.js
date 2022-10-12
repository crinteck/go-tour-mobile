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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  return (
    <Box safeArea flex={1} bg="white" p={4} justifyContent="center">
      <Center>
        <Box w={"100%"} marginBottom={8}>
          <Heading>Inscription</Heading>
          <Heading fontSize={"md"} color={"muted.500"}>
            Des milliers de voyageurs nous font confiance!
          </Heading>
        </Box>
        <Stack space={2} w="100%">
          <FormControl isRequired>
            <FormControl.Label>Téléphone</FormControl.Label>
            <Input variant="rounded" p={2} placeholder="ex: 72611214" />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Nom</FormControl.Label>
            <Input variant="rounded" p={2} placeholder="Bah" />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Prénom</FormControl.Label>
            <Input variant="rounded" p={2} placeholder="Ousmane" />
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

          <Button rounded={"full"} mt={4}>
            S'inscrire
          </Button>

          <Button
            rounded={"full"}
            variant={"outline"}
            mt="10"
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Se connecter
          </Button>
        </Stack>
      </Center>
    </Box>
  );
};

export default RegisterScreen;
