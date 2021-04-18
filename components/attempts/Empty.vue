<template>
  <b-card tag="article" class="attempt-card">
    <small>
      <b-btn id="add" @click.stop="addNew()"> Add </b-btn> Click here to add new
      attempt
    </small>
  </b-card>
</template>

<script>
export default {
  name: "Empty",
  data() {
    return {
      size: 200,
      showDelete: false,
    };
  },
  methods: {
    addNew() {
      this.$bvModal.show("attemptAddForm");
    },
  },
};
</script>

<style></style>
