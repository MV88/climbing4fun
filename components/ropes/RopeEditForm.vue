<template>
  <div>
    <b-modal id="editRopeForm" title="Edit Rope Form" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="Are you the owner of the rope?"
        >
          <b-form-radio-group
            id="owner-selector"
            :checked="form.owner"
            :aria-describedby="ariaDescribedby"
            name="owner"
          >
            <b-form-radio value="yes" @change="onUpdate('owner', 'yes')"
              >yes</b-form-radio
            >
            <b-form-radio value="no" @change="onUpdate('owner', 'no')"
              >no</b-form-radio
            >
          </b-form-radio-group>
        </b-form-group>
        <b-form-group
          id="input-group-brand"
          label="Brand"
          label-for="input-brand"
          description=""
        >
          <b-form-input
            id="input-brand"
            :value="form.brand"
            :state="!!form.brand"
            type="text"
            placeholder="Enter Brand"
            required
            @input="(value) => onUpdate('brand', value)"
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
            :value="form.length"
            :state="!!form.length"
            type="number"
            placeholder="Enter Length"
            required
            @input="(value) => onUpdate('length', value)"
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
            :value="form.thickness"
            :state="!!form.thickness"
            type="number"
            step="0.01"
            placeholder="Enter Thickness"
            required
            @input="(value) => onUpdate('thickness', value)"
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
            :value="form.color"
            type="text"
            placeholder="Enter Color"
            @input="(value) => onUpdate('color', value)"
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
            :value="form.purchaseDate"
            placeholder="Choose the purchase date"
            class="mb-2"
            @input="(value) => onUpdate('purchaseDate', value)"
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
            :value="form.shopLink"
            type="text"
            placeholder="Enter ShopLink"
            @input="(value) => onUpdate('shopLink', value)"
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
            :value="form.ownerName"
            :state="form.ownerName"
            type="text"
            placeholder="Enter Owner Name"
            required
            @input="(value) => onUpdate('ownerName', value)"
          />
        </b-form-group>
        <b-form-group>
          <div>
            <b-form-file
              ref="thumbnail"
              :value="thumbnail"
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
  purchaseDate: "",
};

export default {
  data() {
    return {
      thumbnail: null,
    };
  },
  computed: {
    form() {
      return this.$store.getters.editingItem || defaultValues;
    },
    previewImageSrc() {
      return this.$store.getters.editingItem?.hasThumbnail?.url;
    },
  },
  methods: {
    onUpdate(prop, value) {
      this.$store.commit("updateEditingItem", {
        prop,
        value,
      });
    },
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
      if (this.thumbnail) {
        formData.append("thumbnail", this.thumbnail, this.thumbnail.name);
      }
      formData.append("purchaseDate", "");

      this.$axios
        .$patch(`/api/v1/ropes/${this.form.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.$store.getters.accessToken}`,
          },
        })
        .then((data) => {
          this.$emit("updateItemById", this.form.id, data.result);
        });

      this.$bvModal.hide("editRopeForm");
    },
    onReset(event) {
      event.preventDefault();
      this.$bvModal.hide("editRopeForm");
      // Reset our form values
      this.form = { ...defaultValues };
    },
    pickFile() {
      const input = this.$refs.thumbnail;
      const file = input.files;
      if (file && file[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$store.commit("updateEditingItem", {
            prop: "hasThumbnail",
            value: { url: e.target.result },
          });
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]); // TODO: understand this
      }
    },
    clearPreview() {
      this.$store.commit("updateEditingItem", {
        prop: "hasThumbnail",
        value: { url: "" },
      });
      this.$store.commit("updateEditingItem", {
        prop: "thumbnail",
        value: null,
      });
    },
  },
};
</script>

<style>
.carousel-container {
  max-width: 1024px;
  width: 100%;
}
.imagePreview {
  height: 120px;
  width: 120px;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0 5px 5px 0;
}
.cancelBtn {
  position: absolute;
  top: 0;
  right: 0;
}
.imagePreviewWrapper {
  min-height: 130px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin: 0 auto 30px;
  align-items: center;
  position: relative;
  justify-content: center;
  margin: auto;
  background-size: cover;
  background-position: center center;
}
</style>
