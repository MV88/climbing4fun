<template>
  <b-table striped hover :items="ropes" :fields="fields">
    <template #cell(hasThumbnail)="data">
      <img height="100" :src="data.value.url" />
    </template>
    <template #cell(shopLink)="data">
      <a height="100" :href="data.value" target="_blank">{{ data.value }}</a>
    </template>
    <template #cell(purchaseDate)="data">
      <div class="info-block">
        <span>{{
          data.value
            ? `${new Date(data.value).getDate()}/${
                new Date(data.value).getMonth() + 1
              }/${new Date(data.value).getFullYear()}`
            : "N.A."
        }}</span>
      </div>
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
          triggers="focus"
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
</template>

<script>
export default {
  name: "RopesTable",
  props: {
    ropes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      itemId: "",
      form: "defaultValues",
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
