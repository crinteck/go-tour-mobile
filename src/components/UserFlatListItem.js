import React from "react";
import {
  View,
  Text,
  Box,
  VStack,
  Heading,
  Badge,
  HStack,
  Stack,
  Button,
  Icon,
} from "native-base";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const UserFlatListItem = () => {
  return (
    <Box
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
        <HStack space={4} justifyContent="space-between" alignItems={"center"}>
          <Heading size="sm">June 16,2022</Heading>
          <Badge
            _text={{
              fontSize: 16,
              letterSpacing: 2,
            }}
            colorScheme="primary"
            borderRadius={"full"}
          >
            Actif
          </Badge>
        </HStack>
        <HStack space={4} justifyContent="space-between">
          <Stack maxW={"80%"}>
            <Heading size="sm" numberOfLines={1}>
              Bamako
            </Heading>
            <Text color={"muted.400"}>Départ</Text>
          </Stack>
          <Heading size="sm">16:20</Heading>
        </HStack>
        <HStack space={4} justifyContent="space-between">
          <Stack maxW={"80%"}>
            <Heading size="sm" numberOfLines={1}>
              Bamako
            </Heading>
            <Text color={"muted.400"}>Arrivée</Text>
          </Stack>
          <Heading size="sm">23:20</Heading>
        </HStack>
        <HStack space={4} justifyContent="space-between">
          <Stack maxW={"80%"}>
            <Heading size="sm" numberOfLines={1}>
              Touristique Transport
            </Heading>
            <Text color={"muted.400"}>Agence</Text>
          </Stack>
          <Heading size="sm">
            <Icon size={4} as={<Feather name="users" />} /> 1
          </Heading>
        </HStack>
        <Button rounded={"full"}>Détails du ticket</Button>
      </Stack>
    </Box>
  );
};

export default UserFlatListItem;
