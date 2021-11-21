<template>
  <div class="flex-container routes" @click="showPopoverById(null)">
    <b-container class="container-routes">
      <div class="start-section">
        <b-btn v-if="width > 600" @click="addItem">
          add a climbing route
        </b-btn>
        <div class="filters-routes">
          <h4>Filters</h4>
          <ul class="sorters">
            <li class="sort-filter">
              Grade
              <b-form-radio-group
                v-if="isLoggedIn && width <= 600"
                id="sorterGrade"
                v-model="sortBy"
                class="sortItem"
                name="sorter"
              >
                <b-form-radio v-model="sortBy" :value="ASC + 'grade'"
                  >ASC</b-form-radio
                >
                <b-form-radio v-model="sortBy" :value="DESC + 'grade'"
                  >DESC</b-form-radio
                >
              </b-form-radio-group>
              <b-form-input
                id="input-grade"
                v-model="filters.grade"
                type="text"
                placeholder="Filter by Grade"
                required
                class="filterItem"
              />
            </li>
            <li class="sort-filter">
              Sector
              <b-form-radio-group
                v-if="isLoggedIn && width <= 600"
                id="sorterSector"
                v-model="sortBy"
                class="sortItem"
                name="sorter"
              >
                <b-form-radio v-model="sortBy" :value="ASC + 'sector'"
                  >ASC</b-form-radio
                >
                <b-form-radio v-model="sortBy" :value="DESC + 'sector'"
                  >DESC</b-form-radio
                >
              </b-form-radio-group>
              <b-form-input
                id="input-sector"
                v-model="filters.sector"
                type="text"
                placeholder="Filter by Sector"
                required
                class="filterItem"
              />
            </li>
            <li class="sort-filter">
              City
              <b-form-radio-group
                v-if="isLoggedIn && width <= 600"
                id="sorterCity"
                v-model="sortBy"
                class="sortItem"
                name="sorter"
              >
                <b-form-radio v-model="sortBy" :value="ASC + 'city'"
                  >ASC</b-form-radio
                >
                <b-form-radio v-model="sortBy" :value="DESC + 'city'"
                  >DESC</b-form-radio
                >
              </b-form-radio-group>
              <b-form-input
                id="input-city"
                v-model="filters.city"
                type="text"
                placeholder="Filter by City"
                required
                class="filterItem"
              />
            </li>
          </ul>
        </div>
      </div>
      <RouteTable
        v-if="isLoggedIn && width > 600"
        :item-id="routeId"
        :items="climbingRoutesFiltered"
        @showPopoverById="showPopoverById"
        @editItem="editItem"
        @deleteItemById="deleteItemById"
      />

      <ClimbingRoutesCards
        v-if="width <= 600"
        :routes="climbingRoutesFiltered"
      />
      <ClimbingRoutesEditForm @updateListItem="updateListItem" />
      <ClimbingRoutesAddForm @updateListItem="updateListItem" />
    </b-container>
  </div>
</template>

<script>
import sortBy from "lodash/sortBy";
import reverse from "lodash/reverse";
import RouteTable from "../components/climbingRoutes/RouteTable.vue";
import ClimbingRoutesCards from "../components/climbingRoutes/ClimbingRoutesCards.vue";
const ASC = "ASC";
const DESC = "DESC";

export default {
  name: "Routes",
  components: {
    RouteTable,
    ClimbingRoutesCards,
  },
  data() {
    return {
      filters: {
        grade: "",
        sector: "",
        city: "",
      },
      sortBy: "",
      DESC,
      ASC,
      routeId: null,
      width: window.innerWidth,
    };
  },
  computed: {
    climbingRoutes() {
      return this.$store.getters.getResourcesRoutes;
    },
    climbingRoutesFiltered() {
      return this.checkFilterSort();
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const routes = await this.$axios.$get("api/v1/climbing-routes");
      this.$store.commit("setResources", {
        name: "routes",
        resources: routes.result,
      });
    },

    checkFilterSort() {
      let climbingRoutesFiltered = this.climbingRoutes.filter((item) => {
        let grade = true;
        let sector = true;
        let city = true;
        if (this.filters.grade) {
          grade = item.hasGrade.french
            .toLowerCase()
            .includes(this.filters.grade.toLowerCase());
        }
        if (this.filters.sector) {
          sector = item.sector
            .toLowerCase()
            .includes(this.filters.sector.toLowerCase());
        }
        if (this.filters.city) {
          city = item.city
            .toLowerCase()
            .includes(this.filters.city.toLowerCase());
        }
        return grade && sector && city;
      });

      climbingRoutesFiltered = sortBy(climbingRoutesFiltered, (item) => {
        if (this.sortBy.includes("grade")) {
          return item.hasGrade.french.toLowerCase();
        }
        if (this.sortBy.includes("sector")) {
          return item.sector.toLowerCase();
        }
        if (this.sortBy.includes("city")) {
          return item.city.toLowerCase();
        }
        return item;
      });
      if (this.sortBy.includes(DESC)) {
        climbingRoutesFiltered = reverse(climbingRoutesFiltered);
      }
      return climbingRoutesFiltered;
    },
    showPopoverById(routeId) {
      this.routeId = routeId;
    },
    addItem() {
      this.$store.commit("setEditingItem", null);
      this.$bvModal.show("climbingRouteAddForm");
    },
    editItem(item) {
      this.$store.commit("setEditingItem", { ...item });
      this.$bvModal.show("climbingRouteEditForm");
    },
    async deleteItemById(id) {
      await this.$axios.$delete(`/api/v1/climbing-routes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.getters.accessToken}`,
        },
      });
      this.getData();
    },
    async updateListItem() {
      const routes = await this.$axios.$get("api/v1/climbing-routes");
      this.$store.commit("setEditingItem", null);
      this.$store.commit("setResources", {
        name: "routes",
        resources: routes.result,
      });
    },
  },
};
</script>

<style></style>
