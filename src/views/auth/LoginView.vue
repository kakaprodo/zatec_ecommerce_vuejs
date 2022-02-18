<template>
  <div class="hero min-h-screen">
    <div class="card w-full max-w-lg card-bordered shadow-md bg-white">
      <div class="card-body">
        <span class="card-title">Login</span>
        <form @submit="login">
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
          <div class="form-control mt-6">
            <button
              type="submit"
              :class="`btn btn-primary ${isLoading && 'btn-loading'}`"
            >
              Login
            </button>
          </div>
        </form>
        <div class="divider">Or</div>
        <div class="flex place-content-center">
          <span>You don't have an account, then </span>
          <a class="text-primary pl-3">Register</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from "../../api/users-api";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    login: async function (e) {
      e.preventDefault();

      await userApi.login({
        email: this.email,
        password: this.password,
        onSuccess: () => {},
      });
    },
  },
};
</script>
