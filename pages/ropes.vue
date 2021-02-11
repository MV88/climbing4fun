<template>
  <b-container class="start">
    <b-row>
      <b-col cols="9">
        <div class="table-container">
          <h3>Ropes owned</h3>
          <b-table striped hover :items="ropes" :fields="fields">
            <template #cell(url)="data">
              <img height="100" :src="data.value" />
            </template>
            <template #cell(actions)>
              <div class="flex">
                <b-btn>
                  <b-icon icon="pencil" scale="0.75" />
                </b-btn>
                <b-btn> <b-icon icon="trash" scale="0.75" /></b-btn>
              </div>
            </template>
          </b-table>
          <h3>TODO: Ropes used as guest</h3>
          <b-table striped hover :items="ropesGuests" :fields="fieldsGuests">
            <template #cell(url)="data">
              <img height="100" :src="data.value" />
            </template>
          </b-table>
          <RopeForm @updateRope="updateRope" />
        </div>
      </b-col>
      <b-col cols="3">
        <div class="right-column">
          <p>Actions</p>
          <b-table-simple>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>Action</b-th>
                <b-th>Description</b-th>
              </b-tr>
              <b-tr>
                <b-td><b-btn @click="addRope">Add</b-btn></b-td>
                <b-td>Add a new rope</b-td>
              </b-tr>
              <b-tr>
                <b-td><b-btn @click="showEditAction">Edit</b-btn></b-td>
                <b-td>Enable Edit operation inline</b-td>
              </b-tr>
              <b-tr>
                <b-td><b-btn @click="showDeleteAction">Remove</b-btn></b-td>
                <b-td>Enable delete operation inline</b-td>
              </b-tr>
            </b-thead>
          </b-table-simple>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Ropes",
  data() {
    return {
      showEdit: false,
      showDelete: false,
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
        "actions",
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
    showEditAction() {
      this.showEdit = !this.showEdit;
    },
    showDeleteAction() {
      this.showDelete = !this.showDelete;
    },
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
.layout {
  widows: 100%;
  display: flex;
}
.flex {
  display: flex;
}
</style>
