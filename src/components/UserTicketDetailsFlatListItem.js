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
  Pressable,
  Divider,
} from "native-base";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

const UserTicketDetailsFlatListItem = () => {
  return (
    <Box
      bg={"white"}
      borderRadius="lg"
      paddingLeft={4}
      paddingRight={4}
      paddingTop={5}
      paddingBottom={5}
      marginBottom={5}
    >
      <Box
        height={30}
        width={30}
        borderRadius="full"
        backgroundColor={"gray.100"}
        position={"absolute"}
        bottom={"35%"}
        left={-15}
      ></Box>
      <Box
        height={30}
        width={30}
        borderRadius="full"
        backgroundColor={"gray.100"}
        position={"absolute"}
        bottom={"35%"}
        right={-15}
      ></Box>
      <Divider
        borderStyle={"dashed"}
        borderWidth={1}
        position="absolute"
        bottom={"38%"}
        borderColor="gray.500"
        left={4}
      />
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
          <Stack>
            <Heading size="sm" numberOfLines={1}>
              Touristique Transport
            </Heading>
            <Text color={"muted.400"}>Agence</Text>
          </Stack>
        </HStack>
        <HStack space={4} justifyContent="space-between">
          <Stack>
            <Heading size="sm" numberOfLines={1}>
              Eric Ghislain AWONO
            </Heading>
            <Text color={"muted.400"}>Passager</Text>
          </Stack>
        </HStack>
        <HStack space={4} justifyContent="space-between">
          <Stack>
            <Heading size="sm" numberOfLines={1}>
              428-125-XXXX
            </Heading>
            <Text color={"muted.400"}>ID</Text>
          </Stack>
          <Badge
            _text={{
              fontSize: 16,
              letterSpacing: 2,
            }}
            colorScheme="primary"
            borderRadius={"full"}
          >
            36 350 FCFA
          </Badge>
        </HStack>

        <Stack space={4} justifyContent="center" alignItems={"center"} mt={4}>
          <QRCode value="428-125-XXXX" />
          <HStack justifyContent={"space-between"} mt={4} w={"100%"}>
            <Pressable>
              <Icon size={6} as={<Feather name="download" />} />
            </Pressable>
            <Pressable>
              <Icon size={6} as={<Feather name="info" />} />
            </Pressable>
          </HStack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserTicketDetailsFlatListItem;
