import React from "react";
import {
  Heading,
  Flex,
  Text,
  IconButton,
  CircularProgress
} from "@chakra-ui/core";
import { useProducts } from "../../Context/Products";
import { useHistory } from "react-router-dom";
import { Routes } from "../../Routes";

export const StatusHeader: React.FC = () => {
  const { products, loading } = useProducts();
  const history = useHistory();

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const totalSpent = products
    .filter(product => {
      const date = new Date(product.timestamp);
      const pMonth = date.getMonth();
      const pYear = date.getFullYear();

      return month === pMonth && year === pYear;
    })
    .reduce((acc, value) => {
      return acc + (value.price ? value.price : 0);
    }, 0);

  return (
    <Flex w="100%" alignItems="flex-end">
      {loading ? (
        <Flex justifyContent="center">
          <CircularProgress isIndeterminate color="green"></CircularProgress>
        </Flex>
      ) : (
        <>
          <Heading as="h1" fontSize="sm" marginRight="5">
            Total gasto este mês:
            <Text fontSize="40px">R${totalSpent.toFixed(2)}</Text>
          </Heading>
          <IconButton
            onClick={() => {
              history.push(Routes.CREATE_PRODUCT);
            }}
            variant="solid"
            variantColor="teal"
            aria-label="Call Sage"
            fontSize="14px"
            icon="add"
            size="sm"
            marginBottom="10px"
          />
          <IconButton
            onClick={() => {
              history.push(Routes.CONFIGURATIONS);
            }}
            icon="settings"
            aria-label="configurações"
            alignSelf="flex-end"
            marginLeft="auto"
            marginBottom="auto"
            variant="link"
            variantColor="gray"
          ></IconButton>
        </>
      )}
    </Flex>
  );
};
