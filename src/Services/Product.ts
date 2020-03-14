import { Product } from "../Interfaces/Product";
import { keys, get, del, set, clear } from "idb-keyval";

async function fetch() {
  const allProductsIds = await keys();
  const products = await Promise.all<Product>(
    allProductsIds.map(id => get(id))
  );

  return products;
}

async function create(product: Product) {
  await set(product.id, product);

  return product;
}

async function remove(product: Product) {
  await del(product.id);

  return product;
}

async function erase() {
  await clear();
}

export const products = {
  fetch,
  create,
  remove,
  erase,
};
