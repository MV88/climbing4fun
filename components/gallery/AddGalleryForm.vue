<template>
  <div>
    <b-modal id="addGalleryForm" title="Add Gallery Form" hide-footer>
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
            placeholder="Enter Name"
            required
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
  props: {
    editingItem: { type: Object, default: () => null },
  },
  data() {
    return {};
  },
  computed: {
    form() {
      return {
        name: this.editingItem?.name || "",
      };
    },
  },
  methods: {
    onSubmit() {
      if (this.editingItem) {
        this.$axios
          .$patch(`/api/v1/climbing-routes/${this.editingItem.id}`, this.form, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$store.getters.accessToken}`,
            },
          })
          .then((data) => {
            this.$emit("updateById", this.editingItem.id, {
              ...data.result,
              hasGrade: { french: this.form.french },
            });
          });
      } else {
        this.$axios
          .$post("/api/v1/climbing-routes", this.form, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$store.getters.accessToken}`,
            },
          })
          .then((data) => {
            this.$emit("updateListItem", {
              ...data.result,
              hasGrade: { french: this.form.french },
            });
          });
      }
      this.$bvModal.hide("addClimbingRouteForm");
    },
    onReset(event) {
      event.preventDefault();
      this.$bvModal.hide("addGalleryForm");
      // Reset our form values
      this.form = {
        name: "",
        sector: "",
        grade: "",
        link: "",
        city: "",
      };
    },
  },
};
</script>

<style></style>
