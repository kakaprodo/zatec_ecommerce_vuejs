import { createStore } from "vuex";
import httpStatus from "./modules/http-status";
import user from "./modules/user";

const store = createStore({
  modules: {
    httpStatus,
    user,
  },
  state: function () {
    return {
      message: "main store",
    };
  },
});

export default store;
