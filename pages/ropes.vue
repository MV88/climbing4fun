<template>
  <div>
    <Header />
    <h3>Ropes</h3>
    <b-table striped hover :items="ropes">
      <template #cell(img_url)="data">
        <img height="100" :src="data.value" />
      </template>
    </b-table>
  </div>
</template>

<script>
import { routes, ropes } from "../static/resources";

export default {
  name: "Ropes",
  data() {
    return {
      items: routes,
      ropes,
    };
  },
};
</script>
