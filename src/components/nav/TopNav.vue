<script setup>
import RouteName from "../../utilities/route-names";
import Sh from "../../utilities/shared-helper";
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50">
    <div class="navbar mb-2 shadow-lg bg-white text-neutral rounded-none">
      <div class="flex-1 px-2 mx-2">
        <span class="text-lg font-bold hover:cursor-pointer">
          {{ appName }}
        </span>
      </div>

      <div class="flex-none">
        <RouterLink :to="RouteName.LOGIN" class="btn btn-primary mx-2 btn-sm"
          >Login
        </RouterLink>
      </div>
      <div class="lex-none mx-3 hover:cursor-pointer">
        <RouterLink :to="RouteName.INDEX">Products</RouterLink>
      </div>

      <div class="dropdown dropdown-end flex-none mx-3 hover:cursor-pointer">
        <div tabIndex="0" class="avatar placeholder">
          <div
            class="bg-indigo-300 text-neutral-content rounded-full w-10 h-10"
          >
            <span class="text-3xl">P</span>
          </div>
        </div>
        <ul
          tabIndex="0"
          class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 mt-40"
        >
          <li>
            <RouterLink :to="RouteName.USER_PROFILE">My profile</RouterLink>
          </li>
          <li>
            <a href="a" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      appName: import.meta.env.VITE_APP_NAME,
    };
  },
  methods: {
    logout: (e) => {
      e.preventDefault();

      Sh.logoutUser();
    },
  },
};
</script>
