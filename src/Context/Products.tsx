import React from "react";
import { get, set, del, keys, clear } from "idb-keyval";
import { Product } from "../Interfaces/Product";
import { useMachine } from "@xstate/react";
import { productsMachine, ProductState, ProductEvent } from "./productsMachine";

const stateContext = React.createContext<ProductState | undefined>(undefined);
const dispatchContext = React.createContext<
  React.Dispatch<ProductEvent> | undefined
>(undefined);

export const ProductsProvider: React.FC = props => {
  const [state, send] = useMachine(productsMachine);

  const getLocalProducts = React.useCallback(async () => {
    const allProductsIds = await keys();
    const products = await Promise.all<Product>(
      allProductsIds.map(id => get(id))
    );

    send({
      type: "SET_PRODUCTS",
      products
    });
  }, [send]);

  React.useEffect(() => {
    getLocalProducts();
  }, [state, getLocalProducts]);

  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={send}>
        {props.children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
};

export const useProducts = () => {
  const state = React.useContext(stateContext);

  if (!state)
    throw new Error(
      "useProducts must be used inside a ProductsProvider context"
    );

  return state;
};

export const useProductsActions = () => {
  const send = React.useContext(dispatchContext);

  if (!send)
    throw new Error(
      "useProductsActions must be used inside a ProductsProvider context"
    );

  const add = async (product: Product) => {
    await set(product.id, product);

    send({
      type: "ADD",
      product
    });

    return product;
  };

  const remove = async (product: Product) => {
    await del(product.id);

    send({
      type: "REMOVE",
      product
    });
  };

  const eraseData = async () => {
    await clear();

    send({
      type: "RESET"
    });
  };

  return {
    add,
    remove,
    eraseData
  };
};
