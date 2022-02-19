<script setup>
import { RouterView } from "vue-router";
import HttpStatusContainer from "./components/shared/HttpStatusContainer.vue";
</script>

<template>
  <div class="font-sans antialiased bg-gray-100 min-h-screen">
    <HttpStatusContainer />
    <RouterView />
  </div>
</template>
