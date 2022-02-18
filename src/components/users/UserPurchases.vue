<script setup>
import userApi from "../../api/users-api";
import Sh from "../../utilities/shared-helper";
</script>
<template>
  <div class="bg-gray-50 p-0 sm:p-5">
    <div class="h2 text-xl">All your purchases</div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
    >
      <div
        v-for="(purchase, index) in purchases"
        :key="`${index} 'purchses`"
        class="card card-bordered shadow-sm rounded-sm"
      >
        <figure>
          <img :src="purchase.image" alt="product" class="h-56" />
        </figure>
        <div class="card-body p-3">
          <h2 class="card-title">{{ purchase.product_name }}</h2>
          <p>Price: {{ purchase.price }}$</p>
          <p>Quantity: {{ purchase.quantity }}</p>
          <p>Discount: {{ purchase.discount }}%</p>
          <p>Discount amount: {{ purchase.discount_amount }}$</p>
          <p>Total: {{ purchase.total }}$</p>
          <small>created on: {{ Sh.dateFormat(purchase.created_at) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      purchases: [],
    };
  },
  mounted: async function() {
      this.purchases = await userApi.userPurchases();
  }
};
</script>
