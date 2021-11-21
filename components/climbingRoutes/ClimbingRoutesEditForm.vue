<template>
  <div v-if="!!form" class="outer-modal">
    <b-modal id="climbingRouteEditForm" title="Climbing Route Form" hide-footer>
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-name"
          label="Name"
          label-for="input-name"
          description=""
        >
          <b-form-input
            id="input-name"
            :value="form.name"
            :state="!!form.name"
            type="text"
            trim
            placeholder="Enter Name"
            required
            @input="(value) => onUpdate('name', value)"
          />
        </b-form-group>
        <b-form-group
          id="input-group-grade"
          label="French Grade"
          label-for="input-grade"
          description=""
        >
          <b-form-select
            id="input-grade"
            :value="form && form.hasGrade && form.hasGrade.french"
            :state="form && form.hasGrade && !!form.hasGrade.french"
            :options="gradesFr"
            required
            trim
            placeholder="Enter Grade"
            @input="(value) => onUpdate('hasGrade:', { french: value })"
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
            :value="form.sector"
            :state="!!form.sector"
            list="input-sector-list"
            placeholder="Enter Sector"
            required
            @input="(value) => onUpdate('sector', value)"
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
            :value="form.link"
            type="text"
            placeholder="Enter Link to the route or sector"
            @input="(value) => onUpdate('link', value)"
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
            :value="form.city"
            type="text"
            placeholder="Enter City of the climbing route"
            @input="(value) => onUpdate('city', value)"
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
    // TODO fetch sectors list from backend
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
    };
  },
  computed: {
    form() {
      return (
        this.$store.getters.editingItem || {
          name: "",
          city: "",
          hasGrade: { french: "" },
          sector: "",
          link: "",
        }
      );
    },
  },
  methods: {
    onUpdate(prop, value) {
      console.log(prop + " '" + value + "'");
      this.$store.commit("updateEditingItem", { prop, value });
    },
    onSubmit() {
      this.$axios
        .$patch(`/api/v1/climbing-routes/${this.form.id}`, this.form, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.getters.accessToken}`,
          },
        })
        .then((data) => {
          this.$emit("updateListItem");
        })
        .catch((e) => {
          console.error(e);
        });

      this.$bvModal.hide("climbingRouteEditForm");
    },
    onReset(event) {
      event.preventDefault();
      this.$bvModal.hide("climbingRouteEditForm");
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
