<template>
  <div class="flex-container">
    <b-container>
      <div class="ta-c">
        <h3 class="title">Photo Gallery</h3>
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
        <b-btn @click="addGallery">
          <b-icon icon="plus" scale="1.5" />
        </b-btn>
      </div>
    </div>
    <AddGalleryForm />
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
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const galleries = await this.$axios.get("api/v1/galleries");
      this.galleries = galleries.data.result;
    },
    setSelected(item) {
      this.selected = item;
    },
    addGallery() {
      this.$bvModal.show("addGalleryForm");
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
