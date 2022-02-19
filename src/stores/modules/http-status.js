import Sh from "../../utilities/shared-helper";
import Mutations from "../mutations";

const httpStatus = {
  namespaced: true,
  state: function () {
    return {
      canFireError: false,
      errorTitle: "Oops",
      errorMessage: "",
      errorStatus: "",
      errorFields: {},
      successMessage: "Successfully done",
      isSuccess: false,
    };
  },
  mutations: {
    [Mutations.AXIOS_ERROR]: function (state, payload) {
      const errorResponse = payload.errorResponse;

      const errorData = errorResponse?.data;
      let msg = payload.errorMessage;

      state.errorMessage = msg;
      state.canFireError = !Sh.isEmpty(msg);
      state.errorStatus = errorResponse?.status || null;
      state.errorFields = errorData?.errors || {};
    },

    [Mutations.AXIOS_SUCCESS]: function (state, payload) {
      const successMsg = payload.successMessage;

      state.successMessage = successMsg;
      state.isSuccess = !Sh.isEmpty(successMsg);
    },

    [Mutations.INITIALIZE]: function (state) {
      state.canFireError = false;
      state.errorTitle = "Oops";
      state.errorMessage = "";
      state.errorStatus = "";
      state.errorFields = {};
      state.successMessage = "Successfully done";
      state.isSuccess = false;
    },
  },
};

export default httpStatus;
