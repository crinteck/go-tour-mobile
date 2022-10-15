import { useLayoutEffect } from "react";
import {
  Box,
  Text,
  Image,
  Center,
  Heading,
  Stack,
  Button,
  Icon,
  VStack,
  HStack,
  ScrollView
} from "native-base";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import defaultUserImage from "../../assets/images/default-user.png";

const UserMenuScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });

    return () => {};
  }, []);

  return (
    <ScrollView safeArea bg="white" flexGrow={1} padding={4}>
      <Box mt={10}>
        <Center>
          <Stack space={4} alignItems={"center"}>
            <Box>
              <Image
                alt="User Image"
                source={defaultUserImage}
                height={125}
                width={125}
                borderWidth={2}
                borderColor="primary.700"
                borderRadius={"full"}
              />
              <Button
                rounded={"full"}
                h={10}
                background="white"
                w={10}
                shadow={3}
                position={"absolute"}
                right={0}
                bottom={-1}
                zIndex={2}
                onPress={() => alert("select Photo")}
              >
                <Icon
                  size={6}
                  as={<Ionicons name="camera" />}
                  color={"primary.700"}
                />
              </Button>
            </Box>
            <Stack alignItems={"center"}>
              <Heading size={"md"}>Eric Ghislain AWONO</Heading>
              <Heading size={"sm"} color="muted.400">
                72611214
              </Heading>
            </Stack>
          </Stack>
        </Center>
      </Box>

      <Box mt={10}>
        <Stack space={4}>
          <TouchableOpacity>
            <HStack space={4} alignItems="center">
              <Box
               shadow={2}
                h={10}
                w={10}
                backgroundColor={"gray.100"}
                borderRadius={8}
                justifyContent="center"
                alignItems={"center"}
              >
                <Icon
                  size={6}
                  color={"primary.700"}
                  as={<Ionicons name="person" />}
                />
              </Box>
              <Text flex={1} fontWeight={"bold"}>
                Données personnelles
              </Text>
              <Icon
                size={6}
                color={"muted.400"}
                as={<Ionicons name="chevron-forward" />}
              />
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity>
            <HStack space={4} alignItems="center">
              <Box
               shadow={2}
                h={10}
                w={10}
                backgroundColor={"gray.100"}
                borderRadius={8}
                justifyContent="center"
                alignItems={"center"}
              >
                <Icon
                  size={6}
                  color={"primary.700"}
                  as={<Ionicons name="settings" />}
                />
              </Box>
              <Text flex={1} fontWeight={"bold"}>
                Configurations
              </Text>
              <Icon
                size={6}
                color={"muted.400"}
                as={<Ionicons name="chevron-forward" />}
              />
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity>
            <HStack space={4} alignItems="center">
              <Box
               shadow={2}
                h={10}
                w={10}
                backgroundColor={"gray.100"}
                borderRadius={8}
                justifyContent="center"
                alignItems={"center"}
              >
                <Icon
                  size={6}
                  color={"primary.700"}
                  as={<Ionicons name="lock-closed" />}
                />
              </Box>
              <Text flex={1} fontWeight={"bold"}>
                Changer de mot de passe
              </Text>
              <Icon
                size={6}
                color={"muted.400"}
                as={<Ionicons name="chevron-forward" />}
              />
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity>
            <HStack space={4} alignItems="center">
              <Box
               shadow={2}
                h={10}
                w={10}
                backgroundColor={"gray.100"}
                borderRadius={8}
                justifyContent="center"
                alignItems={"center"}
              >
                <Icon
                  size={6}
                  color={"primary.700"}
                  as={<Ionicons name="information-circle" />}
                />
              </Box>
              <Text flex={1} fontWeight={"bold"}>
                A propos
              </Text>
              <Icon
                size={6}
                color={"muted.400"}
                as={<Ionicons name="chevron-forward" />}
              />
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity>
            <HStack space={4} alignItems="center">
              <Box
              shadow={2}
                h={10}
                w={10}
                backgroundColor={"gray.100"}
                borderRadius={8}
                justifyContent="center"
                alignItems={"center"}
              >
                <Icon
                  size={6}
                  color={"primary.700"}
                  as={<Octicons name="sign-out" />}
                />
              </Box>
              <Text flex={1} fontWeight={"bold"}>
                Déconnexion
              </Text>
              <Icon
                size={6}
                color={"muted.400"}
                as={<Ionicons name="chevron-forward" />}
              />
            </HStack>
          </TouchableOpacity>
        </Stack>
      </Box>
    </ScrollView>
  );
};

export default UserMenuScreen;
