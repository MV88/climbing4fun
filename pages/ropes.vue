<template>
  <span>
    <Header />
    <b-container class="start">
      <div class="table-root">
        <div class="table-container">
          <h3>Ropes owned</h3>
          <b-table striped hover :items="ropes" :fields="fields">
            <template #cell(url)="data">
              <img height="100" :src="data.value" />
            </template>
          </b-table>
          <h3>TODO: Ropes used as guest</h3>
          <b-table striped hover :items="ropesGuests" :fields="fieldsGuests">
            <template #cell(url)="data">
              <img height="100" :src="data.value" />
            </template>
          </b-table>
          <b-button pill class="floating btn-circle" @click="addRope"
            ><b-icon icon="plus" style="width: 40px; height: 40px"
          /></b-button>
          <AddRopeForm @updateRope="updateRope" />
        </div>
      </div>
    </b-container>
  </span>
</template>

<script>
export default {
  name: "Ropes",
  data() {
    return {
      ropes: [],
      ropesGuests: [],
      fields: [
        "brand",
        "url",
        "color",
        "purchaseDate",
        "length",
        "thickness",
        "shopLink",
      ],
      fieldsGuests: ["brand", "url", "color", "length", "owner", "thickness"],
    };
  },
  mounted() {
    this.$axios.get("api/v1/ropes").then((response) => {
      this.ropes = response.data.result.filter((rope) => rope.owner === "");
      this.ropesGuests = response.data.result.filter(
        (rope) => rope.owner !== ""
      );
    });
  },
  methods: {
    addRope() {
      this.$bvModal.show("addRopeForm");
    },
    updateRope(rope) {
      if (rope.owner) {
        this.ropesGuests.push(rope);
      } else {
        this.ropes.push(rope);
      }
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
