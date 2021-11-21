<template>
  <div class="flex-container ropes">
    <b-container @click="showPopoverById(null)">
      <h3>Ropes</h3>
      <div>
        In this section you can add new ropes to your store<br />
        You can view ropes information and evaluate when to change a rope based
        on:
        <ul>
          <li>Usage</li>
          <li>Oldness</li>
        </ul>
        <span>We suggest you to share them with your friends</span>
      </div>

      <div v-if="width > 700">
        Click here to
        <b-btn @click="addRope"> add a rope </b-btn>
        <RopesTable v-if="isLoggedIn" :ropes="ropes" />
      </div>

      <RopesCards v-else :ropes="ropes" />

      <RopeAddForm @updateListItem="updateListItem" />
      <RopeEditForm @updateListItem="updateListItem" />
    </b-container>
  </div>
</template>

<script>
import RopeAddForm from "../components/ropes/RopeAddForm.vue";
import RopesTable from "../components/ropes/RopesTable.vue";
import RopesCards from "../components/ropes/RopesCards.vue";
import RopeEditForm from "../components/ropes/RopeEditForm.vue";

export default {
  name: "Ropes",
  components: {
    RopesTable,
    RopeAddForm,
    RopesCards,
    RopeEditForm,
  },
  data() {
    return {
      width: window.innerWidth,
      itemId: null,
    };
  },
  computed: {
    ropes() {
      return this.$store.getters.getResourcesRopes;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      if (this.ropes.length === 0) {
        const ropes = await this.$axios.$get("api/v1/ropes");
        this.$store.commit("setResources", {
          name: "ropes",
          resources: ropes.result,
        });
      }
    },
    showPopoverById(itemId) {
      this.itemId = itemId;
    },
    addRope() {
      this.$bvModal.show("addRopeForm");
    },
    editItem(item) {
      this.$bvModal.show("ropeEditForm");
      this.$store.commit("setEditingItem", { ...item });
    },
    async deleteItemById(id) {
      await this.$axios.$delete(`/api/v1/ropes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.getters.accessToken}`,
        },
      });
      this.getData();
    },
    async updateListItem() {
      const ropes = await this.$axios.$get("api/v1/ropes");
      this.$store.commit("setEditingItem", null);
      this.$store.commit("setResources", {
        name: "ropes",
        resources: ropes.result,
      });
    },
  },
};
</script>

<style></style>
