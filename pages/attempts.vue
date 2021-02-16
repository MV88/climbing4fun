<template>
  <div class="flex-container" @click="showPopoverById(null)">
    <b-container>
      <AttemptsTable
        v-if="isLoggedIn"
        :show-id="attemptId"
        :items="attempts"
        @updateRouteId="showPopoverById"
        @addClimbingRoute="addClimbingRoute"
        @editRoute="editRoute"
        @deleteRouteById="deleteRouteById"
      />

      <ClimbingRoutesForm
        :editing-route="editingRoute"
        @updateById="updateById"
        @update="update"
      />
    </b-container>
    <div class="right-sidebar">
      <div class="right-column">
        <b-btn @click="addClimbingRoute">
          <b-icon icon="plus" scale="1.5" />
        </b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import findIndex from "lodash/findIndex";
export default {
  name: "Attempts",
  data() {
    return {
      climbingRoutes: [],
      routeId: null,
      editingRoute: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const routes = await this.$axios.$get("api/v1/climbing-routes");
      this.climbingRoutes = routes.result;
    },
    showPopoverById(routeId) {
      this.routeId = routeId;
    },
    addClimbingRoute() {
      this.editingRoute = null;
      this.$bvModal.show("addClimbingRouteForm");
    },
    editRoute(route) {
      this.editingRoute = route;
      this.$bvModal.show("addClimbingRouteForm");
    },
    async deleteRouteById(routeId) {
      await this.$axios.$delete(`/api/v1/climbing-routes/${routeId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.getters.accessToken}`,
        },
      });
      this.getData();
    },
    update(item) {
      this.climbingRoutes.push(item);
    },
    updateById(id, item) {
      this.climbingRoutes.splice(
        findIndex(this.climbingRoutes, { id }),
        1,
        item
      );
    },
  },
};
</script>

<style></style>
