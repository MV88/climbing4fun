<template>
  <div class="vue-template">
    <b-modal id="signInForm" title="Sign In" hide-footer>
      <form @submit.prevent="signin">
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

        <button class="btn btn-dark btn-lg btn-block" type="submit">
          Sign In
        </button>

        <p class="forgot-password text-right mt-2 mb-4">Forgot password ?</p>
        <p class="forgot-password text-right mt-2 mb-4">
          Not registered? <b-btn @click="signup">Sign up</b-btn>
        </p>
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
      password: "Chronos77!",
    };
  },
  computed: {},
  methods: {
    signup() {
      this.$bvModal.hide("signInForm");
      setTimeout(() => {
        this.$bvModal.show("signUpForm");
      }, 1000);
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
