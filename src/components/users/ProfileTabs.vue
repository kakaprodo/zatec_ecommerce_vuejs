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
        :class="`tab tab-lg tab-lifted ${tabIndex === 0 && 'tab-active'}`"
      >
        Purchases
      </span>
    </div>
    <div>{{ tabContent() }}</div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      tabIndex: 0,
    };
  },
  methods: {
    tabContent: function () {
      return ["<div>Transaction<div>", "<div>Purchaes<div>"][this.tabIndex];
    },
  },
};
</script>
