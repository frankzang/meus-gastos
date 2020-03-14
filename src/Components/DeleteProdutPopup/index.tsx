import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
  useColorMode,
} from "@chakra-ui/core";
import React from "react";
import { useProductsEvents, useProducts } from "../../Context/Products";
import { Product } from "../../Interfaces/Product";

interface Props {
  product: Product;
}

export const DeleteProductPopup: React.FC<Props> = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  const state = useProducts();
  const cancelRef = React.useRef();
  const toast = useToast();
  const sendProductEvent = useProductsEvents();
  const { colorMode } = useColorMode();
  const { product } = props;
  const color = { light: "gray.800", dark: "white" };
  const onClose = () => setIsOpen(false);

  React.useEffect(() => {
    if (state.matches("deleted")) {
      toast({
        title: `Item removido.`,
        description: `O item ${product.name} foi removido das compras salvas.`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  });

  return (
    <>
      <Button
        onClick={async () => {
          setIsOpen(true);
        }}
        variantColor="red"
        size="md"
        marginTop="8"
        leftIcon="delete"
      >
        Remover
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            color={color[colorMode]}
          >
            Remover compra?
          </AlertDialogHeader>

          <AlertDialogBody color={color[colorMode]}>
            <p>Você tem certeza que deseja remover este item?</p>
            <p>Essa ação não poderá ser desfeita.</p>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} color={color[colorMode]}>
              Cancelar
            </Button>
            <Button
              variantColor="red"
              onClick={async () => {
                sendProductEvent({ type: "REMOVE", data: product });
              }}
              ml={3}
            >
              Remover
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
