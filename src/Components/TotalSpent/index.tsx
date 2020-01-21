import React from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/core";
import { useProducts } from "../../Context/Products";

export const TotalSpent: React.FC = () => {
  const { products } = useProducts();
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const totalSpent = products
    .filter(product => {
      const date = new Date(product.timestamp);
      const pMonth = date.getMonth();
      const pYear = date.getFullYear();

      return month === pMonth && year === pYear;
    })
    .reduce((acc, value) => {
      return acc + (value.price ? value.price : 0);
    }, 0);

  return (
    <Flex w="100%" flexDirection="column">
      <Box>
        <Heading as="h1" fontSize="sm" marginBottom="32px">
          Total gasto este mês:
          <Text fontSize="40px">R${totalSpent.toFixed(2)}</Text>
        </Heading>
      </Box>
    </Flex>
  );
};
