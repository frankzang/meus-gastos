import { Machine, assign, State, Interpreter } from "xstate";
import { Product } from "../Interfaces/Product";
import { products } from "../Services/Product";

interface ProductContext {
  products: Product[];
}

interface ProductSchema {
  states: {
    fetching: {};
    ready: {};
    deleting: {};
    deleted: {};
    creating: {};
    created: {};
    erasing: {};
  };
}

type AddProduct = {
  type: "ADD";
  data: Product;
};

type SetProducts = {
  type: "SET_PRODUCTS";
  data: Product[];
};

type RemoveProduct = {
  type: "REMOVE";
  data: Product;
};

type FetchProducts = {
  type: "FETCH";
};

type EraseProducts = {
  type: "ERASE";
};

type ProductEvents =
  | SetProducts
  | AddProduct
  | RemoveProduct
  | FetchProducts
  | EraseProducts;

export type ProductState = State<ProductContext, ProductEvents>;
export type ProductEvent = Interpreter<
  ProductContext,
  any,
  ProductEvents
>["send"];

const setProducts = assign<ProductContext, ProductEvents>((_ctx, evt) => ({
  products: (evt as SetProducts).data,
}));

const createProduct = assign<ProductContext, ProductEvents>({
  products: ({ products }, evt) => [...products, (evt as AddProduct).data],
});

const deleteProduct = assign<ProductContext, ProductEvents>({
  products: ({ products }, evt) => {
    products.splice(
      products.findIndex(p => p.id === (evt as RemoveProduct).data.id),
      1
    );
    return products;
  },
});

const eraseProducts = assign<ProductContext, ProductEvents>({
  products: () => [],
});

export const productsMachine = Machine<
  ProductContext,
  ProductSchema,
  ProductEvents
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
          src: _ctx => products.fetch(),
          onDone: {
            target: "ready",
            actions: ["setProducts"],
          },
        },
      },
      ready: {
        on: {
          FETCH: "fetching",
          ADD: "creating",
          REMOVE: "deleting",
          ERASE: "erasing",
        },
      },
      creating: {
        invoke: {
          id: "creatingProduct",
          src: (_ctx, evt) => products.create((evt as AddProduct).data),
          onDone: {
            target: "created",
            actions: ["createProduct"],
          },
        },
      },
      created: {
        after: {
          1000: "ready",
        },
      },
      deleting: {
        invoke: {
          id: "deletingProduct",
          src: (_ctx, evt) => products.remove((evt as RemoveProduct).data),
          onDone: {
            target: "deleted",
            actions: ["deleteProduct"],
          },
        },
      },
      deleted: {
        after: {
          1000: "ready",
        },
      },
      erasing: {
        invoke: {
          id: "erasingData",
          src: _ctx => products.erase(),
          onDone: {
            target: "ready",
            actions: ["eraseData"],
          },
        },
      },
    },
  },
  {
    actions: {
      setProducts,
      createProduct,
      deleteProduct,
      eraseProducts,
    },
  }
);
