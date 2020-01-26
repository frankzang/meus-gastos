import React from "react";
import { useColorMode, FormLabel } from "@chakra-ui/core";
import { FormLabelProps } from "@chakra-ui/core/dist/FormLabel";

export const CustomFormLabel: React.FC<FormLabelProps> = props => {
  const { colorMode } = useColorMode();

  return (
    <FormLabel color={colorMode === "light" ? "gray.800" : "white"} {...props}>
      {props.children}
    </FormLabel>
  );
};
