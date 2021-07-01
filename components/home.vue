<template>
  <b-container class="home-container">
    <h1 class="title">Climbing 4 Fun</h1>
    <Carousel />
    <Table />
    <h4>This website is for climbers and offers some interesting features</h4>
    <h5>checkout the menu in the header</h5>
    <ul class="activities">
      <li>Store climbing routes and sectors</li>
      <li>Store attempts and personal statistics</li>
      <li>Store rope info</li>
      <li>Add photo and videos(todo) to galleries</li>
    </ul>
    <p>The goal of this website is to help climbers managing their results</p>
    <p>For any suggestion or questions please write in my discord channel</p>
    <p>
      This project is free for everyone, but it has some costs. Is maintained
      with passion by me and if you liked it and want to support me, please
      consider a donation
    </p>
  </b-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
};
</script>

<style>
.activities {
  text-align: left;
}
</style>
