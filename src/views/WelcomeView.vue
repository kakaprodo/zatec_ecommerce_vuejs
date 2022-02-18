<template>
  <BodyLayout>
    <div class="max-w-xl mx-auto lg:flex-none">
      <form onSubmit="{searchProduct}">
        <div class="form-control">
          <div class="relative">
            <input
              type="text"
              placeholder="Search for a product very quick here"
              class="w-full pr-16 input input-primary input-bordered"
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
    </div>
    <div class="divider"></div>
    <ListProduct :products="products" />
  </BodyLayout>
</template>

<script>
import BodyLayout from "../components/BodyLayout.vue";
import ListProduct from "../components/products/ListProduct.vue";

export default {
  data: function () {
    return {
      products: [
        {
          name: "Bugger",
          price: 12,
          image: "https://picsum.photos/200/300",
        },
      ],
    };
  },
  components: { ListProduct, BodyLayout },
};
</script>
