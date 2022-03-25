<script setup>
import userApi from "../../api/users-api";
import Sh from "../../utilities/shared-helper";
</script>

<template>
  <div class="bg-gray-50 p-0 sm:p-5">
    <div class="h2 text-xl">Your transactions</div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <span v-if="!transactions.length"
        >You haven't yet perform any transaction</span
      >
      <div
        v-for="(transaction, index) in transactions"
        :key="`${index}-transaction`"
        class="card lg:card-side card-bordered shadow-md"
      >
        <div class="card-body flex-row justify-between">
          <div>
            <h2 class="text-lg">{{ transaction.description }}</h2>
            <p class="text-sm">{{ transaction.type }}</p>
            <small>{{ Sh.dateFormat(transaction.created_at) }}</small>
          </div>
          <div>
            <p class="text-xl font-bold">{{ transaction.amount }}$</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      transactions: [],
    };
  },
  mounted: async function () {
    this.transactions = await userApi.userTransactions();
  },
};
</script>
