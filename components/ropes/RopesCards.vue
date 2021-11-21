<template>
  <div class="jc-c spaced item-row">
    <Empty />

    <b-card
      v-for="item in ropes"
      :key="item.id"
      tag="article"
      class="item-card"
    >
      <div class="info-block">
        <span class="info"><strong>brand</strong></span>
        <span>{{ `${item.brand}` }}</span>
      </div>
      <div class="info-block">
        <span class="info"><strong>length</strong></span>
        <span>{{ `${item.length} m` }}</span>
      </div>
      <div class="info-block">
        <span class="info"><strong>thickness</strong></span>
        <span>{{ `${item.thickness} mm` }}</span>
      </div>
      <div class="info-block">
        <span class="info"><strong>color</strong></span>
        <span>{{ `${item.color}` }}</span>
      </div>
      <div class="info-block">
        <span class="info"><strong> purchase date</strong></span>
        <span>{{
          item.purchaseDate
            ? `${new Date(item.purchaseDate).getDate()}/${
                new Date(item.purchaseDate).getMonth() + 1
              }/${new Date(item.purchaseDate).getFullYear()}`
            : "N.A."
        }}</span>
      </div>

      <template #footer>
        <div>
          <b-btn @click.stop="editItem(item)">
            <b-icon icon="pencil" scale="0.75" />
          </b-btn>
          <b-btn
            :id="`${item.id}deleteRope`"
            @click.stop="showPopoverById(item.id)"
          >
            <b-icon icon="trash" scale="0.75"
          /></b-btn>
          <b-popover
            :show="itemId === item.id"
            :target="`${item.id}deleteRope`"
            triggers="focus"
            title="Click on Delete if you are sure"
          >
            <b-btn @click="showPopoverById(null)">Cancel</b-btn>
            <b-btn variant="danger" @click="deleteItemById(item.id)"
              >Delete</b-btn
            >
          </b-popover>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import Empty from "./Empty.vue";

export default {
  name: "RopesCards",
  components: {
    Empty,
  },
  props: {
    ropes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      itemId: null,
    };
  },
  methods: {
    showPopoverById(id) {
      this.itemId = id;
    },
    editItem(item) {
      this.$store.commit("setEditingItem", item);
      this.$bvModal.show("ropeEditForm");
    },
    async deleteItemById(id) {
      await this.$axios.$delete(`/api/v1/ropes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.getters.accessToken}`,
        },
      });
      const ropes = await this.$axios.$get("api/v1/ropes");
      this.$store.commit("setResources", {
        name: "ropes",
        resources: ropes.result,
      });
    },
  },
};
</script>

<style></style>
