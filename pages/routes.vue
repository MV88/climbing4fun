<template>
  <span>
    <Header />
    <b-container class="start">
      <h3>Routes</h3>
      <Table v-if="isLoggedIn" />
    </b-container>
  </span>
</template>

<script>
export default {
  name: "Routes",
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
