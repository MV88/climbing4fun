<template>
  <div class="flex-container">
    <b-container class="start">
      <div class="ta-c">
        <h3 class="title">{{ item.title }}</h3>
      </div>
      <b-row class="jc-c">
        <b-card
          v-for="picture in item.hasMedia"
          :key="picture.url"
          tag="article"
          class="picture-card"
        >
          <img :width="size" :height="size" :src="picture.url" />
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Trip",
  props: {
    item: { type: Object, default: () => {} },
  },
  data() {
    return {
      size: 200,
    };
  },
  mounted() {
    console.log("item", this.item);
  },
};
</script>

<style lang="less">
.card.picture-card {
  border: none;
  width: unset;
  padding: 0;
}
.card.picture-card .card-body {
  margin: 0;
}
</style>
