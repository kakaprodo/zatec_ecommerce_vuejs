<template>
  <div>
    <div class="card lg:card-side card-bordered shadow-none">
      <div class="card-body py-3 px-0">
        <div
          class="flex flex-col place-items-center text-center sm:flex-row sm:text-left sm:place-items-start space-x-5 py-2"
        >
          <div class="avatar placeholder">
            <div
              class="bg-indigo-300 text-neutral-content rounded-full w-32 h-32"
            >
              <span class="text-3xl">P</span>
            </div>
          </div>
          <div class="pt-5">
            <h2 class="card-title">{{ authUser?.name }}</h2>
            <p>{{ authUser?.email }}</p>
          </div>
        </div>

        <div>
          <div class="grid-flow-row w-full sm:grid-flow-col shadow stats">
            <div
              class="stat place-items-center sm:place-items-start place-content-center"
            >
              <div class="stat-title">Account Balance</div>
              <div class="stat-value">{{ authUser?.balance }} $</div>
            </div>
            <div
              class="stat place-items-center sm:place-items-start place-content-center"
            >
              <div class="stat-title">Purchases</div>
              <div class="stat-value">{{ authUser?.purchases_count || 0 }}</div>
            </div>
            <div class="stat place-content-center">
              <div class="stat-title text-center sm:text-left">
                Topup your account
              </div>
              <br />
              <form @submit="topupAccount">
                <div class="form-control">
                  <div class="relative">
                    <input
                      type="number"
                      placeholder="Add money"
                      class="w-full pr-16 input input-primary input-bordered"
                      v-model="amount"
                    />
                    <button
                      type="submit"
                      :class="`absolute top-0 right-0 rounded-l-none btn btn-primary ${
                        isLoading && 'loading'
                      }`"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from "../../api/users-api";
import Sh from "../../utilities/shared-helper";
export default {
  props: ["authUser"],
  data() {
    return {
      amount: "",
      isLoading: false,
    };
  },
  methods: {
    topupAccount: async function (e) {
      e.preventDefault();

      await userApi.topupAccount({
        formData: { amount: this.amount },
        onComplete: () => (this.isLoading = false),
      });

      this.amount = "";

      await Sh.setAuthUser();
    },
  },
};
</script>
