<script setup>
import RouteName from "../../utilities/route-names";
</script>
<template>
  <div className="hero min-h-screen bg-base-200">
    <div className="card w-full max-w-lg card-bordered shadow-md bg-white">
      <div className="card-body">
        <span className="card-title">Register</span>
        <form @submit="register">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input  input-bordered"
              v-model="name"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              required
              placeholder="email"
              class="input input-bordered"
              v-model="email"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="password"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="confirmPassword"
            />
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              :class="`btn btn-primary ${isLoading && 'loading'}`"
            >
              Register
            </button>
          </div>
        </form>
        <div className="divider">Or</div>
        <div className="flex place-content-center">
          <span>If you have an account, then </span>
          <RouterLink :to="RouteName.LOGIN" className="text-primary pl-3"
            >Login
          </RouterLink>
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

      await userApi.register({
        formData: {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
        },
        onSuccess: () => {},
        onComplete: () => (this.isLoading = false),
      });
    },
  },
};
</script>
