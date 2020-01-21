import React from "react";
import { Box, Flex, Heading, Button } from "@chakra-ui/core";
import { useProductsActions } from "../Context/Products";

export const Configurations: React.FC = () => {
  const { eraseData } = useProductsActions();
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      w="100%"
      h="100%"
    >
      <Heading as="h1" fontSize="24px">
        Configurações
      </Heading>
      <Box w="100%" maxW="500" justifyContent="center" mt="32px">
        <Flex justifyContent="center" alignItems="center" flexDir="column">
          <Button onClick={() => eraseData()} size="lg" variantColor="red">
            Exluir compras salvas
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
