<template>
  <div class="flex-container">
    <b-container>
      <div>
        <p>
          This section is used as a tracker of your results when climbing in
          Falesia. You can:
        </p>
        <ul>
          <li>Add new attempts</li>
          <li>Edit or Remove existing attempts</li>
          <li>Filter and search attempts</li>
        </ul>
      </div>
      <AttemptsAddForm
        :ropes="ropes"
        :styles="styles"
        :routes="routes"
        @updateListItem="updateListItem"
      />
      <AttemptsEditForm
        :ropes="ropes"
        :styles="styles"
        :routes="routes"
        @updateListItem="updateListItem"
      />
      <div v-if="width > 700">
        Click here to
        <b-btn @click="addAttempt"> add an attempt </b-btn>
        <AttemptsTable v-if="isLoggedIn" :attempts="attempts" />
      </div>

      <AttemptsCards v-else :attempts="attempts" />
    </b-container>
  </div>
</template>

<script>
import AttemptsAddForm from "../components/attempts/AttemptsAddForm.vue";
import AttemptsEditForm from "../components/attempts/AttemptsEditForm.vue";
import AttemptsCards from "../components/attempts/AttemptsCards.vue";

export default {
  name: "Attempts",
  components: {
    AttemptsAddForm,
    AttemptsCards,
    AttemptsEditForm,
  },
  data() {
    return {
      width: window.innerWidth,
    };
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
  },
};
</script>

<style></style>
