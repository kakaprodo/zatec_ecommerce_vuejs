<script setup>
import UserTransactions from "./UserTransactions.vue";
import UserPurchases from "./UserPurchases.vue";
</script>
<template>
  <div>
    <div class="tabs mt-5">
      <span
        @click="tabIndex = 0"
        :class="`tab tab-lg tab-lifted ${tabIndex === 0 && 'tab-active'}`"
      >
        Transactions
      </span>
      <span
        @click="tabIndex = 1"
        :class="`tab tab-lg tab-lifted ${tabIndex === 1 && 'tab-active'}`"
      >
        Purchases
      </span>
    </div>
    <div v-if="tabIndex === 0"><UserTransactions /></div>
    <div v-if="tabIndex === 1"><UserPurchases /></div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      tabIndex: 0,
    };
  },
};
</script>
