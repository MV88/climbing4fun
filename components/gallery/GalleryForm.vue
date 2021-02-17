<template>
  <div>
    <b-modal id="addGalleryForm" title="Gallery Form" hide-footer>
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-title"
          label="Title"
          label-for="input-title"
          description=""
        >
          <b-form-input
            id="input-title"
            v-model="form.title"
            :state="!!form.title"
            type="text"
            placeholder="Enter Title"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-subtitle"
          label="Subtitle"
          label-for="input-subtitle"
          description=""
        >
          <b-form-input
            id="input-subtitle"
            v-model="form.subtitle"
            :state="!!form.subtitle"
            type="text"
            placeholder="Enter Subtitle"
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
    return {
      form: {
        title: this.editingItem?.title || "",
        subtitle: this.editingItem?.subtitle || "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.editingItem) {
        /* this.$axios
          .$patch(`/api/v1/galleries/${this.editingItem.id}`, this.form, {
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
          }); */
      } else {
        this.$axios
          .$post("/api/v1/galleries", this.form, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$store.getters.accessToken}`,
            },
          })
          .then((data) => {
            this.$emit("updateListItem", data.result);
          });
      }
      this.$bvModal.hide("addGalleryForm");
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
