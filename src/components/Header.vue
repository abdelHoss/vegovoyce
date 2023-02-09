<template>
  <Navbar />
  <div class="header-bg">
    <div class="row header-row">
      <div class="flex md7">
        <h3 class="va-h1 content">
          Still looking for what to cook tonight, tomorrow ? Find what
          plant-based recipe that satisfy your cravings !!
        </h3>
        <router-link to="/recipes/listing">
          <va-button
            color="secondary"
            size="large"
            class="mr-4 mb-2 search-button"
            gradient
            >Make a search</va-button
          >
        </router-link>
      </div>
      <div class="flex md5 align-end">
        <img
          class="header-logo"
          draggable="false"
          src="../assets/images/header-logo.png"
          alt="Header Logo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";

export default {
  name: "Header",
  components: { Navbar },
};
</script>

<style>
.header-bg {
  width: 100%;
  height: 100vh;
  background-image: url(../assets/images/bg-header.png);
  background-size: cover;
}

.header-logo {
  padding-top: 50px;
  width: 80%;
  transform: rotate(10deg);
  opacity: 0.9;
  z-index: 0;
}

.search-button {
  width: 30%;
  margin: 5% 35%;
  font-weight: bolder;
  padding: 10px;
}

.va-button__content {
  font-size: 1.5rem !important;
}

.header-row {
  padding-top: 5%;
}
</style>