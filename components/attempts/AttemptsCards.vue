<template>
  <div class="jc-c spaced attempt-row">
    <Empty />

    <b-card
      v-for="item in attempts"
      :key="item.id"
      tag="article"
      class="attempt-card"
    >
      <div class="info-block">
        <span class="info"><strong>grade(style)</strong></span>
        <span>{{
          `${item.hasRoute.hasGrade.french} (${item.hasStyle.name})`
        }}</span>
      </div>
      <div class="info-block">
        <span class="info"><strong>name</strong></span>
        <span>{{ `${item.hasRoute.name}` }}</span>
      </div>
      <div class="info-block">
        <span class="info"><strong>sector</strong></span>
        <span>{{ `${item.hasRoute.sector}` }}</span>
      </div>
      <div class="info-block">
        <span class="info"><strong># tries</strong></span>
        <span>{{ `${item.tries}` }}</span>
      </div>
      <div class="info-block">
        <span class="info"><strong>date</strong></span>
        <span>{{
          `${new Date(item.climbingDate).getDate()}/${
            new Date(item.climbingDate).getMonth() + 1
          }/${new Date(item.climbingDate).getFullYear()}`
        }}</span>
      </div>

      <template #footer>
        <div>
          <b-btn @click.stop="editItem(item)">
            <b-icon icon="pencil" scale="0.75" />
          </b-btn>
          <b-btn
            :id="`${item.id}deleteAttempt`"
            @click.stop="showPopoverById(item.id)"
          >
            <b-icon icon="trash" scale="0.75"
          /></b-btn>
          <b-popover
            :show="itemId === item.id"
            :target="`${item.id}deleteAttempt`"
            triggers="focus"
            title="Click on Delete if you are sure"
          >
            <b-btn @click="showPopoverById(null)">Cancel</b-btn>
            <b-btn variant="danger" @click="deleteItemById(item.id)"
              >Delete</b-btn
            >
          </b-popover>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import Empty from "./Empty.vue";

export default {
  name: "AttemptsCards",
  components: {
    Empty,
  },
  props: {
    attempts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      itemId: null,
    };
  },
  methods: {
    showPopoverById(id) {
      this.itemId = id;
    },
    editItem(item) {
      this.$store.commit("setEditingItem", {
        ...item,
        styleId: item.hasStyle.id,
        routeId: item.hasRoute.id,
        ropeId: item.hasRope.id,
      });
      this.$bvModal.show("attemptEditForm");
    },
    async deleteItemById(id) {
      await this.$axios.$delete(`/api/v1/attempts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.getters.accessToken}`,
        },
      });
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
.attempt-card {
  width: 100%;
  margin-bottom: 16px;
  border: 1px solid yellowgreen;
}
.attempt-card .info {
  width: 94px;
}
.attempt-card .info-block {
  display: flex;
}
.spaced {
  justify-content: space-evenly;
}
@media only screen and (min-width: 600px) {
  .attempt-card {
    width: 330px;
    margin: 0px;
  }
}
.attempt-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
