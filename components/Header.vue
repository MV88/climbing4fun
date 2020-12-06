<template>
  <b-navbar sticky toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">
      <b-img src="../assets/Mediamodifier-Design.svg" height="36" />
      <NuxtLink to="/" tag="span"> Climbing 4 fun </NuxtLink>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <NuxtLink to="/routes" tag="span"> Routes </NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/ropes" tag="span"> Ropes </NuxtLink>
        </b-nav-item>
        <b-nav-item>
          <NuxtLink to="/gallery" tag="span"> Gallery </NuxtLink>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" />
          <b-button size="sm" class="my-2 my-sm-0" type="submit">
            Search
          </b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#"> Profile </b-dropdown-item>
          <b-dropdown-item href="#"> Sign Out </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
};
</script>

<style></style>
