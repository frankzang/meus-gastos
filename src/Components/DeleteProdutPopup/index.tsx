import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast
} from "@chakra-ui/core";
import React from "react";
import { useProductsActions } from "../../Context/Products";
import { Product } from "../../Interfaces/Product";

interface Props {
  product: Product;
}

export const DeleteProductPopup: React.FC<Props> = props => {
  const [isOpen, setIsOpen] = React.useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  const { remove } = useProductsActions();
  const { product } = props;

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
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Remover compra?
          </AlertDialogHeader>

          <AlertDialogBody>
            <p>Você tem certeza que deseja remover este item?</p>
            <p>Essa ação não poderá ser desfeita.</p>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
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
                  isClosable: true
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
