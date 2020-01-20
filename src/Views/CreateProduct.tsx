import { Box, Flex, Heading } from "@chakra-ui/core";
import React from "react";
import { ProductForm } from "../Components/ProductForm";

export const CreateProduct: React.FC = () => {
  return (
    <>
      <Flex w="100%" flexDirection="column" padding="5">
        <Heading as="h2" size="md" marginBottom="8">
          Adicionar nova compra
        </Heading>
        <Box w="100%" maxW="500px">
          <ProductForm />
        </Box>
      </Flex>
    </>
  );
};
