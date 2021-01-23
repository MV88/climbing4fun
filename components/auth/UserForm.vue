<template>
  <div class="vue-template">
    <b-modal
      id="UserForm"
      :title="isSignUp ? 'Sing Up' : 'Sign In'"
      hide-footer
    >
      <p v-if="!isSignUp" class="forgot-password text-right mt-2 mb-4">
        Not registered? <b-btn @click="setFormType('signup')">Sign up</b-btn>
      </p>
      <p v-if="isSignUp" class="forgot-password text-right mt-2 mb-4">
        You have already an account?
        <b-btn @click="setFormType('signin')">Sign in</b-btn>
      </p>
      <form @submit.prevent="isSignUp ? signup() : signin()">
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
        <div v-if="isSignUp" class="form-group">
          <label>Name</label>
          <input
            v-model="name"
            type="name"
            class="form-control form-control-lg"
          />
        </div>
        <div v-if="isSignUp" class="form-group">
          <label>Username</label>
          <input
            v-model="username"
            type="username"
            class="form-control form-control-lg"
          />
        </div>
        <button class="btn btn-dark btn-lg btn-block" type="submit">
          {{ isSignUp ? "Sign Up" : "Sign In" }}
        </button>
        <p class="forgot-password text-right mt-2 mb-4">Forgot password ?</p>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    // TODO remove this values
    return {
      email: "Chronos3@chronos.com",
      name: "Chronos",
      username: "Chronos",
      password: "Chronos77!",
      isSignUp: false,
    };
  },
  computed: {
    getError() {
      return this.$store.user.error;
    },
  },
  methods: {
    setFormType(type) {
      this.isSignUp = type === "signup";
    },
    signup() {
      this.$axios
        .$post("/api/v1/auth/signup", {
          password: this.password,
          email: this.email,
          username: this.username,
          name: this.name,
        })
        .then((userData) => {
          this.$store.commit("setUser", userData);
          this.$emit("resolved");
          this.$bvModal.hide("userForm");
        })
        .catch((error) => {
          this.$store.commit("setUserErrors", error.response.data);
        });
    },
    signin() {
      this.isSignUp = false;
      this.$axios
        .$post("/api/v1/auth/signin", {
          password: this.password,
          email: this.email,
        })
        .then((userData) => {
          this.$store.commit("setUser", userData);
          this.$emit("resolved");
          this.$bvModal.hide("userForm");
        })
        .catch((error) => {
          this.$store.commit("setUserErrors", error.response.data);
        });
    },
  },
};
</script>
