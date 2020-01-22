import React from "react";
import { useProductsActions } from "../Context/Products";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  Flex,
  useToast,
  Heading
} from "@chakra-ui/core";

export const CreateProduct: React.FC = () => {
  const { add } = useProductsActions();
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const toast = useToast();

  function updateName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function updatePrice(event: React.ChangeEvent<HTMLInputElement>) {
    setPrice(event.target.value);
  }

  async function createProduct(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const time = new Date().getTime();

    await add({
      id: time,
      timestamp: time,
      name,
      price: Number.parseFloat(price)
    });

    toast({
      title: `Compra adicionada.`,
      description: `O item ${name} foi adicionado as compras salvas.`,
      status: "success",
      duration: 5000,
      isClosable: true
    });

    setName("");
    setPrice("");
  }

  return (
    <form onSubmit={createProduct}>
      <Flex w="100%" maxW="500px" flexDirection="column" padding="5">
        <Heading as="h2" size="md" marginBottom="8">
          Adicionar nova compra
        </Heading>
        <Flex direction="column">
          <FormControl marginBottom="8px">
            <FormLabel htmlFor="nome">Nome do produto</FormLabel>
            <Input
              autoFocus
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
      </Flex>
    </form>
  );
};
