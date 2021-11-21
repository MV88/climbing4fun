<template>
  <div>
    <b-modal id="climbingRouteAddForm" title="Climbing Route Form" hide-footer>
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-name"
          label="Name"
          label-for="input-name"
          description=""
        >
          <b-form-input
            id="input-name"
            v-model="form.name"
            :state="!!form.name"
            type="text"
            trim
            placeholder="Enter Name"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-grade"
          label="French Grade"
          label-for="input-grade"
          description=""
        >
          <b-form-select
            v-model="form.french"
            :state="!!form.french"
            :options="gradesFr"
            required
            trim
            placeholder="Enter Grade"
          />
        </b-form-group>
        <b-form-group
          id="input-group-sector"
          label="Sector"
          label-for="input-sector"
          description=""
        >
          <b-form-input
            id="input-sector"
            v-model="form.sector"
            :state="!!form.sector"
            list="input-sector-list"
            placeholder="Enter Sector"
            required
          />

          <datalist id="input-sector-list">
            <option v-for="sector in sectors" :key="sector">
              {{ sector }}
            </option>
          </datalist>
        </b-form-group>
        <b-form-group
          id="input-group-link"
          label="Link"
          label-for="input-link"
          description=""
        >
          <b-form-input
            id="input-link"
            v-model="form.link"
            type="text"
            placeholder="Enter Link to the route or sector"
          />
        </b-form-group>
        <b-form-group
          id="input-group-city"
          label="City"
          label-for="input-city"
          description=""
        >
          <b-form-input
            id="input-city"
            v-model="form.city"
            type="text"
            placeholder="Enter City of the climbing route"
          />
        </b-form-group>

        <b-button type="reset">Cancel</b-button>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gradesFr: [
        "3a",
        "3a+",
        "3b",
        "3b+",
        "3c",
        "3c+",
        "4a",
        "4a+",
        "4b",
        "4b+",
        "4c",
        "4c+",
        "5a",
        "5a+",
        "5b",
        "5b+",
        "5c",
        "5c+",
        "6a",
        "6a+",
        "6b",
        "6b+",
        "6c",
        "6c+",
        "7a",
        "7a+",
        "7b",
        "7b+",
        "7c",
        "7c+",
        "8a",
        "8a+",
        "8b",
        "8b+",
        "8c",
        "8c+",
        "9a",
        "9a+",
        "9b",
        "9b+",
        "9c",
        "9c+",
      ],
      sectors: [
        "Gommamania e Abside",
        "Paretina e radice",
        "Il nido a sinistra",
        "Di Giacomo",
      ],
      form: {
        name: "",
        sector: "",
        french: "",
        link: "",
        city: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$axios
        .$post("/api/v1/climbing-routes", this.form, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.getters.accessToken}`,
          },
        })
        .then((data) => {
          this.$emit("updateListItem");
        });
      this.form = {
        name: "",
        sector: "",
        french: "",
        link: "",
        city: "",
      };
      this.$bvModal.hide("climbingRouteAddForm");
    },
    onReset(event) {
      event.preventDefault();
      this.$bvModal.hide("climbingRouteAddForm");
      this.form = {
        name: "",
        sector: "",
        french: "",
        link: "",
        city: "",
      };
    },
  },
};
</script>

<style>
.cancelBtn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
