import { Box, Flex, Heading, Text, Button, Tag } from "@chakra-ui/core";
import React from "react";
import { RouteChildrenProps, Redirect, useHistory } from "react-router-dom";
import { Routes } from "../Routes";
import { useProducts } from "../Context/Products";

interface RouteProps {
  productId: string;
}

interface Props extends RouteChildrenProps<RouteProps> {}

export const ProductPage: React.FC<Props> = props => {
  const { products } = useProducts();
  const history = useHistory();
  const productId = props.match?.params.productId || "0";

  const product = products.find(
    product => product.id === Number.parseInt(productId)
  );

  if (!product) {
    return <Redirect to={Routes.HOME} />;
  }

  const date = new Date(product.timestamp);

  return (
    <>
      <Flex w="100%" padding="5" flexDir="column">
        <Flex w="100%" justifyContent="space-between">
          <Heading as="h2" size="md" marginBottom="8">
            {product.name}
          </Heading>
          <Tag size="sm" variantColor="cyan" marginBottom="8px">
            R$ {product.price?.toFixed(2)}
          </Tag>
        </Flex>
        <Text fontSize="sm" isTruncated>
          Adicionado em {date.toLocaleDateString()} às {date.getHours()}:
          {date.getMinutes()}
        </Text>
        <Button
          onClick={() => {
            history.goBack();
          }}
          variantColor="red"
          size="md"
          marginTop="8"
        >
          Remover
        </Button>
      </Flex>
    </>
  );
};
