<template>
  <BodyLayout>
    <ProfileHeader :auth-User="authUser" :refresh-User-Data="refreshUserData" />

    <ProfileTabs />
  </BodyLayout>
</template>
<script>
import ProfileHeader from "../../components/users/ProfileHeader.vue";
import ProfileTabs from "../../components/users/ProfileTabs.vue";
import Sh from "../../utilities/shared-helper";
export default {
  data: function () {
    return {
      authUser: {},
    };
  },
  mounted: async function () {
    this.authUser = await Sh.getAuthUser();
  },

  methods: {
    refreshUserData: async function () {
      await Sh.setAuthUser();

      this.authUser = await Sh.getAuthUser();
    },
  },

  components: { ProfileHeader, ProfileTabs },
};
</script>
