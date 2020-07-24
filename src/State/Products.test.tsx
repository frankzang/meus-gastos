import { renderHook } from "@testing-library/react-hooks";
import { useProducts, ProductsProvider, IProduct } from "./Products";
import { act } from "react-test-renderer";
import * as idb from "idb-keyval";

jest.mock("idb-keyval");

const mockKeys = idb.keys as jest.Mock<any>;
const mockGet = idb.get as jest.Mock<any>;

const mockProduct: IProduct = {
  id: 0,
  name: "Eggs",
  price: 5,
  timestamp: 0,
  description: "",
  image: "",
};

describe("useProducts hook", () => {
  test("should fetch initial products", async () => {
    mockKeys.mockReturnValue(Promise.resolve(["key"]));
    mockGet.mockReturnValue(Promise.resolve(mockProduct));
    const { result, waitForNextUpdate } = renderHook(() => useProducts(), {
      wrapper: ProductsProvider,
    });

    expect(result.current.status).toEqual("loading");

    await waitForNextUpdate();

    expect(result.current.status).toEqual("idle");
    expect(result.current.products).toContain(mockProduct);
  });

  test("should add a new product", async () => {
    mockKeys.mockReturnValue(Promise.resolve([]));

    const { result, waitForNextUpdate } = renderHook(() => useProducts(), {
      wrapper: ProductsProvider,
    });

    await waitForNextUpdate();
    expect(result.current.products.length).toEqual(0);

    await act(async () => {
      result.current.add(mockProduct);
    });

    expect(result.current.products).toContain(mockProduct);
  });

  test("should remove a product", async () => {
    mockKeys.mockReturnValue(Promise.resolve(["key"]));
    mockGet.mockReturnValue(Promise.resolve(mockProduct));
    const { result, waitForNextUpdate } = renderHook(() => useProducts(), {
      wrapper: ProductsProvider,
    });

    await waitForNextUpdate();
    expect(result.current.products.length).toEqual(1);

    await act(async () => {
      result.current.remove(mockProduct);
    });

    expect(result.current.products.length).toEqual(0);
  });
});
