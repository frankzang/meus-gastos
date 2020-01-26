import React from "react";
import { Input, useColorMode, InputProps } from "@chakra-ui/core";

export const CustomInput: React.FC<InputProps> = props => {
  const { colorMode } = useColorMode();

  return (
    <Input color={colorMode === "light" ? "gray.800" : "white"} {...props} />
  );
};
