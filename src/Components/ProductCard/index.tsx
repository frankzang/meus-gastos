import React from "react";
import { Box, Text, Tag, Flex } from "@chakra-ui/core";
import { Product } from "../../Interfaces/Product";
import { Link } from "react-router-dom";
import { Routes } from "../../Routes";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = props => {
  const { product } = props;
  const date = new Date(product.timestamp);

  return (
    <Link to={`${Routes.PRODUCT}/${product.id}`}>
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
            R$ {product.price?.toFixed(2)}
          </Tag>
        </Flex>
        <Text fontSize="sm" isTruncated>
          {date.toLocaleDateString()} às {date.getHours()}:{date.getMinutes()}
        </Text>
      </Box>
    </Link>
  );
};
