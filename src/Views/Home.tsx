import React from "react";
import { Box, Flex, Heading, Button } from "@chakra-ui/core";
import { useProducts } from "../Context/Products";
import { ProductCard } from "../Components/ProductCard";
import { Link, useHistory } from "react-router-dom";
import { Routes } from "../Routes";
import { TotalSpent } from "../Components/TotalSpent";

export const Home: React.FC = () => {
  const { products } = useProducts();
  const history = useHistory();

  return (
    <>
      <Flex w="100%" height="100%" alignItems="center" flexDirection="column">
        <Box w="100%" padding="5" maxW="500px">
          <TotalSpent />
        </Box>
        <Box w="100%" padding="5" maxW="500px" flex="1">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom="48px"
          >
            <Heading as="h2" size="md" marginBottom="0">
              {products.length > 0
                ? "Compras cadastradas"
                : "Você ainda não cadastrou compras."}
            </Heading>
            <Button
              onClick={() => {
                history.push(Routes.CREATE_PRODUCT);
              }}
              variantColor="teal"
              size="md"
            >
              Adicionar
            </Button>
          </Flex>
          {products
            .filter(Boolean)
            .reverse()
            .map(product => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </Box>
        <Box padding="5">
          <Link to={Routes.CONFIGURATIONS}>Configurações</Link>
        </Box>
      </Flex>
    </>
  );
};
