<template>
  <b-table striped hover :items="attempts" :fields="fields">
    <template #cell(hasThumbnail)="data">
      <img height="100" :src="data.value.url" />
    </template>
    <template #cell(rope)="data">
      {{
        `${data.item.hasRope.brand} ${data.item.hasRope.length} m ${data.item.hasRope.thickness} mm`
      }}
    </template>
    <template #cell(route)="data">
      {{ `${data.item.hasRoute.name} - ${data.item.hasRoute.sector}` }}
    </template>
    <template #cell(grade)="data">
      {{ data.item.hasRoute.hasGrade.french }}
    </template>
    <template #cell(date)="data">
      {{ data.item.climbingDate }}
    </template>
    <template #cell(style)="data">
      {{ data.item.hasStyle.name }}
    </template>
    <template #cell(tries)="data">
      {{ data.item.tries }}
    </template>
    <template #cell(actions)="data">
      <div class="flex">
        <b-btn @click.stop="editItem(data.item)">
          <b-icon icon="pencil" scale="0.75" />
        </b-btn>
        <b-btn
          :id="`${data.item.id}deleteAttempt`"
          @click.stop="showPopoverById(data.item.id)"
        >
          <b-icon icon="trash" scale="0.75"
        /></b-btn>
        <b-popover
          :show="itemId === data.item.id"
          :target="`${data.item.id}deleteAttempt`"
          triggers="click"
          title="Click on Delete if you are sure"
        >
          <b-btn @click="showPopoverById(null)">Cancel</b-btn>
          <b-btn variant="danger" @click="deleteItemById(data.item.id)"
            >Delete</b-btn
          >
        </b-popover>
      </div>
    </template>
  </b-table>
</template>

<script>
export default {
  props: {
    attempts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      itemId: false,
      fields: ["rope", "route", "grade", "date", "style", "tries", "actions"],
    };
  },
  methods: {
    showPopoverById(id) {
      this.itemId = id;
    },
    editItem(id) {
      console.log("todo");
    },
  },
};
</script>

<style>
.cancelBtn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
