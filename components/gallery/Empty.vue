<template>
  <b-card>
    <b-form-file
      ref="files"
      v-model="files"
      class="media-card"
      browse-text=""
      multiple
      accept="image/*"
      placeholder="Click or Drop here images"
      drop-placeholder="Click or Drop here images"
      @input="pickFiles"
    />
    <template #footer>
      <small v-if="filesSrc.length === 0">
        Use this box to add new media
        <b-btn id="clear" @click.stop="clearFiles()"> Cancel </b-btn>
      </small>
      <div v-else>
        <b-btn id="clear" @click.stop="clearFiles()"> Cancel </b-btn>
        <b-btn id="save" @click.stop="saveFiles()"> Save </b-btn>
      </div>
    </template>
  </b-card>
</template>

<script>
export default {
  name: "Empty",
  data() {
    return {
      size: 200,
      showDelete: false,
      files: [],
      filesSrc: [],
    };
  },
  methods: {
    pickFiles(files) {
      console.log("files", files);
      const input = this.$refs.files;
      input.files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.filesSrc.push(e.target.result);
          if (input.files.length === this.filesSrc.length) {
            // this.files = [];
            this.$emit("updateFilesSrc", this.filesSrc);
          }
        };
      });
      // this.$emit("input", input.files);
    },
    showDeletePopover(status) {
      this.showDelete = !!status;
    },
    saveFiles() {
      this.$emit("saveFiles", this.$refs.files.files);
    },
    clearFiles() {
      this.files = [];
      this.filesSrc = [];
      this.$emit("updateFilesSrc", []);
    },
  },
};
</script>

<style>
.custom-file-label::after {
  display: none;
}
.media-card label {
  width: 260px;
  height: 200px;
  margin: auto;
  display: flex;
  align-items: center;
}
</style>
