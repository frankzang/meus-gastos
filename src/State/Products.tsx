import React from "react";
import * as idb from "idb-keyval";

export interface IProduct {
  id: number;
  name: string;
  description?: string;
  timestamp: number;
  price: number;
  image?: any;
}

type Action =
  | { type: "ADD"; product: IProduct }
  | { type: "SET_PRODUCTS"; products: IProduct[] }
  | { type: "REMOVE"; product: IProduct }
  | { type: "RESET" }
  | { type: "LOADING" };

interface State {
  products: IProduct[];
  status: "loading" | "idle" | "error";
}

interface Dispatchers {
  add(p: IProduct): Promise<void>;
  remove(p: IProduct): Promise<void>;
}

const initialState: State = {
  products: [],
  status: "loading",
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.products, status: "idle" };
    case "LOADING":
      return { ...state, status: "loading" };
    case "ADD":
      return { ...state, products: [...state.products, action.product] };
    case "REMOVE":
      return {
        ...state,
        products: state.products.filter(
          (item) => item.id !== action.product.id
        ),
      };
    case "RESET":
      return { products: [], status: "idle" };
    default:
      return state;
  }
};

const stateContext = React.createContext<(State & Dispatchers) | undefined>(
  undefined
);

export const ProductsProvider: React.FC = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    getLocalProducts();
  }, []);

  async function getLocalProducts() {
    const allProductsIds = await idb.keys();
    const products = await Promise.all<IProduct>(
      allProductsIds.map((id) => idb.get(id))
    );

    dispatch({
      type: "SET_PRODUCTS",
      products,
    });
  }

  const add = React.useCallback(async (product: IProduct) => {
    await idb.set(product.id, product);

    dispatch({
      type: "ADD",
      product,
    });
  }, []);

  const remove = React.useCallback(async (product: IProduct) => {
    await idb.del(product.id);

    dispatch({
      type: "REMOVE",
      product,
    });
  }, []);

  return (
    <stateContext.Provider value={{ ...state, add, remove }}>
      {props.children}
    </stateContext.Provider>
  );
};

export const useProducts = () => {
  const state = React.useContext(stateContext);

  if (!state)
    throw new Error("useProducts must be used inside ProductsProvider");

  return state;
};
