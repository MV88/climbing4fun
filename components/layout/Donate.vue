<template>
  <div>
    <b-btn id="donate" class="donate" @click="onClick">
      <b-icon icon="heart-fill" />
      Donate
    </b-btn>
    <b-popover
      :show="show"
      target="donate"
      placement="top"
      triggers="focus"
      title="Donate"
    >
      Donation will be available soon
    </b-popover>
  </div>
</template>

<script>
export default {
  name: "Donate",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onClick(status) {
      this.show = status;
    },
    onReset() {
      this.show = false;
    },
  },
};
</script>

<style></style>
