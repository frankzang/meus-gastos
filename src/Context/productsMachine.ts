import { Machine, assign, State } from "xstate";
import { Product } from "../Interfaces/Product";

interface ProductContext {
  products: Product[];
}

interface ProductSchema {
  states: {
    fetching: {};
    loaded: {};
  };
}

export type ProductEvent =
  | { type: "SET_PRODUCTS"; products: Product[] }
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; product: Product }
  | { type: "FETCH" }
  | { type: "RESET" };

export type ProductState = State<ProductContext, ProductEvent>;

export const productsMachine = Machine<
  ProductContext,
  ProductSchema,
  ProductEvent
>({
  id: "products",
  context: {
    products: []
  },
  initial: "fetching",
  states: {
    fetching: {
      on: {
        SET_PRODUCTS: {
          target: "loaded",
          actions: assign({
            products: (_ctx, evt) => evt.products || _ctx.products
          })
        }
      }
    },
    loaded: {
      on: {
        FETCH: "fetching",
        ADD: {
          actions: assign({
            products: ({ products }, { product }) => [...products, product]
          }),
          target: "fetching"
        },
        REMOVE: {
          actions: assign({
            products: ({ products }, { product }) => {
              products.splice(
                products.findIndex(p => p.id === product.id),
                1
              );
              return products;
            }
          }),
          target: "fetching"
        },
        RESET: {
          actions: assign({
            products: _ctx => []
          }),
          target: "fetching"
        }
      }
    }
  }
});
