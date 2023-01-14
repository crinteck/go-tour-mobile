import React from "react";
import { Box, Button, Text } from "native-base";

const CompagnyFlatListItem = ({
  item,
  selectedCompany,
  onPress = () => {},
}) => {
  return (
    <Button
      bg={selectedCompany === item.idcompagnies ? "black" : "gray.100"}
      borderRadius={"full"}
      minW={20}
      marginX={1}
      onPress={() => onPress(item.idcompagnies)}
    >
      <Text color={selectedCompany === item.idcompagnies ? "white" : "black"}>
        {item?.denomination}
      </Text>
    </Button>
  );
};

export default CompagnyFlatListItem;
