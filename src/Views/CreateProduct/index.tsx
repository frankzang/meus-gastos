import React from "react";
import { useProductsEvents, useProducts } from "../../Context/Products";
import {
  Button,
  FormControl,
  FormHelperText,
  Flex,
  Box,
  CircularProgress,
  useToast,
} from "@chakra-ui/core";
import { toBase64 } from "../../Utils/toBase64";
import { CustomInput } from "../../Components/CustomInput";
import { CustomFormLabel } from "../../Components/CustomFormLabel";
import { CustomHeading } from "../../Components/Headings";
import { ImagePicker } from "../../Components/ImagePicker";
import { Machine, assign } from "xstate";
import { Product } from "../../Interfaces/Product";
import { useMachine } from "@xstate/react";

interface Context {
  product: Partial<Product>;
}

interface Schema {
  states: {
    idle: {};
  };
}

type Actions = { type: "CHANGE"; data: Partial<Product> } | { type: "RESET" };

const initialProduct: Partial<Product> = {
  id: 0,
};

const productMachine = Machine<Context, Schema, Actions>({
  id: "products",
  initial: "idle",
  context: {
    product: { ...initialProduct },
  },
  states: {
    idle: {
      on: {
        CHANGE: {
          actions: assign({
            product: (_ctx, evt) => evt.data,
          }),
        },
        RESET: {
          actions: assign({
            product: _ctx => {
              return initialProduct;
            },
          }),
        },
      },
    },
  },
});

export const CreateProduct: React.FC = () => {
  const [current, send] = useMachine(productMachine);
  const state = useProducts();
  const sendProductEvent = useProductsEvents();
  const toast = useToast();

  React.useEffect(() => {
    if (state.matches("created")) {
      toast({
        title: `Compra adicionada.`,
        description: `O item ${product?.name} foi adicionado as compras salvas.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  });

  const {
    context: { product },
  } = current;

  function updateField(name: keyof typeof initialProduct, value: any) {
    send({
      type: "CHANGE",
      data: { ...product, [name]: value },
    });
  }

  async function updateImage(image?: File) {
    let base64Image: any = "";

    if (image) {
      base64Image = await toBase64(image);
    }

    updateField("image", base64Image);
  }

  async function createProduct() {
    const now = new Date().getTime();

    sendProductEvent({
      type: "ADD",
      data: {
        ...(product as Product),
        id: now,
        timestamp: now,
      },
    });
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
        onSubmit={e => {
          e.preventDefault();
          createProduct();
        }}
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
                value={product?.name ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateField("name", e.currentTarget.value)
                }
                placeholder="ex. tomate"
                size="md"
                width="100%"
                isRequired
              />
            </FormControl>
            <FormControl>
              <CustomFormLabel htmlFor="valor">Valor</CustomFormLabel>
              <CustomInput
                id="valor"
                value={product?.price ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateField("price", +e.currentTarget.value)
                }
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
              onChange={updateImage}
              dispose={state.matches("created")}
            />
          </Flex>
          <Box w="100%">
            <Button
              isDisabled={state.matches("creating")}
              type="submit"
              variantColor="teal"
              size="md"
              marginTop="32px"
              w="100%"
              leftIcon={
                state.matches("creating")
                  ? () => (
                      <CircularProgress
                        isIndeterminate
                        color="teal"
                        size="20px"
                        marginRight="10px"
                      />
                    )
                  : "add"
              }
            >
              {state.matches("creating") ? "Adicionando" : "Adicionar"}
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
};
