import { useLayoutEffect, useRef } from "react";
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
} from "native-base";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";

const SearchScreen = ({ navigation }) => {
  const selectRef = useRef();
  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });

    return () => {};
  }, []);
  return (
    <Box  bgColor="white" flex={1} justifyContent="center">
    <StatusBar style="light"/>
      <Box h={"50%"} safeArea>
        <ImageBackground
          style={{ flex: 1, marginTop: -80 }}
          source={require("../../assets/images/coach-bus-rental-800x600.jpg")}
          resizeMode="cover"
        >
          <BlurView
            intensity={80}
            tint="dark"
            style={{ flex: 1, justifyContent: "center", padding: 4 }}
          >
            <Heading color={"white"}>Achetez un ticket pour votre prochain voyage!</Heading>
            <Heading color="white" size="sm">
              Où voulez-vous aller ?
            </Heading>
          </BlurView>
        </ImageBackground>
      </Box>
      <Box
        bgColor={"white"}
        borderTopLeftRadius={25}
        borderTopRadius={25}
        mt={-50}
        p={4}
        justifyContent="center"
      >
        <Stack space={4}>
          <HStack space={3}>
            <Box
              h={45}
              w={45}
              bg={"gray.100"}
              borderRadius={8}
              justifyContent="center"
              alignItems={"center"}
            >
              <Icon
                as={<MaterialCommunityIcons name="bus" />}
                color="primary.900"
                size={6}
              />
            </Box>
            <Pressable>
              <Stack flex={1}>
                <Text color={"muted.400"}>DEPART</Text>
                <Heading size={"sm"} numberOfLines={1}>
                  Bamako,Bamako
                </Heading>
              </Stack>
            </Pressable>
          </HStack>
          <Divider />
          <HStack space={3}>
            <Box
              h={45}
              w={45}
              bg={"gray.100"}
              borderRadius={8}
              justifyContent="center"
              alignItems={"center"}
            >
              <Icon
                as={<MaterialCommunityIcons name="bus-stop" />}
                color="primary.900"
                size={6}
              />
            </Box>
            <Pressable>
              <Stack flex={1}>
                <Text color={"muted.400"}>ARRIVEE</Text>
                <Heading size={"sm"} numberOfLines={1}>
                  Kayes,Kayes
                </Heading>
              </Stack>
            </Pressable>
          </HStack>
          <Divider />
          <HStack space={3}>
            <Box
              h={45}
              w={45}
              bg={"gray.100"}
              borderRadius={8}
              justifyContent="center"
              alignItems={"center"}
            >
              <Icon
                as={<FontAwesome name="calendar" />}
                color="primary.900"
                size={6}
              />
            </Box>
            <Pressable>
              <Stack flex={1}>
                <Text color={"muted.400"}>DATE</Text>
                <Heading size={"sm"} numberOfLines={1}>
                  Kaye,Kaye
                </Heading>
              </Stack>
            </Pressable>
          </HStack>
          <Divider />
          <Button
            onPress={() => navigation?.navigate("TicketListScreen")}
            mt={4}
            rounded={"full"}
          >
            Rechercher
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchScreen;
