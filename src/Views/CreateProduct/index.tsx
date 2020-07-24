import React from "react";
import { useProducts } from "../../State/Products";
import {
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  Flex,
  useToast,
  Box,
  CircularProgress,
} from "@chakra-ui/core";
import { toBase64 } from "../../Utils/toBase64";
import { CustomInput } from "../../Components/CustomInput";
import { CustomFormLabel } from "../../Components/CustomFormLabel";
import { CustomHeading } from "../../Components/Headings";
import { ImagePicker } from "../../Components/ImagePicker";

export const CreateProduct: React.FC = () => {
  const { add } = useProducts();
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState<File>();
  const [resetImage, setResetImage] = React.useState<Boolean>(false);
  const [isCreatingProduct, setIsCreatingProduct] = React.useState(false);
  const toast = useToast();

  function updateName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function updatePrice(event: React.ChangeEvent<HTMLInputElement>) {
    setPrice(event.target.value);
  }

  async function createProduct(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isCreatingProduct) return;

    setIsCreatingProduct(true);
    const time = new Date().getTime();
    let base64Image: any = "";

    if (image) {
      base64Image = await toBase64(image);
    }

    await add({
      id: time,
      timestamp: time,
      name,
      price: Number.parseFloat(price),
      image: base64Image,
    });

    toast({
      title: `Compra adicionada.`,
      description: `O item ${name} foi adicionado às compras salvas.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setName("");
    setPrice("");
    setIsCreatingProduct(false);
    setResetImage(true);
  }

  return (
    <Flex
      justifyContent="center"
      w="100%"
      minH="100%"
      overflow="auto"
      padding="5"
      maxW="500px"
      margin="auto"
    >
      <form
        onSubmit={createProduct}
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Flex
          w="100%"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <Flex direction="column" height="100%">
            <CustomHeading as="h2" size="md" marginBottom="8">
              Adicionar nova compra
            </CustomHeading>
            <FormControl marginBottom="8px">
              <CustomFormLabel htmlFor="nome">Nome do produto</CustomFormLabel>
              <CustomInput
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
              <CustomInput
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
              <FormHelperText>Escreva o valor em reais</FormHelperText>
            </FormControl>
            <CustomFormLabel htmlFor="file" mt="8px">
              Foto (opcional)
            </CustomFormLabel>
            <ImagePicker
              onChange={(file) => {
                setResetImage(false);
                setImage(file);
              }}
              dispose={resetImage}
            />
          </Flex>
          <Box w="100%">
            <Button
              type="submit"
              variantColor="teal"
              size="md"
              marginTop="32px"
              w="100%"
              isLoading={isCreatingProduct}
              loadingText="Adicionando"
              leftIcon="add"
            >
              Adicionar
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
};
