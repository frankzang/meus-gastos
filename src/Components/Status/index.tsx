import React from "react";
import { Flex, Text, IconButton, CircularProgress } from "@chakra-ui/core";
import { useProducts } from "../../State/Products";
import { useHistory } from "react-router-dom";
import { Routes } from "../../Routes";
import { currencyformatter } from "../../Utils/formatters";
import { CustomHeading } from "../Headings";

export const StatusHeader: React.FC = () => {
  const { products, status } = useProducts();
  const history = useHistory();

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const totalSpent = products
    .filter((product) => {
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
      {status === "loading" ? (
        <Flex justifyContent="center">
          <CircularProgress isIndeterminate color="green"></CircularProgress>
        </Flex>
      ) : (
        <>
          <CustomHeading fontSize="sm" marginRight="5">
            Total gasto este mês:
            <Text fontSize="40px">{currencyformatter.format(totalSpent)}</Text>
          </CustomHeading>
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
        </>
      )}
    </Flex>
  );
};
