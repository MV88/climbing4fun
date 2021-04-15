<template>
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
      <b-btn @click="addItem"> Add new rope </b-btn>
    </div>
    <b-table striped hover :items="ropes" :fields="fields">
      <template #cell(hasThumbnail)="data">
        <img height="100" :src="data.value.url" />
      </template>
      <template #cell(shopLink)="data">
        <a height="100" :href="data.value" target="_blank">{{ data.value }}</a>
      </template>
      <template #cell(actions)="data">
        <div class="flex">
          <b-btn @click.stop="editItem(data.item)">
            <b-icon icon="pencil" scale="0.75" />
          </b-btn>
          <b-btn
            :id="`${data.item.id}deleteRope`"
            @click.stop="showPopoverById(data.item.id)"
          >
            <b-icon icon="trash" scale="0.75"
          /></b-btn>
          <b-popover
            :show="itemId === data.item.id"
            :target="`${data.item.id}deleteRope`"
            triggers="click"
            title="Click on Delete if you are sure"
          >
            <b-btn @click="showPopoverById(null)">Cancel</b-btn>
            <b-btn variant="danger" @click="deleteItemById(data.item.id)"
              >Delete</b-btn
            >
          </b-popover>
        </div>
      </template>
    </b-table>

    <RopeAddForm @updateListItem="updateListItem" />
    <RopeEditForm @updateItemById="updateItemById" />
  </b-container>
</template>

<script>
import findIndex from "lodash/findIndex";
import RopeAddForm from "../components/ropes/RopeAddForm.vue";
import RopeEditForm from "../components/ropes/RopeEditForm.vue";

export default {
  name: "Ropes",
  components: {
    RopeAddForm,
    RopeEditForm,
  },
  data() {
    return {
      itemId: null,
      editingItem: null,
      fields: [
        "brand",
        "hasThumbnail",
        "color",
        "purchaseDate",
        "length",
        "thickness",
        "shopLink",
        "actions",
      ],
    };
  },
  computed: {
    ropes() {
      return this.$store.getters.getResourcesRopes;
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
    addItem() {
      this.editingItem = null;
      this.$bvModal.show("addRopeForm");
    },
    editItem(item) {
      this.$bvModal.show("editRopeForm");
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
    updateItemById(id, item) {
      this.ropes.splice(findIndex(this.ropes, { id }), 1, item);
    },
    updateListItem(rope) {
      this.ropes.push(rope);
    },
  },
};
</script>

<style>
.layout {
  widows: 100%;
  display: flex;
}
.flex {
  display: flex;
}
</style>
