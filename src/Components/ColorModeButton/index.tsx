import React from "react";
import { useColorMode, Button } from "@chakra-ui/core";

export const ColorModeButton: React.FC = props => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  );
};
