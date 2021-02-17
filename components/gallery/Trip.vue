<template>
  <div class="flex-container">
    <b-row class="jc-c">
      <b-card
        v-for="(picture, i) in item.hasMedia"
        :key="picture.url + i"
        tag="article"
        class="picture-card"
      >
        <img :width="size" :height="size" :src="picture.url" />
      </b-card>
    </b-row>
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
