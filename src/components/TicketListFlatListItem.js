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
  Link,
} from "native-base";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

const TicketListFlatListItem = () => {
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
        bottom={"20%"}
        left={-15}
      ></Box>
      <Box
        height={30}
        width={30}
        borderRadius="full"
        backgroundColor={"gray.100"}
        position={"absolute"}
        bottom={"20%"}
        right={-15}
      ></Box>
      <Divider
        borderStyle={"dashed"}
        borderWidth={1}
        position="absolute"
        bottom={"26%"}
        borderColor="muted.400"
        left={4}
      />
      <Stack space={4}>
        <HStack space={4} justifyContent="space-between">
          <Stack maxW={"80%"}>
            <Heading size="sm" numberOfLines={1}>
              Bamako
            </Heading>
            <Text color={"muted.400"}>11-10-2022</Text>
          </Stack>
          <Heading size="sm">16:20</Heading>
        </HStack>
        <HStack space={4} justifyContent="space-between">
          <Stack maxW={"80%"}>
            <Heading size="sm" numberOfLines={1}>
              Kayes
            </Heading>
            <Text color={"muted.400"}>12-10-2022</Text>
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

        <Stack space={4} justifyContent="center" alignItems={"center"} mt={4}>
          <Link isUnderlined={false} color={"muted.400"}>
            Achetez maintenant à{" "}
            <Text fontWeight={"bold"} color="black">
              6 500 FCFA
            </Text>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TicketListFlatListItem;
