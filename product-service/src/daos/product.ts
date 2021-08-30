import productList from "./productList.json";

export default {
  async getAllProducts() {
    return productList;
  },
  async getProductById(productId) {
    return productList.find(({ id }) => id === productId);
  },
};
