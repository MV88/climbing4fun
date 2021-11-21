<template>
  <b-btn>
    <a target="_blank" class="discord" :href="discord">
      <b-icon icon="discord" />
      Discord
    </a>
  </b-btn>
</template>

<script>
export default {
  name: "Donate",
  computed: {
    discord() {
      return this.$store.getters.discord;
    },
  },
};
</script>

<style>
.discord {
  color: white;
}
</style>
