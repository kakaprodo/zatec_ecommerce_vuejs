import http from "../utilities/http-client";
import Sh from "../utilities/shared-helper";
import defaultOptions from "./index-api";

const userApi = {
  login: async function (options = defaultOptions) {
    const resp = await http.post("login", {
      email: options.email,
      password: options.password,
    });

    if (resp.status !== 200) return;

    await Sh.saveAuthToken(resp.data.token);
  },
};

export default userApi;
