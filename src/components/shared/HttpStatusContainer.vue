<template>
  <div
    v-if="canShowAlert"
    class="absolute w-full flex place-content-center place-items-start z-50 top-20 text-gray-500"
  >
    <div
      :class="`flex justify-between py-5 p-5 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 ${
        isSuccess ? 'bg-green-100' : 'bg-red-100'
      }`"
    >
      <div>
        <div v-if="isSuccess">
          <div class="alert alert-success">
            <div class="flex-1">
              <label>{{ successMessage }}</label>
            </div>
          </div>
        </div>

        <div v-else>
          <div v-if="errorStatus === 422">
            <div>
              <p>{{ errorTitle }}</p>
              <ul>
                <li
                  v-for="(fieldName, index) in Object.keys(errorFields)"
                  :key="index"
                >
                  {{ index + 1 }}. {{ errorFields[fieldName][0] }}
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <div class="alert alert-error">
              <div class="flex-1">
                <label>
                  {{ simpleErrorMessage }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          @click="closeAlert"
          :class="`btn btn-${
            errorStatus === 401 ? 'error' : 'ghost'
          } btn-sm btn-outline`"
        >
          <span v-if="errorStatus === 401">Login</span>
          <span v-else>Close</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import StoreModules from "../../stores/module-names";
import Mutations from "../../stores/mutations";

export default {
  methods: {
    ...mapMutations(StoreModules.HTTP_STATUS, {
      closeAlert: Mutations.INITIALIZE,
    }),
  },
  computed: {
    ...mapState(StoreModules.HTTP_STATUS, [
      "canFireError",
      "errorTitle",
      "errorMessage",
      "errorStatus",
      "errorFields",
      "successMessage",
      "isSuccess",
    ]),
    canShowAlert: function () {
      return this.isSuccess || this.canFireError;
    },
    simpleErrorMessage: function () {
      return this.errorStatus === 401
        ? "Please, you need to login for making this action"
        : this.errorMessage;
    },
  },
};
</script>
