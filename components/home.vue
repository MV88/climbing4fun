<template>
  <b-container class="home-container">
    <h1 class="title">Climbing 4 Fun</h1>
    <Carousel />
    <p>Checkout the routes here</p>
    <Table />
  </b-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>
<style>
.container {
  flex-direction: column;
}
</style>
