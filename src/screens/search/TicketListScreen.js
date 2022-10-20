import { Fragment, useLayoutEffect, useRef } from "react";
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
  ScrollView,
  StatusBar,
} from "native-base";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { BlurView } from "expo-blur";
import TicketListFlatListItem from "../../components/TicketListFlatListItem";

const TicketListScreen = ({ navigation }) => {
  const selectRef = useRef();
  useLayoutEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });

    return () => {};
  }, []);
  return (
    <Fragment>
      <StatusBar />
      <Box safeArea bg={"white"} p={4} shadow={3}>
        <HStack>
          <Pressable onPress={() => navigation?.goBack()}>
            <Icon size={6} as={<MaterialCommunityIcons name="arrow-left" />} />
          </Pressable>
          <Text flex={1} textAlign="center">
            Voyages disponibles
          </Text>
        </HStack>
      </Box>
      <ScrollView flexGrow={1} safeArea flex={1} p={4}>
        <TicketListFlatListItem />
        <TicketListFlatListItem />
        <TicketListFlatListItem />
        <TicketListFlatListItem />
        <TicketListFlatListItem />
      </ScrollView>
    </Fragment>
  );
};

export default TicketListScreen;
