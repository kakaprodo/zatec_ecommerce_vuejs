import http from "../utilities/http-client";

const defaultOptions = {
  searchValue: null,
  onSuccess: () => {},
  onError: () => {},
  onComplete: () => {}
};

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
  formatResponse: (response, requestOptions = defaultOptions) => {
    requestOptions = { ...defaultOptions, ...requestOptions };

    requestOptions.onComplete();

    if (response.status !== 200) return requestOptions.onError();

    const products = response.data.data;

    requestOptions.onSuccess(products);

    return products;
  },
};

export default productApi;
