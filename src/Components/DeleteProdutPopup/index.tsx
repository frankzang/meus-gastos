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
import { useProducts, IProduct } from "../../State/Products";

interface Props {
  product: IProduct;
}

export const DeleteProductPopup: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  const { remove } = useProducts();
  const { colorMode } = useColorMode();
  const { product } = props;
  const color = { light: "gray.800", dark: "white" };

  const onClose = () => setIsOpen(false);

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
                await remove(product);

                toast({
                  title: `Item removido.`,
                  description: `O item ${product.name} foi removido das compras salvas.`,
                  status: "warning",
                  duration: 3000,
                  isClosable: true,
                });
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
