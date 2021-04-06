<template>
  <b-navbar sticky toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">
      <b-img src="../assets/Mediamodifier-Design.svg" height="36" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <NuxtLink to="/" tag="span"> Home </NuxtLink>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="isLoggedIn">
        <b-nav-item>
          <NuxtLink to="/routes" tag="span"> Routes </NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/ropes" tag="span"> Ropes </NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/attempts" tag="span"> Attempts </NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/gallery" tag="span"> Gallery </NuxtLink>
        </b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <div v-if="!isLoggedIn">
            <b-button size="sm" class="my-2 my-sm-0" @click="signin">
              SignIn
            </b-button>
          </div>
          <div v-if="isLoggedIn">
            <b-button size="sm" class="my-2 my-sm-0" @click="signout">
              Signout
            </b-button>
            <b-avatar variant="info" src="https://placekitten.com/300/300" />
          </div>
        </b-nav-form>
        <UserForm :key="userFormKey" @resolved="userFormKey++" />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import UserForm from "./auth/UserForm.vue";

export default {
  name: "Header",
  components: {
    UserForm,
  },
  data() {
    return {
      userFormKey: 1,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    signin() {
      this.$bvModal.show("UserForm");
    },
    signout() {
      this.$axios.$post("/api/v1/auth/signout", {});
      this.$store.commit("setUser", { user: {} });
      this.$store.$router.push("/");
    },
  },
};
</script>

<style>
.hide {
  display: none;
}
</style>
