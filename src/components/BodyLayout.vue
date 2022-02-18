<template>
  <div>
    <TopNav />
    <div class="max-w-7xl mx-auto px-6 sm:px-8 bg-white py-10 mb-10">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TopNav from "./nav/TopNav.vue";
export default {
  components: { TopNav },
};
</script>
