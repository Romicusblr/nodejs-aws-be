//@ts-nocheck
import {main as getProductById} from "./handler";

describe("getProductById function", () => {
  test("returns correct object", async () => {
    const res = await getProductById({ pathParameters: { productId: "1" } });
    const product = JSON.parse(res.body);
    expect(product).toMatchSnapshot();
  });

  test("throws error for wrong id", async () => {
    await expect(
      getProductById({ pathParameters: { productId: "10" } })
    ).rejects.toThrow();
  });
});
