<template>
  <b-container class="home-container">
    <h1 class="title">Climbing 4 Fun</h1>
    <Carousel />
    <Table />
    <h4>
      This website is for climbers and offers some intereseting features,
      checkout the menu in the header
    </h4>
    <ul>
      <li>Save the climbing routes and sectors you liek to go</li>
      <li>
        Save your attempts and personal statistics of the routes you climbed
        (TODO)
      </li>
      <li>Keep track of the material you have (Rope only for the moment)</li>
      <li>Add photo and videos to galleries of your trips (TODO)</li>
    </ul>
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
<style></style>
