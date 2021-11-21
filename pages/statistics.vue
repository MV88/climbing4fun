<template>
  <div class="flex-container statistics">
    <b-container>
      <p>
        In this page you can see a bunch of statistics <br />like the total
        number number of successful attempts:
        <strong>{{ totalAttempts }}</strong>
      </p>
      <h5>Number of usages per rope</h5>
      <b-table striped hover :items="ropesUsage" :fields="fieldsRopes">
        <template #cell(rope)="data">
          {{
            `${data.value.brand} ${data.value.length} m
          ${data.value.thickness} mm`
          }}
        </template>
      </b-table>
      <h5>Number of times we climbed a certain grade</h5>
      <b-table striped hover :items="counterGrades" :fields="fieldsGrades" />
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Statistics",
  components: {},
  data() {
    return {
      width: window.innerWidth,
      fieldsRopes: ["rope", "value"],
      fieldsGrades: ["grade", "value"],
    };
  },
  computed: {
    attempts() {
      return this.$store.getters.getResourcesAttempts;
    },
    ropesUsage() {
      return this.$store.getters.getRopesUsage;
    },
    counterGrades() {
      return this.$store.getters.counterGrades;
    },
    totalAttempts() {
      return this.$store.getters.totalAttempts;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const attempts = await this.$axios.$get("api/v1/attempts");
      this.$store.commit("setResources", {
        name: "attempts",
        resources: attempts.result,
      });
    },
  },
};
</script>

<style>
.statistics {
  padding-top: 16px;
}
.statistics table {
  width: unset;
}
</style>
