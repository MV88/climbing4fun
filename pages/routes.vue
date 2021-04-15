<template>
  <div class="flex-container" @click="showPopoverById(null)">
    <b-container>
      <RouteTable
        v-if="isLoggedIn"
        :item-id="routeId"
        :items="climbingRoutes"
        @showPopoverById="showPopoverById"
        @updateItemById="updateItemById"
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

      <ClimbingRoutesEditForm @updateItemById="updateItemById" />
      <ClimbingRoutesAddForm @updateListItem="updateListItem" />
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
      this.$store.commit("setEditingItem", null);
      this.$bvModal.show("climbingRouteAddForm");
    },
    editItem(item) {
      this.$store.commit("setEditingItem", { ...item });
      this.$bvModal.show("climbingRouteEditForm");
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
      this.$store.commit("setEditingItem", null);
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
