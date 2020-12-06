<template>
  <div class="carousel-container">
    <b-carousel
      id="carousel-routes"
      v-model="slide"
      :interval="6000"
      controls
      fade
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/" />
      <b-carousel-slide img-src="https://picsum.photos/1024/481/" />
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<style>
.carousel-container {
  width: 1024px;
  height: 480px;
}
</style>
