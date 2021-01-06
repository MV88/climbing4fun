<template>
  <div>
    <b-modal id="addRopeForm" title="Add Rope Form" ok-only>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-name"
          label="Name"
          label-for="input-name"
          description=""
        >
          <b-form-input
            id="input-name"
            v-model="form.name"
            type="text"
            placeholder="Enter Name"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-color"
          label="Color"
          label-for="input-color"
          description=""
        >
          <b-form-input
            id="input-color"
            v-model="form.color"
            type="text"
            placeholder="Enter Color"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-length"
          label="Length"
          label-for="input-length"
          description=""
        >
          <b-form-input
            id="input-length"
            v-model="form.length"
            type="number"
            placeholder="Enter Length"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-thickness"
          label="Thickness"
          label-for="input-thickness"
          description=""
        >
          <b-form-input
            id="input-thickness"
            v-model="form.thickness"
            type="number"
            placeholder="Enter Thickness"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-purchaseDate"
          label="Purchase Date"
          label-for="input-purchaseDate"
          description=""
        >
          <b-form-datepicker
            id="input-purchaseDate"
            v-model="form.purchaseDate"
            placeholder="Choose the purchase date"
            class="mb-2"
          />
        </b-form-group>
        <b-form-group
          id="input-group-length"
          label="ShopLink"
          label-for="input-shoplink"
          description=""
        >
          <b-form-input
            id="input-shoplink"
            v-model="form.shoplink"
            type="number"
            placeholder="Enter ShopLink"
            required
          />
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        color: "",
        length: "",
        shoplink: "",
        thickness: "",
        purchaseDate: "",
      },
    };
  },
  computed: {},
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.color = "";
      this.form.length = "";
      this.form.shoplink = "";
      this.form.thickness = "";
      this.form.purchaseDate = "";
    },
  },
};
</script>

<style>
.carousel-container {
  max-width: 1024px;
  width: 100%;
}
</style>
