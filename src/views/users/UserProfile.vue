<template>
  <BodyLayout>
    <ProfileHeader :auth-User="authUser" />

    <ProfileTabs />
  </BodyLayout>
</template>
<script>
import { mapState } from "vuex";
import ProfileHeader from "../../components/users/ProfileHeader.vue";
import ProfileTabs from "../../components/users/ProfileTabs.vue";
import StoreModules from "../../stores/module-names";
export default {
  computed: {
    ...mapState(StoreModules.USER, {
      authUser: "user",
    }),
  },

  components: { ProfileHeader, ProfileTabs },
};
</script>
