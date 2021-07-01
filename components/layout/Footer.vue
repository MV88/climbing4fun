<template>
  <b-navbar
    class="footer"
    toggleable="lg"
    type="dark"
    variant="info"
    :fixed="bottom"
  >
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
  data() {
    return {
      bottom: window.innerWidth > 1024 ? "bottom" : "",
    };
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
