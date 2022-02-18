<template>
  <BodyLayout>
    <div class="max-w-xl mx-auto lg:flex-none">
      <form @submit="searchProduct">
        <div class="form-control">
          <div class="relative">
            <input
              type="text"
              placeholder="Search for a product very quick here"
              class="w-full pr-16 input input-primary input-bordered"
              v-model="searchValue"
            />
            <button
              type="submit"
              class="absolute top-0 right-0 rounded-l-none btn btn-primary"
            >
              Find it
            </button>
          </div>
        </div>
      </form>
      <div v-if="hasSearch && !products.length" class="py-5 text-red-400">
        No result found for the product : {searchValue}
      </div>
    </div>
    <div class="divider"></div>
    <ListProduct :products="products" />
  </BodyLayout>
</template>

<script>
import ListProduct from "../components/products/ListProduct.vue";
import productApi from "../api/products-api";
import Sh from "../utilities/shared-helper";

export default {
  data: function () {
    return {
      searchValue: "",
      products: [],
      hasSearch: false,
    };
  },
  mounted: function () {
    this.fetchProduct();
  },
  methods: {
    fetchProduct: async function () {
      this.products = await productApi.fetchAll();
    },
    searchProduct: async function (e) {
      e.preventDefault();

      this.products = await productApi.searchProducts({
        searchValue: this.searchValue,
        onComplete: () => (this.hasSearch = true),
      });
    },
  },
  components: { ListProduct },
  watch: {
    searchValue: function (val) {
      if (!Sh.isEmpty(val)) return;

      this.fetchProduct();
    },
  },
};
</script>
