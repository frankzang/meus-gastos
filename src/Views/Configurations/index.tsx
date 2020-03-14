import React from "react";
import { Box, Flex, Heading, Button, useColorMode } from "@chakra-ui/core";
import { useProductsEvents } from "../../Context/Products";
import { ColorModeButton } from "../../Components/ColorModeButton";

export const Configurations: React.FC = () => {
  const send = useProductsEvents();
  const { colorMode } = useColorMode();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      w="100%"
      h="100%"
    >
      <Heading
        as="h1"
        color={colorMode === "light" ? "gray.800" : "white"}
        fontSize="24px"
      >
        Configurações
      </Heading>
      <Box w="100%" maxW="500" justifyContent="center" mt="32px">
        <Flex justifyContent="center" alignItems="center" flexDir="column">
          <ColorModeButton />
          <Button
            onClick={() =>
              send({
                type: "ERASE",
              })
            }
            size="lg"
            variantColor="red"
          >
            Exluir compras salvas
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
