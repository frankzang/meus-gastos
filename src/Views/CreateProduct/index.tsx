import React from "react";
import { useProductsActions } from "../../Context/Products";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  Flex,
  useToast,
  Heading,
  Box
} from "@chakra-ui/core";
import ImageUploader from "react-images-upload";
import styles from "./index.module.css";
import { toBase64 } from "../../Utils/toBase64";

export const CreateProduct: React.FC = () => {
  const { add } = useProductsActions();
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState<File>();
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

    let base64Image: any = "";

    if (image) {
      base64Image = await toBase64(image);
    }

    await add({
      id: time,
      timestamp: time,
      name,
      price: Number.parseFloat(price),
      image: base64Image
    });

    toast({
      title: `Compra adicionada.`,
      description: `O item ${name} foi adicionado as compras salvas.`,
      status: "success",
      duration: 3000,
      isClosable: true
    });

    setName("");
    setPrice("");
  }

  function onDrop(files: File[]) {
    setImage(files[0]);
  }

  return (
    <Flex
      justifyContent="center"
      w="100%"
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
          height: "100%"
        }}
      >
        <Flex w="100%" flexDirection="column" flex="1">
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
              <FormHelperText>Escreva o valor em reais</FormHelperText>
            </FormControl>
            <FormLabel htmlFor="file" mt="8px">
              Foto (opcional)
            </FormLabel>
            <ImageUploader
              withIcon={true}
              buttonText="Adicionar foto"
              onChange={onDrop}
              imgExtension={[".jpg", ".png"]}
              label=""
              singleImage
              withPreview
              className={styles["image-picker"]}
            />
          </Flex>
          <Box minH="50px" w="100%">
            <Button
              type="submit"
              variantColor="teal"
              size="md"
              marginTop="32px"
              w="100%"
            >
              Adicionar
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
};
