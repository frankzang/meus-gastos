import React from "react";
import { useProductsActions } from "../../Context/Products";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  Flex,
  useToast
} from "@chakra-ui/core";

export const ProductForm: React.FC = () => {
  const { add } = useProductsActions();
  const toast = useToast();
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const updatePrice = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPrice(event.target.value);

  async function createProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const time = new Date().getTime();

    await add({
      id: time,
      timestamp: time,
      name,
      price: Number.parseFloat(price)
    });

    toast({
      title: `${name} adicioado.`,
      description: `O item ${name} foi adicionado as compras salvas.`,
      status: "success",
      duration: 5000,
      isClosable: true
    });

    setName("");
    setPrice("");
  }

  return (
    <form onSubmit={createProduct} autoComplete="off">
      <Flex direction="column">
        <FormControl marginBottom="8px">
          <FormLabel htmlFor="nome">Nome do produto</FormLabel>
          <Input
            id="nome"
            value={name}
            onChange={updateName}
            placeholder="ex. tomate"
            size="md"
            width="100%"
            isRequired
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="valor">Valor</FormLabel>
          <Input
            id="valor"
            value={price}
            onChange={updatePrice}
            placeholder="ex: 2,50"
            type="number"
            size="md"
            width="100%"
            variant="outline"
            isRequired
          />
        </FormControl>
        <FormHelperText>Escreva o valor em reais</FormHelperText>
        <Button type="submit" variantColor="teal" size="md" marginTop="32px">
          Criar
        </Button>
      </Flex>
    </form>
  );
};
