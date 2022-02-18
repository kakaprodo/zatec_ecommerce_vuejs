<script setup>
import RouteName from "../../utilities/route-names";
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
};
</script>
