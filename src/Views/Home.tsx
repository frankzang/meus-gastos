import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, CircularProgress } from "@chakra-ui/core";
import { useProducts } from "../Context/Products";
import { ProductCard } from "../Components/ProductCard";
import { StatusHeader } from "../Components/Status";
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
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        flexDirection="column"
        paddingBottom="8"
      >
        <Box w="100%" padding="5" maxW="500px">
          <StatusHeader />
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
                  ? "Compras cadastradas."
                  : "Você não tem compras cadastradas."}
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
      </Flex>
    </>
  );
};
