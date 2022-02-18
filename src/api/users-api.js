import http from "../utilities/http-client";
import Sh from "../utilities/shared-helper";
import defaultOptions from "./index-api";

const userApi = {
  login: async function (options = defaultOptions) {
    const resp = await http.post("login", options.formData);

    if (resp.status == 200) await Sh.saveAuthToken(resp.data.token);

    this.formatResponse(resp, options);
  },

  register: async function (options = defaultOptions) {
    const resp = await http.post("register", options.formData);

    if (resp.status == 201) await Sh.saveAuthToken(resp.data.token);

    this.formatResponse(resp, options);
  },

  topupAccount: async function (options = defaultOptions) {
    const resp = await http.post("topup-account", options.formData);

    this.formatResponse(resp, options);
  },

  userTransactions: async function (options = defaultOptions) {
    const resp = await http.get("user-transactions");

    return this.formatResponse(resp, options);
  },

  formatResponse: (response, requestOptions = defaultOptions) => {
    requestOptions = {
      ...defaultOptions,
      ...requestOptions,
    };

    requestOptions.onComplete();

    if (response.status !== 200 && response.status !== 201) {
      return requestOptions.onError();
    }

    const data = response?.data?.data;

    requestOptions.onSuccess(data);

    return data;
  },
};

export default userApi;
