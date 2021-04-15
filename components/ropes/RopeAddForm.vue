<template>
  <div>
    <b-modal id="addRopeForm" title="Add Rope Form" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="Are you the owner of the rope?"
        >
          <b-form-radio
            v-model="form.owner"
            :aria-describedby="ariaDescribedby"
            name="owner"
            value="yes"
            >yes</b-form-radio
          >
          <b-form-radio
            v-model="form.owner"
            :aria-describedby="ariaDescribedby"
            name="owner"
            value="no"
            >no</b-form-radio
          >
        </b-form-group>
        <b-form-group
          id="input-group-brand"
          label="Brand"
          label-for="input-brand"
          description=""
        >
          <b-form-input
            id="input-brand"
            v-model="form.brand"
            :state="!!form.brand"
            type="text"
            placeholder="Enter Brand"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-length"
          label="Length (m)"
          label-for="input-length"
          description=""
        >
          <b-form-input
            id="input-length"
            v-model="form.length"
            :state="!!form.length"
            type="number"
            placeholder="Enter Length"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-thickness"
          label="Thickness (mm)"
          label-for="input-thickness"
          description=""
        >
          <b-form-input
            id="input-thickness"
            v-model="form.thickness"
            :state="!!form.thickness"
            type="number"
            step="0.01"
            placeholder="Enter Thickness"
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
          />
        </b-form-group>
        <b-form-group
          v-if="form.owner === 'yes'"
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
          v-if="form.owner === 'yes'"
          id="input-group-length"
          label="ShopLink"
          label-for="input-shopLink"
          description=""
        >
          <b-form-input
            id="input-shopLink"
            v-model="form.shopLink"
            type="text"
            placeholder="Enter ShopLink"
          />
        </b-form-group>
        <b-form-group
          v-if="form.owner === 'no'"
          id="input-group-ownerName"
          label="Name of the owner"
          label-for="input-ownerName"
          description="insert here the name of the owner of the rope, use possibliy unique names to help you distinguish them "
        >
          <b-form-input
            id="input-ownerName"
            v-model="form.ownerName"
            type="text"
            placeholder="Enter Owner Name"
            required
          />
        </b-form-group>
        <b-form-group>
          <div>
            <b-form-file
              ref="thumbnail"
              v-model="form.thumbnail"
              accept="image/*"
              placeholder="Choose a image or drop it here..."
              drop-placeholder="Drop image here..."
              @input="pickFile"
            />
          </div>
          <div class="imagePreviewWrapper">
            <div
              v-if="previewImageSrc"
              class="imagePreview"
              :style="{ 'background-image': `url(${previewImageSrc})` }"
            ></div>
            <label v-if="!previewImageSrc"> Preview image </label>
            <label v-if="!previewImageSrc"> Best(125px x 125px) </label>
            <b-btn
              v-if="previewImageSrc"
              class="cancelBtn"
              @click="clearPreview"
              >X</b-btn
            >
          </div>
        </b-form-group>
        <b-button type="reset">Cancel</b-button>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
const defaultValues = {
  owner: "yes",
  ownerName: "",
  brand: "",
  color: "",
  length: "",
  shopLink: "",
  thickness: "",
  thumbnail: null,
  purchaseDate: "",
};

export default {
  data() {
    return {
      previewImageSrc: "",
      form: defaultValues,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("owner", this.form.owner);
      formData.append("ownerName", this.form.ownerName);
      formData.append("brand", this.form.brand);
      formData.append("color", this.form.color);
      formData.append("length", this.form.length);
      formData.append("shopLink", this.form.shopLink);
      formData.append("thickness", this.form.thickness);
      if (this.form.thumbnail) {
        // TODO evaluate if we need to make this a required field
        formData.append(
          "thumbnail",
          this.form.thumbnail,
          this.form.thumbnail.name
        );
      }
      formData.append("purchaseDate", this.form.purchaseDate);

      this.$axios
        .$post("/api/v1/ropes", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.$store.getters.accessToken}`,
          },
        })
        .then((data) => {
          this.$emit("updateListItem", data.result.rope);
        });
      this.$bvModal.hide("addRopeForm");
    },
    onReset(event) {
      event.preventDefault();
      this.$bvModal.hide("addRopeForm");
      // Reset our form values
      this.form = { ...defaultValues };
      this.previewImageSrc = "";
    },
    pickFile() {
      const input = this.$refs.thumbnail;
      const file = input.files;
      if (file && file[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImageSrc = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]); // TODO: understand this
      }
    },
    clearPreview() {
      this.previewImageSrc = "";
      this.form.thumbnail = null;
    },
  },
};
</script>

<style></style>
