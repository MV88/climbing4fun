<template>
  <div class="flex-container">
    <b-container>
      <div class="ta-c">
        <h3 class="title">
          {{ (selected && selected.title) || "Media Galleries" }}
        </h3>
      </div>
      <b-row class="jc-c">
        <div v-if="selected">
          <p>
            Welcome, in this gallery you can add images or video of your special
            moments. <br />Share the gallery with your friends using your
            favourite social network
          </p>
          <Trip :item="selected" @getData="getData()" />
        </div>
        <div v-for="item in galleries" v-else :key="item.id">
          <b-card :title="item.title" tag="article" @click="setSelected(item)">
            <img :width="size" :height="size" :src="item.hasThumbnail.url" />
            <b-card-text>
              {{ item.subtitle }}
            </b-card-text>
            <template #footer>
              <div>
                <b-btn @click.stop="editItem(item)">
                  <b-icon icon="pencil" scale="0.75" />
                </b-btn>
                <b-btn
                  :id="'deleteGallery' + item.id"
                  @click.stop="setShowDeleteGalleryById(item.id)"
                >
                  <b-icon icon="trash" scale="1" />
                </b-btn>
                <b-popover
                  :show="showDeleteGalleryById === item.id"
                  :target="'deleteGallery' + item.id"
                  triggers="focus"
                  title="Erase gallery by clicking on Delete"
                >
                  <b-btn @click.stop="setShowDeleteGalleryById(null)"
                    >Cancel</b-btn
                  >
                  <b-btn
                    variant="danger"
                    @click.stop="deleteItemById(selected.id)"
                    >Delete</b-btn
                  >
                </b-popover>
              </div>
            </template>
          </b-card>
        </div>
      </b-row>
    </b-container>
    <div class="right-sidebar">
      <div class="right-column">
        <b-btn v-if="!selected" @click="showForm">
          <b-icon icon="plus" scale="1.5" />
        </b-btn>
        <b-btn v-else @click="clearSelected">
          <b-icon icon="arrow-left" scale="1" />
        </b-btn>
      </div>
    </div>
    <GalleryForm :editing-item="selected" @updateListItem="updateListItem" />
  </div>
</template>

<script>
import find from "lodash/find";
import Trip from "../components/gallery/Trip.vue";

export default {
  name: "Gallery",
  components: {
    Trip,
  },
  data() {
    return {
      showDeleteGalleryById: null,
      size: 200,
      galleries: [],
      selected: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const galleries = await this.$axios.get("api/v1/galleries", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.getters.accessToken}`,
        },
      });
      this.galleries = galleries.data.result;
      if (this.selected && find(this.galleries, { id: this.selected.id })) {
        this.selected = find(this.galleries, { id: this.selected.id });
      }
    },
    setSelected(item) {
      this.showDeleteGalleryById = null;

      this.selected = {
        ...item,
        galleryMedia: [
          ...item.galleryMedia,
          ...item.galleryMedia,
          ...item.galleryMedia,
          ...item.galleryMedia,
          ...item.galleryMedia,
        ],
      };
    },
    clearSelected(item) {
      this.selected = null;
    },
    showForm() {
      this.$bvModal.show("addGalleryForm");
    },
    updateListItem(item) {
      this.galleries.push(item.gallery);
    },
    setShowDeleteGalleryById(id) {
      this.showDeleteGalleryById = id;
    },
    async deleteItemById(id) {
      await this.$axios.$delete(`/api/v1/galleries/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.getters.accessToken}`,
        },
      });
      this.getData();
    },
  },
};
</script>

<style></style>
