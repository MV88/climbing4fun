<template>
  <div class="table-root">
    <h3>Routes done</h3>
    <div class="table-container">
      <b-table striped hover :items="items">
        <template #cell(link)="data">
          <a :href="data.value">link</a>
        </template>
      </b-table>
    </div>
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
<style>
.table-root {
  width: 100%;
  max-width: 1024px;
}
.table-container {
  width: 100%;
  overflow: auto;
}
</style>
