/* eslint-disable vue/attribute-hyphenation */
<template>
  <b-container class="start">
    <RouteTable
      v-if="isLoggedIn"
      :items="climbingRoutes"
      @addClimbingRoute="addClimbingRoute"
    />
    <div>
      <h4>TODO: Filters</h4>
      <ul>
        <li>By Grade</li>
        <li>By Sector</li>
        <li>By City</li>
      </ul>
    </div>
    <ClimbingRoutesForm @update="update" />
  </b-container>
</template>

<script>
export default {
  name: "Routes",
  data() {
    return {
      climbingRoutes: [],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  mounted() {
    this.$axios.get("api/v1/climbing-routes").then((response) => {
      this.climbingRoutes = response.data.result;
    });
  },
  methods: {
    addClimbingRoute() {
      this.$bvModal.show("addClimbingRouteForm");
    },
    update(item) {
      this.climbingRoutes.push(item);
    },
  },
};
</script>
