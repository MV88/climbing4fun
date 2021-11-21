<template>
  <div>
    <b-btn id="Author" class="Author" @click="onClick">
      <b-icon icon="info-circle-fill" />
      Author
    </b-btn>
    <b-popover
      :show="show"
      target="Author"
      placement="top"
      triggers="focus"
      title="Author"
    >
      ChronosOutOfTime is the author and you can check more info in the
      <a target="_blank" :href="githubrepo">
        repo
        <b-icon icon="github" />
      </a>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: "Author",
  data() {
    return {
      show: false,
      githubrepo: "https://github.com/MV88/climbing4fun",
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
