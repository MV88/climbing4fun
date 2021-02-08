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
      <form
        validated="isValidPassword || isValidEmail || isValidUsername"
        @submit.prevent="isSignUp ? signup() : signin()"
      >
        <div class="form-group">
          <label for="email">Email (*)</label>
          <b-form-input
            id="email"
            v-model="email"
            :state="alreadyUsed.email ? false : isValidEmail"
            type="email"
            trim
            class="form-control form-control-lg"
            @input="resetServerErrors('email')"
          />
          <b-form-invalid-feedback id="email-feedback">
            {{
              (alreadyUsed.email && "Already in use") ||
              (!isValidEmail && "Insert a valid email address")
            }}
            <li v-for="error in emailErrors" :key="error">
              {{ error }}
            </li>
          </b-form-invalid-feedback>
        </div>
        <div class="form-group">
          <label>Password (*)</label>
          <b-form-input
            v-model="password"
            :state="isValidPassword"
            type="password"
            class="form-control form-control-lg"
            @input="resetServerErrors('password')"
          />
          <b-form-invalid-feedback id="email-feedback">
            <li v-for="error in passwordErrors" :key="error">
              {{ error }}
            </li>
          </b-form-invalid-feedback>
        </div>
        <div v-if="isSignUp" class="form-group">
          <label>Name</label>
          <b-form-input
            v-model="name"
            :state="isValidName"
            type="text"
            class="form-control form-control-lg"
          />
        </div>
        <div v-if="isSignUp" class="form-group">
          <label>Username (*)</label>
          <b-form-input
            v-model="username"
            :state="alreadyUsed.username ? false : isValidUsername"
            type="text"
            class="form-control form-control-lg"
            @input="resetServerErrors('username')"
          />
          <b-form-invalid-feedback id="username-feedback">
            {{ alreadyUsed.username && "Already in use" }}
            <li v-for="error in usernameErrors" :key="error">
              {{ error }}
            </li>
          </b-form-invalid-feedback>
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
import { mapState } from "vuex";
import * as yup from "yup";

export default {
  data() {
    // TODO remove this values
    return {
      email: "Chronos3@chronos.com",
      name: "",
      username: "Chronos",
      password: "Chronos77!",
      isSignUp: false,
      emailErrors: [],
      passwordErrors: [],
      usernameErrors: [],
    };
  },
  computed: {
    ...mapState({
      alreadyUsed: (state) =>
        state.auth?.alreadyUsed?.reduce((errors, field) => {
          return { ...errors, [field?.toString().toLowerCase()]: true };
        }, {}) || {},
    }),
    isValidPassword() {
      const userPwdValidation = yup.object().shape({
        password: yup
          .string()
          .min(8, "must be at least 8 characters")
          .max(100)
          .matches(/[^a-zA-Z0-9]/, "must contain a special character")
          .matches(/[a-z]/, "must contain a lower case letter")
          .matches(/[A-Z]/, "must contain an upper case letter")
          .matches(/[0-9]/, "must contain a number"),
      });
      const password = this.password || "";
      try {
        userPwdValidation.validateSync(
          { password },
          {
            abortEarly: false,
          }
        );
        return true;
      } catch (error) {
        this.setPasswordErrors(error.errors);
        return false;
      }
    },
    isValidEmail() {
      const emailSchemaValidation = yup.object().shape({
        email: yup.string().trim().email().required(),
      });
      const email = this.email || "";
      try {
        emailSchemaValidation.validateSync(
          { email },
          {
            abortEarly: false,
          }
        );
        return true;
      } catch (error) {
        this.setEmailErrors(error.errors);
        return false;
      }
    },
    isValidUsername() {
      const usernameSchemaValidation = yup.object().shape({
        username: yup.string().trim().min(2).required(),
      });
      const username = this.username || "";
      try {
        usernameSchemaValidation.validateSync(
          { username },
          {
            abortEarly: false,
          }
        );
        return true;
      } catch (error) {
        this.setUsernameErrors(error.errors);
        return false;
      }
    },
    isValidName() {
      const name = this.name || "";
      return name.length ? true : undefined;
    },
  },
  methods: {
    setEmailErrors(errors) {
      this.emailErrors = errors;
    },
    setPasswordErrors(errors) {
      this.passwordErrors = errors;
    },
    setUsernameErrors(errors) {
      this.usernameErrors = errors;
    },
    resetServerErrors(name) {
      if (this.$store.state.auth.alreadyUsed?.includes(name)) {
        this.$store.commit("resetServerErrors", name);
      }
    },
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
