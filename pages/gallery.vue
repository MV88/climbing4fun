<template>
  <div class="flex-container" @click="showDeletePopover(null)">
    <b-container>
      <div class="ta-c">
        <h3 class="title">
          {{ (selected && selected.title) || "Media Galleries" }}
        </h3>
      </div>
      <b-row class="jc-c">
        <Trip v-if="selected" :item="selected" />
        <div v-for="item in galleries" v-else :key="item.id">
          <b-card :title="item.title" tag="article" @click="setSelected(item)">
            <img :width="size" :height="size" :src="item.hasThumbnail.url" />
            <b-card-text>
              {{ item.subtitle }}
            </b-card-text>
          </b-card>
        </div>
      </b-row>
    </b-container>
    <div class="right-sidebar">
      <div class="right-column">
        <b-btn @click="showForm">
          <b-icon icon="plus" scale="1.5" />
        </b-btn>
        <b-btn v-if="selected" @click="clearSelected">
          <b-icon icon="arrow-left" scale="1" />
        </b-btn>
        <b-btn v-if="selected">
          <b-icon icon="pencil" scale="1" />
        </b-btn>
        <b-btn
          v-if="selected"
          id="deleteGallery"
          @click.stop="showDeletePopover(selected)"
        >
          <b-icon icon="trash" scale="1" />
        </b-btn>
        <b-popover
          :show="showDelete"
          target="deleteGallery"
          triggers="click"
          title="Click on Delete if you are sure"
        >
          <b-btn @click="showDeletePopover(null)">Cancel</b-btn>
          <b-btn variant="danger" @click="deleteItemById(selected.id)"
            >Delete</b-btn
          >
        </b-popover>
      </div>
    </div>
    <GalleryForm :editing-item="selected" @updateListItem="updateListItem" />
  </div>
</template>

<script>
export default {
  name: "Gallery",
  data() {
    return {
      size: 200,
      galleries: [],
      selected: null,
      showDelete: false,
    };
  },
  computed: {},
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
    },
    setSelected(item) {
      this.selected = item;
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
    showDeletePopover(selected) {
      this.showDelete = !!selected;
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

<style>
.ta-c {
  text-align: center;
}
.jc-c {
  justify-content: center;
}
.title {
  margin-top: 8px;
}
.start.container {
  align-items: flex-start;
  justify-content: flex-start;
}
.card {
  width: 300px;
  margin: 16px;
  border: 1px solid grey;
}
img {
  max-width: 100%;
  object-fit: contain;
}
.card:hover {
  border-color: rgb(39, 133, 216);
  cursor: pointer;
  transform: scale(1.1);
}
.card-link + .card-link {
  margin-left: 0;
}

.btn-circle.btn {
  width: 30px;
  height: 30px;
  padding: 0px;
  border-radius: 15px;
  font-size: 10px;
  text-align: center;
}
</style>
