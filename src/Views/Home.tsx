import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, CircularProgress } from "@chakra-ui/core";
import { useProducts } from "../Context/Products";
import { ProductCard } from "../Components/ProductCard";
import { Link } from "react-router-dom";
import { Routes } from "../Routes";
import { TotalSpent } from "../Components/Status";
import { SearchBox } from "../Components/SearchBox";

export const Home: React.FC = () => {
  const { products, loading } = useProducts();
  const [productsToShow, setProductsToShow] = useState(products);
  const theresProducts = products.length > 0;

  useEffect(() => {
    setProductsToShow(products);
  }, [products]);

  const updateProductsToShow = (name: string) => {
    setProductsToShow(
      products.filter(
        product =>
          product && product.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  return (
    <>
      <Flex w="100%" height="100%" alignItems="center" flexDirection="column">
        <Box w="100%" padding="5" maxW="500px">
          <TotalSpent />
        </Box>
        <Box w="100%" padding="5" maxW="500px" flex="1">
          <SearchBox
            isDisabled={!theresProducts}
            onChange={e => updateProductsToShow(e.target.value)}
          />
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom="48px"
          >
            {loading ? null : (
              <Heading as="h2" size="md" marginBottom="0" marginRight="10px">
                {theresProducts
                  ? "Compras cadastradas"
                  : "Você ainda não cadastrou compras."}
              </Heading>
            )}
          </Flex>
          {loading ? (
            <Flex justifyContent="center">
              <CircularProgress isIndeterminate color="green" />
            </Flex>
          ) : (
            productsToShow
              .filter(Boolean)
              .reverse()
              .map(product => {
                return <ProductCard key={product.id} product={product} />;
              })
          )}
        </Box>
        <Box padding="5">
          <Link to={Routes.CONFIGURATIONS}>Configurações</Link>
        </Box>
      </Flex>
    </>
  );
};
