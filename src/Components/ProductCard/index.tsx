import React from "react";
import { Box, Text, Tag, Flex } from "@chakra-ui/core";
import { Product } from "../../Interfaces/Product";
import { Link } from "react-router-dom";
import { Routes } from "../../Routes";
import { currencyformatter, dateformatter } from "../../Utils/formatters";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = props => {
  const { product } = props;

  return (
    <Link to={`${Routes.PRODUCT}/${product.id}`}>
      <Box
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
            {currencyformatter.format(product.price)}
          </Tag>
        </Flex>
        <Text fontSize="xs" isTruncated>
          {dateformatter.format(product.timestamp)}
        </Text>
      </Box>
    </Link>
  );
};
