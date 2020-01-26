import React from "react";
import { Heading, useColorMode, HeadingProps } from "@chakra-ui/core";

export const CustomHeading: React.FC<HeadingProps> = props => {
  const { colorMode } = useColorMode();

  return (
    <Heading color={colorMode === "light" ? "gray.800" : "white"} {...props}>
      {props.children}
    </Heading>
  );
};
