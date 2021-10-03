<template>
  <div class="table-container route">
    <h3>Climbing Routes</h3>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(sector)="data">
        <a :href="data.item.link" target="_blank">{{ data.value }}</a>
      </template>
      <template #cell(hasGrade)="data">
        {{ data.value.french }}
      </template>
      <template #cell(actions)="data">
        <div class="flex">
          <b-btn @click.stop="editItem(data.item)">
            <b-icon icon="pencil" scale="0.75" />
          </b-btn>
          <b-btn
            :id="`${data.item.id}delete`"
            @click.stop="showPopoverById(data.item.id)"
          >
            <b-icon icon="trash" scale="0.75"
          /></b-btn>
          <b-popover
            :show="itemId === data.item.id"
            :target="`${data.item.id}delete`"
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
  </div>
</template>

<script>
export default {
  name: "RouteTable",
  props: {
    items: { type: Array, default: () => [] },
  },
  data() {
    return {
      itemId: "",
      fields: [
        {
          key: "name",
          sortable: true,
          filter: true,
        },
        {
          key: "sector",
          sortable: true,
        },
        {
          key: "hasGrade",
          label: "Grade",
          sortable: true,
        },
        {
          key: "city",
          sortable: true,
        },
        {
          key: "actions",
        },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    showPopoverById(id) {
      this.itemId = id;
    },
    editItem(route) {
      this.$emit("editItem", route);
    },
    updateItemById(id) {
      this.$emit("updateItemById", id);
    },
    deleteItemById(id) {
      this.$emit("deleteItemById", id);
    },
  },
};
</script>
<style>
.inline {
  display: flex;
}
.inline h3 {
  margin-right: 8px;
}
.table-container.route {
  height: 100%;
  overflow: auto;
  padding-right: 16px;
  padding-top: 16px;
  align-self: flex-start;
}
</style>
