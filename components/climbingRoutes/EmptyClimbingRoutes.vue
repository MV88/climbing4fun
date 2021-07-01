<template>
  <b-card tag="article" class="route-card">
    <small>
      <b-btn id="add" @click.stop="addNew()"> Add </b-btn> Click here to add new
      climbing route
    </small>
  </b-card>
</template>

<script>
export default {
  name: "EmptyClimbingRoutes",
  data() {
    return {
      size: 200,
      showDelete: false,
    };
  },
  methods: {
    addNew() {
      this.$bvModal.show("climbingRouteAddForm");
    },
  },
};
</script>

<style></style>
