import React from "react";
import { Box, Tag, Flex, Image } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { Routes } from "../../Routes";
import { currencyformatter, dateformatter } from "../../Utils/formatters";
import styles from "./index.module.css";
import { CustomHeading } from "../Headings";
import { CustomText } from "../CustomText";
import { IProduct } from "../../State/Products";

interface Props {
  product: IProduct;
}

export const ProductCard: React.FC<Props> = (props) => {
  const { product } = props;

  return (
    <Link to={`${Routes.PRODUCT}/${product.id}`}>
      <Box
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        marginBottom="8px"
        padding="8px"
      >
        <Flex
          justifyContent="space-between"
          justifyItems="flex-start"
          alignItems="flex-start"
        >
          {product.image && (
            <Image
              rounded="10px"
              size="50px"
              src={product.image}
              alt="Segun Adebayo"
              marginRight="10px"
              marginBottom="10px"
            />
          )}
          <CustomHeading as="h3" fontSize="x1" isTruncated flex="1">
            {product.name}
          </CustomHeading>
          <Tag size="sm" variantColor="cyan" marginBottom="8px">
            {currencyformatter.format(product.price)}
          </Tag>
        </Flex>
        <CustomText fontSize="xs" isTruncated className={styles.date}>
          {dateformatter.format(product.timestamp)}
        </CustomText>
      </Box>
    </Link>
  );
};
