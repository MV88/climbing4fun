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
            type="text"
            placeholder="Enter Subtitle"
          />
        </b-form-group>
        <b-form-group>
          <div>
            <b-form-file
              ref="thumbnail"
              v-model="form.thumbnail"
              accept="image/*"
              :state="!!thumbnailSrc"
              placeholder="Choose or Drop an image for the thumbnail of the gallery"
              drop-placeholder="Click or Drop here"
              @input="pickThumbnail"
            />
          </div>
          <div class="imagePreviewWrapper">
            <div v-if="!!thumbnailSrc" class="flex-container preview">
              <div
                class="imagePreview"
                :style="{ 'background-image': `url(${thumbnailSrc})` }"
              ></div>
              <b-btn class="cancelBtn" @click="clearThumbnail">X</b-btn>
            </div>
            <div v-else>
              <label> Preview image </label>
              <label> Best(125px x 125px) </label>
            </div>
          </div>
        </b-form-group>
        <!-- b-form-group>
          <div>
            <b-form-file
              ref="images"
              v-model="form.images"
              accept="image/*"
              multiple
              :state="form.images.length >= 1"
              placeholder="Choose or Drop images for the gallery here..."
              drop-placeholder="Drop images for the gallery here..."
              @input="pickImages"
            />
          </div>
          <div class="imagePreviewWrapper">
            <div v-if="form.images.length" class="flex-container preview">
              <div
                v-for="img in imagesSrc"
                :key="img"
                class="imagePreview"
                :style="{ 'background-image': `url(${img})` }"
              ></div>
              <b-btn class="cancelBtn" @click="clearImages">X</b-btn>
            </div>
            <div v-else>
              <label> Preview image </label>
              <label> Best(125px x 125px) </label>
            </div>
          </div>
        </b-form-group -->
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
        images: this.editingItem?.images || [],
        thumbnail: this.editingItem?.thumbnail || [],
        title: this.editingItem?.title || "",
        subtitle: this.editingItem?.subtitle || "",
      },
      thumbnailSrc: "",
      imagesSrc: [],
    };
  },
  methods: {
    clearThumbnail() {
      this.thumbnailSrc = "";
      this.form.thumbnail = [];
    },
    pickThumbnail() {
      const input = this.$refs.thumbnail;
      if (input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.thumbnailSrc = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
        this.$emit("input", input.files[0]);
      }
    },
    clearImages() {
      this.form.images = [];
      this.imagesSrc = "";
    },
    pickImages() {
      const input = this.$refs.images;
      input.files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.imagesSrc.push(e.target.result);
        };
      });
      // this.$emit("input", input.files);
    },
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
        const formData = new FormData();
        formData.append("title", this.form.title);
        formData.append("subtitle", this.form.subtitle);
        formData.append(
          "thumbnail",
          this.form.thumbnail,
          this.form.thumbnail.name
        );
        /* formData.append(
          "images",
          this.form.images,
          this.form.images.name
        ); */

        this.$axios
          .$post("/api/v1/galleries", formData, {
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

<style>
.preview {
  flex-wrap: wrap;
}
</style>
