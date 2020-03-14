import React from "react";
import { useMachine } from "@xstate/react";
import { productsMachine, ProductState, ProductEvent } from "./productsMachine";

const stateContext = React.createContext<ProductState | undefined>(undefined);
const eventContext = React.createContext<ProductEvent | undefined>(undefined);

export const ProductsProvider: React.FC = props => {
  const [state, send] = useMachine(productsMachine);

  return (
    <stateContext.Provider value={state}>
      <eventContext.Provider value={send}>
        {props.children}
      </eventContext.Provider>
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

export const useProductsEvents = () => {
  const send = React.useContext(eventContext);

  if (!send)
    throw new Error(
      "useProductsEvents must be used inside a ProductsProvider context"
    );

  return send;
};
