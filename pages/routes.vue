<template>
  <span>
    <Header />
    <div class="jc-c ta-c">
      <h3>Routes</h3>
    </div>
  </span>
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
