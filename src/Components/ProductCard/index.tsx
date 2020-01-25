import React from "react";
import { Box, Text, Tag, Flex, Image } from "@chakra-ui/core";
import { Product } from "../../Interfaces/Product";
import { Link } from "react-router-dom";
import { Routes } from "../../Routes";
import { currencyformatter, dateformatter } from "../../Utils/formatters";
import styles from "./index.module.css";

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
        <Flex
          justifyContent="space-between"
          justifyItems="flex-start"
          alignItems="flex-start"
        >
          {product.image && (
            <Image
              rounded="10px"
              size="50px"
              src={product.image}
              alt="Segun Adebayo"
              marginRight="10px"
              marginBottom="10px"
            />
          )}
          <Text fontSize="x1" isTruncated flex="1">
            {product.name}
          </Text>
          <Tag size="sm" variantColor="cyan" marginBottom="8px">
            {currencyformatter.format(product.price)}
          </Tag>
        </Flex>
        <Text fontSize="xs" isTruncated className={styles.date}>
          {dateformatter.format(product.timestamp)}
        </Text>
      </Box>
    </Link>
  );
};
