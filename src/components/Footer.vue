<template>
  <va-modal v-model="openTermsPrivacyModal" fullscreen hide-default-actions>
    <PrivacyPolicy v-if="openPrivacyPolicy" />
    <TermsConditions v-else />
  </va-modal>
  <Modal
    :openModal="openModal"
    :openDirectly="registerButtonClicked"
    @modalClosed="openModal = false"
  />
  <div class="footer row">
    <div class="footer-menu flex row">
      <router-link class="footer-link" to="/">Contact</router-link>
      <router-link class="footer-link" to="/vegovoyce/about">About</router-link>
      <p class="footer-link" @click="openModalByClick">Register</p>
      <p class="footer-link" @click="setOpenTermsModal(true)">Privacy</p>
      <p class="footer-link" @click="setOpenTermsModal(false)">Terms of use</p>
    </div>

    <div class="flex md12" style="text-align: center">
      <router-link to="/"
        ><va-icon class="bi bi-facebook mr-5"></va-icon
      ></router-link>
      <router-link to="/"
        ><va-icon class="bi bi-instagram mr-5"></va-icon
      ></router-link>
      <router-link to="/"
        ><va-icon class="bi bi-tiktok mr-5"></va-icon
      ></router-link>
      <router-link to="/"
        ><va-icon class="bi bi-snapchat mr-5"></va-icon
      ></router-link>
      <h5 class="va-h5 mt-5">&copy; {{ year }} VegoVoyce</h5>
    </div>
  </div>
</template>

<script>
import TermsConditions from "@/components/TermsConditions";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import Modal from "@/components/Modal";
export default {
  name: "Footer",
  components: { TermsConditions, PrivacyPolicy, Modal },
  data() {
    return {
      year: new Date().getFullYear(),
      openTermsPrivacyModal: false,
      openPrivacyPolicy: false,
      openModal: true,
      registerButtonClicked: false,
    };
  },
  methods: {
    setOpenTermsModal(statement) {
      this.openTermsPrivacyModal = true;
      this.openPrivacyPolicy = statement;
    },
    openModalByClick() {
      this.openModal = true;
      this.registerButtonClicked = true;
    },
  },
  updated() {
    document.body.style.overflowY = "auto";
  },
};
</script>

<style>
.footer {
  width: 100%;
  height: 25rem;
  background: #4dbd8a;
}

.footer-menu {
  text-align: center;
  width: 60%;
  margin: 0 20%;
  padding-top: 5%;
  font-weight: bold;
  font-size: 1.2rem;
}

.footer-link {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.bi {
  color: #000;
  font-size: 40px !important;
}

.bi.bi-facebook:hover {
  color: #2e5894;
}
.bi.bi-instagram:hover {
  color: #c13584;
}
.bi.bi-tiktok:hover {
  color: #00f2ea;
  text-shadow: 2px 2px #ff0050;
}
.bi.bi-snapchat:hover {
  color: #fffc00;
}
</style>