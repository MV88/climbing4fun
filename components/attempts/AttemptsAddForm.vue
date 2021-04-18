<template>
  <div>
    <b-modal id="attemptAddForm" title="Attempt Form" hide-footer>
      <b-form validated @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-rope"
          label="Rope"
          label-for="input-rope"
          description="the rope used"
        >
          <b-form-select
            id="input-rope"
            :value="form.ropeId || firstRope"
            :state="!!form.ropeId || !!firstRope"
            required
            trim
            placeholder="Select Rope"
            @input="(value) => onUpdate('ropeId', value)"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- Please select an option --</b-form-select-option
              >
            </template>
            <b-form-select-option
              v-for="rope in ropes"
              :key="rope.id"
              :value="rope.id"
            >
              {{
                `${rope.brand} ${rope.length}m  ${rope.thickness}mm  ${
                  rope.climbingDate || ""
                } ${rope.color}`
              }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-route"
          label="Route"
          label-for="input-route"
          description="the route used"
        >
          <b-form-select
            id="input-route"
            :value="form.routeId"
            :state="!!form.routeId"
            required
            trim
            placeholder="Select route"
            @input="(value) => onUpdate('routeId', value)"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- Please select an option --</b-form-select-option
              >
            </template>
            <b-form-select-option
              v-for="route in routes"
              :key="route.id"
              :value="route.id"
              class="option-route"
            >
              <div class="opt-grade">
                {{ route.hasGrade.french }}
              </div>
              <div>{{ getSpaces(4 - route.hasGrade.french.length) }}</div>
              <div>{{ route.sector }}</div>
              <div>
                {{ route.name }}
              </div>
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-style"
          label="Style"
          label-for="input-style"
          description="the type of the attempt"
        >
          <b-form-select
            id="input-style"
            :value="form.styleId"
            :state="!!form.styleId"
            required
            trim
            placeholder="Select style"
            @input="(value) => onUpdate('styleId', value)"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- Please select an option --</b-form-select-option
              >
            </template>
            <b-form-select-option
              v-for="style in styles"
              :key="style.id"
              :value="style.id"
              class="option-style"
            >
              {{ style.name }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-tries"
          label="Tries"
          label-for="input-tries"
          description="number of tries"
        >
          <b-form-input
            type="number"
            :state="form.tries > 0"
            :value="form.tries"
            required
            trim
            placeholder="Insert the number of tries"
            @input="(value) => onUpdate('tries', value)"
          />
        </b-form-group>
        <b-form-group
          id="input-group-climbingDate"
          label="Climbing Date"
          label-for="input-climbingDate"
          description=""
        >
          <b-form-datepicker
            id="input-climbingDate"
            :value="form.climbingDate"
            :state="
              !!form.climbingDate &&
              new Date(form.climbingDate).getDate() < new Date().getDate() + 1
            "
            :start-weekday="1"
            placeholder="Choose a date"
            required
            class="mb-2"
            @input="(value) => onUpdate('climbingDate', value)"
          />
          <b-form-invalid-feedback>
            choose a date previous than today
            (included)</b-form-invalid-feedback
          >
        </b-form-group>
        <b-button type="reset">Cancel</b-button>
        <b-button
          type="submit"
          :disabled="
            !form.climbingDate ||
            new Date(form.climbingDate).getDate() > new Date().getDate()
          "
          variant="primary"
          >Submit</b-button
        >
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    ropes: {
      type: Array,
      default: () => [],
    },
    routes: {
      type: Array,
      default: () => [],
    },
    styles: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: {
        routeId: null,
        ropeId: null,
        styleId: null,
        tries: 1,
        climbingDate: new Date(),
      },
    };
  },
  computed: {
    firstRope() {
      return this.ropes?.[0]?.id;
    },
  },
  methods: {
    getSpaces(num) {
      return Array.from({ length: num }, (v, i) => " ").join("");
    },
    onUpdate(prop, value) {
      this.form[prop] = value;
    },
    onSubmit() {
      this.$axios
        .$post(
          "/api/v1/attempts",
          {
            ...this.form,
            ropeId: this.form.ropeId || this.firstRope,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$store.getters.accessToken}`,
            },
          }
        )
        .then((data) => {
          this.$emit("updateListItem", {
            ...data.result,
            hasGrade: { french: this.form.french },
          });
        });
      this.$bvModal.hide("attemptAddForm");
    },
    onReset(event) {
      event.preventDefault();
      this.$bvModal.hide("attemptAddForm");
      this.form = {
        name: "",
        sector: "",
        grade: "",
        link: "",
        city: "",
      };
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
.option-route {
  align-items: center;
}
.opt-grade {
  width: 30px;
}
</style>
