<template>
  <div v-if="isLoggedIn" class="table-root">
    <br />
    <div class="inline">
      <h3>All climbing routes currently store</h3>
      <b-button pill class="floating btn-circle" @click="addClimbingRoute"
        ><b-icon icon="plus" style="width: 25px; height: 25px"
      /></b-button>
    </div>
    <div class="table-container">
      <b-table striped hover :items="items" :fields="fields">
        <template #cell(link)="data">
          <a :href="data.value">link</a>
        </template>
        <template #cell(hasGrade)="data">
          {{ data.value.french }}
        </template>
      </b-table>
    </div>
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
