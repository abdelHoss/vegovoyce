<template>
  <va-navbar class="mb-2" fixed :style="{ opacity: navbarDown ? 1 : 0.8 }">
    <template #left>
      <va-navbar-item class="va-h2">
        <img
          class="navbar-logo"
          src="../assets/images/navbar-logo.png"
          alt="header-logo"
        />
        <router-link class="home-link" to="/"> VegoVoyce </router-link>
      </va-navbar-item>
    </template>
    <template #right>
      <va-tabs v-model="value">
        <va-tab v-for="tab in pathArray" :key="tab.tab" :name="tab.tab">
          <router-link
            :to="tab.path"
            :style="{ color: path == tab.name ? '#2b30c0' : 'black' }"
          >
            <h5 class="va-h5">{{ tab.tab }}</h5>
          </router-link>
        </va-tab>
      </va-tabs>
    </template>
  </va-navbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      value: 0,
      navbarDown: false,
      path: this.$route.name,
      openRegisterModal: false,
      pathArray: [
        { tab: "Search", name: "ListView", path: "/recipes/listing" },
        {
          tab: "Schedule",
          name: "ScheduleView",
          path: "/recipes/weekly/schedule",
        },
        { tab: "About", name: "AboutView", path: "/vegovoyce/about" },
      ],
    };
  },
  methods: {
  },
  created() {
    window.addEventListener(
      "scroll",
      () => (this.navbarDown = window.scrollY >= 300)
    );
  },
};
</script>

<style>
@font-face {
  font-family: "Source Sans Pro Bold";
  src: url(../assets/fonts/SourceSansPro-Bold.ttf);
}

.va-navbar {
  transition: 0.5s linear;
  z-index: 3;
}

.navbar-logo {
  width: 60px;
  margin-right: 10px;
}

.home-link {
  color: #4247d6;
  letter-spacing: 2px;
  font-family: "Source Sans Pro Bold" !important;
  font-weight: bold !important;
}

.va-navbar {
  --va-navbar-height: 6rem;
}
</style>