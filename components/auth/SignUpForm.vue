<template>
  <div class="vue-template">
    <b-modal id="signUpForm" title="Sign Up" hide-footer>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label>Email address</label>
          <input
            v-model="email"
            type="email"
            class="form-control form-control-lg"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control form-control-lg"
          />
        </div>
        <div class="form-group">
          <label>Name</label>
          <input
            v-model="name"
            type="name"
            class="form-control form-control-lg"
          />
        </div>
        <div class="form-group">
          <label>Username</label>
          <input
            v-model="username"
            type="username"
            class="form-control form-control-lg"
          />
        </div>
        <button class="btn btn-dark btn-lg btn-block" type="submit">
          Sign Up
        </button>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    // TODO remove this
    return {
      email: "Chronos3@chronos.com",
      name: "Chronos",
      username: "Chronos",
      password: "Chronos77!",
    };
  },
  computed: {},
  methods: {
    signup() {
      console.log("call /signup");
    },
    signin() {
      this.$axios
        .$post("/api/v1/auth/signin", {
          password: this.password,
          email: this.email,
        })
        .then((userData) => {
          this.$store.commit("setUser", userData);
          this.$emit("resolved");
          this.$bvModal.hide("signInForm");
        });
    },
  },
};
</script>
