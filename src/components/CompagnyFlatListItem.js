import React from "react";
import { Box, Button, Text } from "native-base";

const CompagnyFlatListItem = ({ item, onPress = () => {} }) => {
  return (
    <Button bg={"gray.100"}  borderRadius={"full"} minW={20} marginX={1}>
      <Text>{item?.denomination}</Text>
    </Button>
  );
};

export default CompagnyFlatListItem;
