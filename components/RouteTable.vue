<template>
  <div class="table-container">
    <h3>Climbing Routes</h3>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(link)="data">
        <a :href="data.value" target="_blank">link</a>
      </template>
      <template #cell(hasGrade)="data">
        {{ data.value.french }}
      </template>
      <template #cell(actions)="data">
        <div class="flex">
          <b-btn @click.stop="editRoute(data.item)">
            <b-icon icon="pencil" scale="0.75" />
          </b-btn>
          <b-btn
            :id="`${data.item.id}delete`"
            @click.stop="showPopoverById(data.item.id)"
          >
            <b-icon icon="trash" scale="0.75"
          /></b-btn>
          <b-popover
            :show="showId === data.item.id"
            :target="`${data.item.id}delete`"
            triggers="click"
            title="Click on Delete if you are sure"
          >
            <b-btn @click="showPopoverById(null)">Cancel</b-btn>
            <b-btn variant="danger" @click="deleteById(data.item.id)"
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
    showId: { type: Number, default: null },
  },
  data() {
    return {
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
          key: "link",
          sortable: false,
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
    addClimbingRoute() {
      this.$emit("addClimbingRoute");
    },
    showPopoverById(routeId) {
      this.$emit("updateRouteId", routeId);
    },
    editRoute(route) {
      this.$emit("editRoute", route);
    },
    deleteById(routeId) {
      this.$emit("deleteRouteById", routeId);
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
</style>
