<template>
  <div>
    <div class="ta-c">
      <h3 class="title">{{ this.$route.params.trip }}</h3>
    </div>
    <b-container class="start">
      <b-row class="jc-c">
        <b-card tag="article" class="picture-card">
          <img :width="size" :height="size" :src="img_url" />
        </b-card>
        <b-card tag="article" class="picture-card">
          <img :width="size" :height="size" :src="img_url" />
        </b-card>
        <b-card tag="article" class="picture-card">
          <img :width="size" :height="size" :src="img_url" />
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { routes, ropes } from "../../../static/resources";
export default {
  name: "Trip",
  props: {
    title: { type: String, default: "Gita a vecchiano" },
  },
  data() {
    return {
      defaults: {
        title: "untitled",
        subTitle: "Add here some short description",
      },
      img_url: "https://picsum.photos/200/200/",
      size: 200,
      items: routes,
      ropes,
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
