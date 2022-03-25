import axios from "axios";
import store from "../stores";
import StoreModules from "../stores/module-names";
import Mutations from "../stores/mutations";
import Sh from "./shared-helper";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

http.interceptors.request.use(async (config) => {
  const token = await Sh.storageGet("token");

  token && (config.headers.authorization = `Bearer ${token}`);

  return config;
});

http.interceptors.response.use(
  function (response) {
    const msg = response?.data?.message;

    if (msg) {
      store.commit({
        type: `${StoreModules.HTTP_STATUS}/${Mutations.AXIOS_SUCCESS}`,
        successMessage: msg,
      });
    }

    return response;
  },
  function (error) {
    const errorResp = error.response;
    const networkErrorMsg =
      error.message == "Network Error" ? error.message : null;

    if (!Sh.isEmpty(errorResp?.data?.message) || !Sh.isEmpty(networkErrorMsg)) {
      store.commit({
        errorMessage: errorResp?.data?.message || networkErrorMsg,
        errorResponse: errorResp || null,
        type: `${StoreModules.HTTP_STATUS}/${Mutations.AXIOS_ERROR}`,
      });
    }

    return Promise.resolve(error.response);
  }
);

export default http;
