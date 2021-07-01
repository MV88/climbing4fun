<template>
  <b-navbar class="footer" toggleable="lg" type="dark" variant="info">
    <Discord />
    <Author />
    <Donate />
  </b-navbar>
</template>

<script>
import Discord from "./Discord.vue";
import Donate from "./Donate.vue";
import Author from "./Author.vue";

export default {
  name: "Footer",
  components: {
    Discord,
    Author,
    Donate,
  },
  computed: {
    discord() {
      return this.$store.getters.discord;
    },
  },
};
</script>

<style>
.hide {
  display: none;
}
.donate {
  align-self: flex-end;
}
.footer {
  justify-content: space-between;
  min-height: 60px;
}
</style>
