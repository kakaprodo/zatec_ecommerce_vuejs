<script setup>
import RouteName from "../../utilities/route-names";
</script>
<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="card w-full max-w-lg card-bordered shadow-md bg-white">
      <div class="card-body">
        <span class="card-title">Register</span>
        <form @submit="register">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              class="input input-bordered"
              v-model="name"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              required
              placeholder="email"
              class="input input-bordered"
              v-model="email"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="password"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="confirmPassword"
            />
          </div>
          <div class="form-control mt-6">
            <button
              type="submit"
              :class="`btn btn-primary ${isLoading && 'loading'}`"
            >
              Register
            </button>
          </div>
        </form>
        <div class="divider">Or</div>
        <div class="flex place-content-center">
          <span>If you have an account, then </span>
          <RouterLink :to="RouteName.LOGIN" class="text-primary pl-3"
            >Login
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from "../../api/users-api";
import Sh from "../../utilities/shared-helper";

export default {
  data: function () {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isLoading: false,
    };
  },
  methods: {
    register: async function (e) {
      e.preventDefault();

      this.isLoading = true;

      userApi.register({
        formData: {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
        },
        onSuccess: () => Sh.redirectTo(RouteName.USER_PROFILE),
        onComplete: () => (this.isLoading = false),
      });
    },
  },
};
</script>
