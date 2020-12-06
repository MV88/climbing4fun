<template>
  <div>
    <h3>Routes done</h3>
    <b-table striped hover :items="items">
      <template #cell(link)="data">
        <a :href="data.value">link</a>
      </template>
    </b-table>
  </div>
</template>

<script>
import { routes } from "../static/resources";

export default {
  name: "Table",
  data() {
    return {
      items: routes,
    };
  },
};
</script>
