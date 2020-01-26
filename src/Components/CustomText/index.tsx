import React from "react";
import { Text, useColorMode, BoxProps } from "@chakra-ui/core";

export const CustomText: React.FC<BoxProps> = props => {
  const { colorMode } = useColorMode();

  return (
    <Text color={colorMode === "light" ? "gray.800" : "white"} {...props}>
      {props.children}
    </Text>
  );
};
