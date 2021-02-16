<template>
  <div class="flex-container" @click="showPopoverById(null)">
    <b-container>
      <h3>Ropes owned</h3>
      <b-table striped hover :items="ropes" :fields="fields">
        <template #cell(hasThumbnail)="data">
          <img height="100" :src="data.value.url" />
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

      <RopeForm
        :editing-item="editingItem"
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
  name: "Ropes",
  data() {
    return {
      itemId: null,
      editingItem: null,
      ropes: [],
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
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const ropes = await this.$axios.get("api/v1/ropes");
      this.ropes = ropes.data.result;
    },
    showPopoverById(itemId) {
      this.itemId = itemId;
    },
    addItem() {
      this.editingItem = null;
      this.$bvModal.show("addRopeForm");
    },
    editItem(item) {
      this.editingItem = item;
      this.$bvModal.show("addRopeForm");
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
