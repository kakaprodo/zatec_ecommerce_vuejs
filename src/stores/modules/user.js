import Sh from "../../utilities/shared-helper";
import Mutations from "../mutations";

const user = {
  namespaced: true,
  state: function () {
    return {
      user: Sh.getAuthUser(),
    };
  },

  mutations: {
    [Mutations.SET_AUTH_USER]: (state, payload) => (state.user = payload.user),
    [Mutations.INITIALIZE]: (state) => (state.user = null),
  },

  getters: {
    authed: (state) => state.user?.id !== undefined,
  }
};

export default user;
