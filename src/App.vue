<script setup>
import { RouterView } from "vue-router";
import ErrorContainer from "./components/shared/ErrorContainer.vue";
</script>

<template>
  <div class="font-sans antialiased bg-gray-100 min-h-screen">
    <ErrorContainer />
    <RouterView />
  </div>
</template>
