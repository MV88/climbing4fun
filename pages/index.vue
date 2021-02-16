<template>
  <div id="root">
    <Home />
  </div>
</template>

<script>
export default {};
</script>

<style>
#__nuxt {
  width: 70%;
  margin: auto;
}
.container {
  flex-direction: column;
  margin: 0 auto;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
.nuxt-link-exact-active {
  color: white;
}

.table-container {
  width: 100%;
}
.table-root {
  width: 100%;
}
.flex-container {
  display: flex;
}
body {
  background-color: antiquewhite;
}
</style>
