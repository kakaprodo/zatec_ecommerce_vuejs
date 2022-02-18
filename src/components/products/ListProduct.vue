<script setup>
import RouteName from "../../utilities/route-names";
</script>
<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
  >
    <div
      v-for="(product, index) in products"
      :key="index + 'product'"
      class="card card-bordered shadow-sm rounded-sm"
    >
      <figure>
        <img :src="product.image" alt="product" class="h-56 w-full" />
      </figure>
      <div class="card-body p-3">
        <h2 class="card-title">{{ product.name }}</h2>
        <p>Price: {{ product.price }}$</p>
        <div class="my-3">
          <RouterLink
            :to="`${RouteName.SINGLE_PRODUCT}/${product.id}`"
            class="btn btn-primary btn-sm btn-outline"
            >Purchase
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["products"],
};
</script>
