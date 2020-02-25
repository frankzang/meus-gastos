import React from "react";
import { useProductsActions } from "../../Context/Products";
import {
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  Flex,
  useToast,
  Box,
  CircularProgress
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
    saving: {};
    saved: {};
  };
}

type Actions =
  | { type: "CHANGE"; data: Partial<Product> }
  | { type: "SAVE" }
  | { type: "RESET" }
  | { type: "SAVED" };

const initialProduct: Partial<Product> = {
  id: 0,
  name: "",
  price: 0
};

const productMachine = Machine<Context, Schema, Actions>({
  id: "products",
  initial: "idle",
  context: {
    product: { ...initialProduct }
  },
  states: {
    idle: {
      on: {
        SAVE: {
          target: "saving",
          cond: ctx => !!(ctx.product.name && ctx.product.price)
        },
        CHANGE: {
          actions: assign({
            product: (_ctx, evt) => evt.data
          })
        }
      }
    },
    saving: {
      on: {
        SAVED: "saved"
      }
    },
    saved: {
      on: {
        RESET: {
          target: "idle",
          actions: assign({
            product: _ctx => {
              return initialProduct;
            }
          })
        }
      }
    }
  }
});

export const CreateProduct: React.FC = () => {
  const [current, send] = useMachine(productMachine);
  const { add } = useProductsActions();
  const toast = useToast();

  const {
    context: { product }
  } = current;

  React.useEffect(() => {
    if (current.matches("saved")) {
      toast({
        title: `Compra adicionada.`,
        description: `O item ${product?.name} foi adicionado as compras salvas.`,
        status: "success",
        duration: 3000,
        isClosable: true
      });
      send("RESET");
    }
  });

  function updateField(name: keyof typeof initialProduct, value: any) {
    send({
      type: "CHANGE",
      data: { ...product, [name]: value }
    });
  }

  async function updateImage(image?: File) {
    let base64Image: any = "";

    if (image) {
      base64Image = await toBase64(image);
    }

    updateField("image", base64Image);
  }

  async function createProduct(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (current.matches("saving")) return;

    send("SAVE");

    const now = new Date().getTime();

    await add({
      ...(product as Product),
      id: now,
      timestamp: now
    });

    send("SAVED");
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
          width: "100%"
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
              <FormLabel htmlFor="valor">Valor</FormLabel>
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
              dispose={current.matches("saved")}
            />
          </Flex>
          <Box w="100%">
            <Button
              isDisabled={current.matches("saving")}
              type="submit"
              variantColor="teal"
              size="md"
              marginTop="32px"
              w="100%"
              leftIcon={
                !current.matches("saving")
                  ? "add"
                  : () => (
                      <CircularProgress
                        isIndeterminate
                        color="teal"
                        size="20px"
                        marginRight="10px"
                      />
                    )
              }
            >
              {!current.matches("saving") ? "Adicionar" : "Adicionando"}
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
};
