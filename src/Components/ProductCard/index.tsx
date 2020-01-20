import React from "react";
import { Box, Text, Tag, Flex } from "@chakra-ui/core";
import { Product } from "../../Interfaces/Product";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = props => {
  const { product } = props;

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      marginBottom="8px"
      padding="8px"
    >
      <Flex justifyContent="space-between">
        <Text fontSize="x1" isTruncated flex="1">
          {product.name}
        </Text>
        <Tag size="sm" variantColor="cyan" marginBottom="8px">
          R$ {product.price}
        </Tag>
      </Flex>
      <Text fontSize="sm" isTruncated>
        {new Date(product.timestamp).toLocaleDateString()}
      </Text>
    </Box>
  );
};
