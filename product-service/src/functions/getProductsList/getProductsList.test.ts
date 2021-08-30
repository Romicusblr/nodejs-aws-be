//@ts-nocheck
import getProductsList from "./handler";

describe("getProductsList function", () => {
  test("returns correct array", async () => {
    const res = await getProductsList({});
    const {message: {productList}} = JSON.parse(res.body)
    expect(Array.isArray(productList)).toBe(true);
    expect(productList.length).toBe(5);
  });
});
