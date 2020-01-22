import React from "react";
import { get, set, del, keys, clear } from "idb-keyval";
import { Product } from "../Interfaces/Product";

interface AddProduct {
  type: "ADD";
  product: Product;
}

interface SetProducts {
  type: "SET_PRODUCTS";
  products: Product[];
}

interface RemoveProduct {
  type: "REMOVE";
  product: Product;
}

interface ResetProducts {
  type: "RESET";
}

interface LoadingProducts {
  type: "LOADING";
  loading: boolean;
}

type Action =
  | SetProducts
  | AddProduct
  | RemoveProduct
  | ResetProducts
  | LoadingProducts;

interface State {
  products: Product[];
  loading: boolean;
}

const initialState: State = {
  products: [],
  loading: true
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.products, loading: false };
    case "LOADING":
      return { ...state, loading: action.loading };
    case "ADD":
      return { ...state, products: [...state.products, action.product] };
    case "REMOVE":
      return {
        ...state,
        products: state.products.filter(item => item.id !== action.product.id)
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const stateContext = React.createContext<State | undefined>(undefined);
const dispatchContext = React.createContext<React.Dispatch<Action> | undefined>(
  undefined
);

export const ProductsProvider: React.FC = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    getLocalProducts();
  }, []);

  async function getLocalProducts() {
    const allProductsIds = await keys();
    const products = await Promise.all<Product>(
      allProductsIds.map(id => get(id))
    );

    dispatch({
      type: "SET_PRODUCTS",
      products
    });
  }

  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
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
  const dispatch = React.useContext(dispatchContext);

  if (!dispatch)
    throw new Error(
      "useProductsActions must be used inside a ProductsProvider context"
    );

  const add = async (product: Product) => {
    await set(product.id, product);

    dispatch({
      type: "ADD",
      product
    });

    return product;
  };

  const remove = async (product: Product) => {
    await del(product.id);

    dispatch({
      type: "REMOVE",
      product
    });
  };

  const eraseData = async () => {
    await clear();

    dispatch({
      type: "RESET"
    });
  };

  return {
    add,
    remove,
    eraseData
  };
};
