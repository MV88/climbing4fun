<template>
  <b-container>
    <div>
      Click here to
      <b-btn @click="addAttempt"> add an attempt </b-btn>
    </div>
    <AttemptsTable v-if="isLoggedIn" :attempts="attempts" />

    <AttemptsAddForm
      :ropes="ropes"
      :styles="styles"
      :routes="routes"
      @updateListItem="updateListItem"
    />
  </b-container>
</template>

<script>
// import findIndex from "lodash/findIndex";
import AttemptsAddForm from "../components/attempts/AttemptsAddForm.vue";

export default {
  name: "Attempts",
  components: {
    AttemptsAddForm,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    attempts() {
      return this.$store.getters.getResourcesAttempts;
    },
    routes() {
      return this.$store.getters.getResourcesRoutes;
    },
    ropes() {
      return this.$store.getters.getResourcesRopes;
    },
    styles() {
      return this.$store.getters.getResourcesStyles;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    addAttempt() {
      this.$store.commit("setEditingItem", null);
      this.$bvModal.show("attemptAddForm");
    },
    async getData() {
      if (this.attempts.length === 0) {
        const attempts = await this.$axios.$get("api/v1/attempts");
        this.$store.commit("setResources", {
          name: "attempts",
          resources: attempts.result,
        });
      }
      if (this.routes.length === 0) {
        const routes = await this.$axios.$get("api/v1/climbing-routes");
        this.$store.commit("setResources", {
          name: "routes",
          resources: routes.result,
        });
      }
      if (this.ropes.length === 0) {
        const ropes = await this.$axios.$get("api/v1/ropes");
        this.$store.commit("setResources", {
          name: "ropes",
          resources: ropes.result,
        });
      }
      if (this.styles.length === 0) {
        const styles = await this.$axios.$get("api/v1/styles");
        this.$store.commit("setResources", {
          name: "styles",
          resources: styles.result,
        });
      }
    },
    async updateListItem() {
      const attempts = await this.$axios.$get("api/v1/attempts");
      this.$store.commit("setResources", {
        name: "attempts",
        resources: attempts.result,
      });
    },
    /*
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
    updateById(id, item) {
      this.climbingRoutes.splice(
        findIndex(this.climbingRoutes, { id }),
        1,
        item
      );
    }, */
  },
};
</script>

<style></style>
