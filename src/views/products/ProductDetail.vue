<template>
  <BodyLayout>
    <p v-if="!product">
      <span v-if="apiWasCalled"><span>Product Not found</span></span>
      <span v-if="!apiWasCalled">Loading...</span>
    </p>
    <div
      v-if="product"
      class="card md:card-side card-bordered shadow-sm rounded-none"
    >
      <figure>
        <img :src="product.image" alt="single product" class="h-64" />
      </figure>
      <div class="card-body space-y-2 py-3">
        <h2 class="card-title">{{ product.name }}</h2>
        <p>
          Price: <span class="text-2xl font-bold">{{ product.price }}$</span>
        </p>
        <p>
          Quantity:
          <input
            type="number"
            class="input input-sm input-bordered ml-2"
            v-model="quantity"
          />
        </p>
        <p>
          Gross amount:
          <span class="line-through">{{ product.price * quantity }}$</span>
        </p>
        <p>Discount Amount {{ purchaseDiscount }}% : {{ discountAmount }} $</p>
        <p>Total: {{ netPrice || product.price }} $</p>
        <div class="card-actions">
          <button
            @click="confirmPurchase"
            :class="`btn btn-primary btn-sm btn-outline ${
              isLoading && 'loading'
            }`"
          >
            Confirm purchase
          </button>
        </div>
      </div>
    </div>
  </BodyLayout>
</template>
<script>
import productApi from "../../api/products-api";
import RouteName from "../../utilities/route-names";
import Sh from "../../utilities/shared-helper";

export default {
  data: function () {
    return {
      productId: this.$route.params.productId,
      product: null,
      discounts: [],
      quantity: 1,
      discountAmount: 0,
      netPrice: 0,
      purchaseDiscount: 0,
      isLoading: false,
      apiWasCalled: false,
    };
  },
  mounted: async function () {
    this.product = await productApi.fetchProduct({
      formData: { productId: this.productId },
      onComplete: () => (this.apiWasCalled = true),
    });

    this.discounts = await productApi.fetchDiscountSettings();
  },
  methods: {
    confirmPurchase: async function () {
      this.isLoading = true;
      await productApi.purchaseProduct({
        formData: {
          product_id: this.productId,
          quantity: this.quantity,
        },
        onSuccess: async () => {
          await Sh.setAuthUser();
          this.$router.push(RouteName.USER_PROFILE);
        },
        onComplete: () => (this.isLoading = false),
      });
    },
  },
  watch: {
    quantity: function (val) {
      this.quantity = val;
      const grossPrice = this.product.price * this.quantity;
      this.purchaseDiscount = Sh.findDiscount(grossPrice, this.discounts);
      this.discountAmount = (grossPrice * this.purchaseDiscount) / 100;
      this.netPrice = grossPrice - this.discountAmount;
    },
  },
};
</script>
