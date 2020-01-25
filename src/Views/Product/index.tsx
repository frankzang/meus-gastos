import {
  Flex,
  Heading,
  Text,
  Button,
  Tag,
  useToast,
  CircularProgress,
  Image
} from "@chakra-ui/core";
import React from "react";
import { RouteChildrenProps, Redirect, useHistory } from "react-router-dom";
import { Routes } from "../../Routes";
import { useProducts, useProductsActions } from "../../Context/Products";
import { dateformatter, currencyformatter } from "../../Utils/formatters";
import styles from "./index.module.css";

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

  return (
    <Flex
      w="100%"
      h="100%"
      padding="5"
      flexDir="column"
      maxW="500px"
      margin="auto"
    >
      <Flex flex="1" flexDir="column">
        {product.image && (
          <Image
            src={product.image}
            rounded="10px"
            marginBottom="5"
            maxH="200px"
            objectFit="cover"
          />
        )}
        <Flex w="100%" justifyContent="space-between">
          <Heading as="h2" size="md" marginBottom="8">
            {product.name}
          </Heading>
          <Tag size="lg" variantColor="cyan" marginBottom="auto">
            {currencyformatter.format(product.price)}
          </Tag>
        </Flex>
        <Text className={styles.date} fontSize="sm" isTruncated>
          {dateformatter.format(product.timestamp)}
        </Text>
      </Flex>
      <Button
        onClick={async () => {
          await remove(product);

          toast({
            title: `Item removido.`,
            description: `O item ${product.name} foi removido das compras salvas.`,
            status: "warning",
            duration: 3000,
            isClosable: true
          });

          history.goBack();
        }}
        variantColor="red"
        size="md"
        marginTop="8"
        leftIcon="delete"
      >
        Remover
      </Button>
    </Flex>
  );
};
