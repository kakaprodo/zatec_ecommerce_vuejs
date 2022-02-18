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

  formatResponse: (response, requestOptions = defaultOptions) => {
    requestOptions = { ...defaultOptions, ...requestOptions };

    requestOptions.onComplete();

    if (response.status !== 200 && response.status !== 201) {
      return requestOptions.onError();
    }

    requestOptions.onSuccess();
  },
};

export default userApi;
