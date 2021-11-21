<template>
  <div class="jc-c spaced routes-cards">
    <Empty />

    <b-card
      v-for="item in routes"
      :key="item.id"
      tag="article"
      class="route-card"
    >
      <div class="info-block">
        <span class="info"><strong>Name</strong></span>
        <span>{{ `${item.name}` }}</span>
      </div>
      <div class="info-block">
        <span class="info"><strong>Sector</strong></span>
        <span
          ><a :href="item.link" target="_blank">{{ `${item.sector}` }}</a></span
        >
      </div>
      <div class="info-block">
        <span class="info"><strong>Grade</strong></span>
        <span>{{ `${item.hasGrade.french}` }}</span>
      </div>
      <div class="info-block">
        <span class="info"><strong>City</strong></span>
        <span>{{ `${item.city}` }}</span>
      </div>

      <template #footer>
        <div>
          <b-btn @click.stop="editItem(item)">
            <b-icon icon="pencil" scale="0.75" />
          </b-btn>
          <b-btn
            :id="`${item.id}deleteRoute`"
            @click.stop="showPopoverById(item.id)"
          >
            <b-icon icon="trash" scale="0.75"
          /></b-btn>
          <b-popover
            :show="itemId === item.id"
            :target="`${item.id}deleteRoute`"
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
import EmptyClimbingRoutes from "./EmptyClimbingRoutes.vue";

export default {
  name: "RoutesCards",
  components: {
    Empty: EmptyClimbingRoutes,
  },
  props: {
    routes: {
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
        gradeId: item.hasGrade.id,
      });
      this.$bvModal.show("climbingRouteEditForm");
    },
    async deleteItemById(id) {
      await this.$axios.$delete(`/api/v1/routes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.getters.accessToken}`,
        },
      });
      const routes = await this.$axios.$get("api/v1/routes");
      this.$store.commit("setResources", {
        name: "routes",
        resources: routes.result,
      });
    },
  },
};
</script>

<style>
.route-card {
  width: 100%;
  margin-bottom: 16px;
  border: 1px solid yellowgreen;
}
.route-card .info {
  width: 94px;
}
.route-card .info-block {
  display: flex;
}
.spaced {
  justify-content: space-evenly;
}
@media only screen and (min-width: 600px) {
  .route-card {
    width: 330px;
    margin: 0px;
  }
}
.routes-cards {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
</style>
