<template>
  <div>
    <Header />
    <h3>Routes</h3>
  </div>
</template>

<script>
import { routes, ropes } from "../static/resources";

export default {
  name: "Table",
  data() {
    return {
      items: routes,
      ropes,
    };
  },
};
</script>
