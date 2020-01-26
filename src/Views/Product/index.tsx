import { CircularProgress, Flex, Image, Tag } from "@chakra-ui/core";
import React from "react";
import { Redirect, RouteChildrenProps } from "react-router-dom";
import { DeleteProductPopup } from "../../Components/DeleteProdutPopup";
import { useProducts } from "../../Context/Products";
import { Routes } from "../../Routes";
import { currencyformatter, dateformatter } from "../../Utils/formatters";
import styles from "./index.module.css";
import { CustomHeading } from "../../Components/Headings";
import { CustomText } from "../../Components/CustomText";

interface RouteProps {
  productId: string;
}

interface Props extends RouteChildrenProps<RouteProps> {}

export const ProductPage: React.FC<Props> = props => {
  const { products, loading } = useProducts();
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
          <CustomHeading as="h2" size="md" marginBottom="8">
            {product.name}
          </CustomHeading>
          <Tag size="lg" variantColor="cyan" marginBottom="auto">
            {currencyformatter.format(product.price)}
          </Tag>
        </Flex>
        <CustomText className={styles.date} fontSize="sm" isTruncated>
          {dateformatter.format(product.timestamp)}
        </CustomText>
      </Flex>
      <DeleteProductPopup product={product} />
    </Flex>
  );
};
