import {
  Flex,
  Heading,
  Text,
  Button,
  Tag,
  useToast,
  CircularProgress
} from "@chakra-ui/core";
import React from "react";
import { RouteChildrenProps, Redirect, useHistory } from "react-router-dom";
import { Routes } from "../Routes";
import { useProducts, useProductsActions } from "../Context/Products";

interface RouteProps {
  productId: string;
}

interface Props extends RouteChildrenProps<RouteProps> {}

export const ProductPage: React.FC<Props> = props => {
  const { products, loading } = useProducts();
  const { remove } = useProductsActions();
  const history = useHistory();
  const toast = useToast();
  const productId = props.match?.params.productId || "0";

  const product = products.find(
    product => product.id === Number.parseInt(productId)
  );

  if (loading) {
    return (
      <Flex justifyContent="center" padding="8">
        <CircularProgress isIndeterminate color="green" />
      </Flex>
    );
  }

  if (!product) {
    return <Redirect to={Routes.HOME} />;
  }

  const date = new Date(product.timestamp);

  return (
    <Flex w="100%" h="100%" padding="5" flexDir="column">
      <Flex flex="1" flexDir="column">
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
      </Flex>
      <Button
        onClick={async () => {
          await remove(product);

          toast({
            title: `Compra removida.`,
            description: `O item ${product.name} foi removido das compras salvas.`,
            status: "warning",
            duration: 5000,
            isClosable: true
          });

          history.goBack();
        }}
        variantColor="red"
        size="md"
        marginTop="8"
      >
        Remover
      </Button>
    </Flex>
  );
};
