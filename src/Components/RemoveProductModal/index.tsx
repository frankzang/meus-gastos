import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from "@chakra-ui/core";
import { Product } from "../../Interfaces/Product";
import { useProductsActions } from "../../Context/Products";

interface Props {
  isOpen: boolean;
  onClose: Function;
  product?: Product;
}

export const RemoveProductModal: React.FC<Props> = props => {
  const { isOpen, onClose, product } = props;
  const { remove } = useProductsActions();

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Deseja remover este produto?</p>
          <p>Esta ação não poderá ser desfeita.</p>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={async () => {
              if (!product) return;

              await remove(product);
              onClose();
            }}
            variant="ghost"
            variantColor="red"
            marginRight="5"
          >
            Remover produto
          </Button>
          <Button onClick={() => onClose()} variantColor="blue" mr={3}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
