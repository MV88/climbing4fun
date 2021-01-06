<template>
  <span>
    <Header />
    <b-container class="start">
      <div class="table-root">
        <h3>Ropes</h3>
        <div class="table-container">
          <b-table striped hover :items="ropes" :fields="fields">
            <template #cell(thumbnail)="data">
              <img height="100" :src="data.value" />
            </template>
          </b-table>
          <b-button pill class="floating btn-circle" @click="addRope"
            ><b-icon icon="plus" style="width: 40px; height: 40px"
          /></b-button>
          <AddRopeForm />
        </div>
      </div>
    </b-container>
  </span>
</template>

<script>
import { routes, ropes } from "../static/resources";

export default {
  name: "Ropes",
  data() {
    return {
      items: routes,
      fields: [
        "name",
        "thumbnail",
        "color",
        "purchaseDate",
        "length (m)",
        "thickness (mm)",
        "shopLink",
      ],
      ropes,
    };
  },
  methods: {
    addRope() {
      this.$bvModal.show("addRopeForm");
    },
  },
};
</script>

<style>
.start.container {
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
