<template>
  <div class="route-container" @click="showPopoverById(null)">
    <b-container>
      <RouteTable
        v-if="isLoggedIn"
        :show-id="routeId"
        :items="climbingRoutes"
        @updateRouteId="showPopoverById"
        @editItem="editItem"
        @deleteItemById="deleteItemById"
      />
      <b-row>
        <h4>TODO: Filters</h4>
        <ul>
          <li>By Grade</li>
          <li>By Sector</li>
          <li>By City</li>
        </ul>
      </b-row>

      <ClimbingRoutesForm
        :editing-route="editingRoute"
        @updateItemById="updateItemById"
        @updateListItem="updateListItem"
      />
    </b-container>
    <div class="right-sidebar">
      <div class="right-column">
        <b-btn @click="addItem">
          <b-icon icon="plus" scale="1.5" />
        </b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import findIndex from "lodash/findIndex";
export default {
  name: "Routes",
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
    addItem() {
      this.editingRoute = null;
      this.$bvModal.show("addClimbingRouteForm");
    },
    editItem(item) {
      this.editingRoute = item;
      this.$bvModal.show("addClimbingRouteForm");
    },
    async deleteItemById(id) {
      await this.$axios.$delete(`/api/v1/climbing-routes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.getters.accessToken}`,
        },
      });
      this.getData();
    },
    updateListItem(item) {
      this.climbingRoutes.push(item);
    },
    updateItemById(id, item) {
      this.climbingRoutes.splice(
        findIndex(this.climbingRoutes, { id }),
        1,
        item
      );
    },
  },
};
</script>

<style>
.route-container {
  display: flex;
}
</style>
