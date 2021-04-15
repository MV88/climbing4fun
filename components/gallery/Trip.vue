<template>
  <div class="trip flex-container" @click="showDeletePopover(null)">
    <b-row class="jc-c pictures">
      <Empty @updateFilesSrc="updateFilesSrc" @saveFiles="saveFiles" />
      <b-card
        v-for="(src, idx) in filesSrc"
        :key="src + idx"
        tag="article"
        class="picture-card temporary"
      >
        <img :width="size" :height="size" :src="src" />
        <template #footer>
          <b-btn :id="'editTempItem' + idx" @click.stop="">
            todo
            <b-icon icon="pencil" scale="1" />
          </b-btn>
          <b-btn
            :id="'clearTempItem' + idx"
            @click.stop="
              showDeleteTempPopover(idx);
              showDeletePopover(null);
            "
          >
            <b-icon icon="trash" scale="1" />
          </b-btn>
          <b-popover
            :show="showDeleteTemp === idx"
            :target="'clearTempItem' + idx"
            triggers="click"
            :title="'Click on Delete if you are sure'"
          >
            <b-btn @click="showDeleteTempPopover(null)">Cancel</b-btn>
            <b-btn variant="danger" @click="showDeleteTempPopover(null)"
              >Delete</b-btn
            >
          </b-popover>
        </template>
      </b-card>
      <b-card
        v-for="(picture, index) in item.galleryMedia"
        :key="picture.url + index"
        tag="article"
        class="picture-card"
      >
        <img :width="size" :height="size" :src="picture.url" />
        <template #footer>
          <b-btn :id="'editItem' + index" @click.stop="">
            <b-icon icon="pencil" scale="1" />
            todo
          </b-btn>
          <b-btn
            :id="'deleteItem' + index"
            @click.stop="
              showDeleteTempPopover(null);
              showDeletePopover(index);
            "
          >
            <b-icon icon="trash" scale="1" />
          </b-btn>
          <b-popover
            :show="showDelete === index"
            :target="'deleteItem' + index"
            triggers="click"
            title="Click on Delete if you are sure"
          >
            <b-btn @click="showDeletePopover(null)">Cancel</b-btn>
            <b-btn
              variant="danger"
              @click="
                showDeletePopover(null);
                deleteItemById(item.id, picture.id, index);
              "
              >Delete</b-btn
            >
          </b-popover>
        </template>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import Empty from "./Empty.vue";

export default {
  name: "Trip",
  components: {
    Empty,
  },
  props: {
    item: { type: Object, default: () => {} },
  },
  data() {
    return {
      size: 200,
      showDelete: null,
      showDeleteTemp: null,
      filesSrc: [],
    };
  },
  methods: {
    showDeleteTempPopover(id) {
      this.showDeleteTemp = id;
    },
    showDeletePopover(id) {
      this.showDelete = id;
    },
    async saveFiles(files) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file, file.name);
      });
      await this.$axios.$patch(`/api/v1/galleries/${this.item.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.$store.getters.accessToken}`,
        },
      });
    },
    updateFilesSrc(filesSrc) {
      console.log("filesSrc", filesSrc);
      this.filesSrc = filesSrc;
    },
    clearTempItemById(index) {
      this.filesSrc.splice(index, 0);
    },
    async deleteItemById(galleryId, mediaId, index) {
      this.showDeletePopover(null);
      await this.$axios.$delete(`/api/v1/galleries/${galleryId}/${mediaId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.getters.accessToken}`,
        },
      });
      this.$emit("getData");
    },
  },
};
</script>

<style lang="less">
.trip .card {
  width: 300px;
  height: 300px;
}
.card.picture-card {
  border: none;
  padding: 0;
}
.card.picture-card .card-body {
  margin: 0;
}

.card.picture-card.temporary {
  border: 1px solid blue;
}
.pictures {
  overflow: auto;
  max-height: 650px;
}
</style>
