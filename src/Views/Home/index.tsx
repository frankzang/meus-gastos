import React, { useState, useEffect } from "react";
import { Box, Flex, CircularProgress } from "@chakra-ui/core";
import { useProducts } from "../../State/Products";
import { ProductCard } from "../../Components/ProductCard";
import { StatusHeader } from "../../Components/Status";
import { SearchBox } from "../../Components/SearchBox";
import { CustomHeading } from "../../Components/Headings";

export const Home: React.FC = () => {
  const { products, status } = useProducts();
  const [productsToShow, setProductsToShow] = useState(products);
  const theresProducts = products.length > 0;

  useEffect(() => {
    setProductsToShow(products);
  }, [products]);

  const updateProductsToShow = (name: string) => {
    setProductsToShow(
      products.filter(
        (product) =>
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
            onChange={(e) => updateProductsToShow(e.target.value)}
          />
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom="48px"
          >
            {status === "loading" ? null : (
              <CustomHeading
                as="h2"
                size="md"
                marginBottom="0"
                marginRight="10px"
              >
                {theresProducts
                  ? "Compras cadastradas."
                  : "Você não possui compras cadastradas."}
              </CustomHeading>
            )}
          </Flex>
          {status === "loading" ? (
            <Flex justifyContent="center">
              <CircularProgress isIndeterminate color="green" />
            </Flex>
          ) : (
            productsToShow
              .filter(Boolean)
              .reverse()
              .map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })
          )}
        </Box>
      </Flex>
    </>
  );
};
