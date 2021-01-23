<template>
  <b-navbar sticky toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">
      <b-img src="../assets/Mediamodifier-Design.svg" height="36" />
      <NuxtLink to="/" tag="span"> Climbing 4 fun </NuxtLink>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <NuxtLink to="/routes" tag="span"> Routes </NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/ropes" tag="span"> Ropes </NuxtLink>
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
        <SignInForm :key="signInFormKey" @resolved="signInFormKey++" />
        <SignUpForm :key="signUpFormKey" @resolved="signUpFormKey++" />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      signInFormKey: 1,
      signUpFormKey: 1,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.accessToken;
    },
  },
  methods: {
    signin() {
      this.$bvModal.show("signInForm");
    },
    signout() {
      // TODO call signout
      this.$store.commit("setUser", { user: {} });
    },
  },
};
</script>

<style></style>
