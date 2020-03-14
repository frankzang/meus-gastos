import { Machine, assign, State } from "xstate";
import { Product } from "../Interfaces/Product";
import { keys, get } from "idb-keyval";

interface ProductContext {
  products: Product[];
}

interface ProductSchema {
  states: {
    fetching: {};
    ready: {};
  };
}

type AddProduct = { type: "ADD"; product: Product };
type SetProduct = { type: "SET_PRODUCTS"; data: Product[] };

export type ProductEvent =
  | SetProduct
  | AddProduct
  | { type: "REMOVE"; product: Product }
  | { type: "FETCH" }
  | { type: "RESET" };

export type ProductState = State<ProductContext, ProductEvent>;

export const productsMachine = Machine<
  ProductContext,
  ProductSchema,
  ProductEvent
>(
  {
    id: "products",
    context: {
      products: [],
    },
    initial: "fetching",
    states: {
      fetching: {
        invoke: {
          id: "fetchProducts",
          src: _ctx => fetchProducts(),
          onDone: {
            target: "ready",
            actions: ["setProducts"],
          },
        },
      },
      ready: {
        on: {
          FETCH: "fetching",
          ADD: {
            target: "fetching",
            actions: ["addProduct"],
          },
          REMOVE: {
            target: "fetching",
            actions: ["removeProduct"],
          },
          RESET: {
            actions: assign({
              products: _ctx => [],
            }),
            target: "fetching",
          },
        },
      },
    },
  },
  {
    actions: {
      addProduct: assign({
        products: ({ products }, evt) => [
          ...products,
          (evt as AddProduct).product,
        ],
      }),
      removeProduct: assign({
        products: ({ products }, evt) => {
          products.splice(
            products.findIndex(p => p.id === (evt as AddProduct).product.id),
            1
          );
          return products;
        },
      }),
      setProducts: assign({
        products: (_ctx, evt) => (evt as SetProduct).data || _ctx.products,
      }),
    },
  }
);

async function fetchProducts() {
  const allProductsIds = await keys();
  const products = await Promise.all<Product>(
    allProductsIds.map(id => get(id))
  );

  return products;
}
