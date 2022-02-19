import { createStore } from "vuex";
import httpStatus from "./modules/http-status";

const store = createStore({
  modules: {
    httpStatus,
  },
  state: function () {
    return {
      message: "main store",
    };
  },
});

export default store;
