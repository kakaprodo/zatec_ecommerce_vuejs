import http from "../utilities/http-client";
import Sh from "../utilities/shared-helper";
import defaultOptions from "./index-api";

const productApi = {
  fetchAll: async function (options = { ...defaultOptions }) {
    const resp = await http.get("products");

    return this.formatResponse(resp, options);
  },

  searchProducts: async function (options = defaultOptions) {
    const resp = await http.post("search-products", {
      search_value: options.searchValue,
    });

    return this.formatResponse(resp, options);
  },

  fetchProduct: async function (options = defaultOptions) {
    const {
      formData: { productId },
    } = options;

    const resp = await http.get(`products/${productId}`);

    return this.formatResponse(resp, options);
  },

  fetchDiscountSettings: async function (options = defaultOptions) {
    const resp = await http.get("discounts");

    return this.formatResponse(resp, options);
  },

  purchaseProduct: async function (options = defaultOptions) {
    const resp = await http.post("purchases", options.formData);

    return this.formatResponse(resp, options);
  },

  formatResponse: (response, requestOptions = defaultOptions) => {
    requestOptions = { ...defaultOptions, ...requestOptions };

    requestOptions.onComplete();

    if (!Sh.statusIsOk(response.status)) return requestOptions.onError();

    const data = response.data.data || response.data;

    requestOptions.onSuccess(data);

    return data;
  },
};

export default productApi;
