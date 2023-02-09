<template>
  <va-modal
    v-model="showModal"
    hide-default-actions
    no-outside-dismiss
    no-esc-dismiss
    size="large"
    blur
  >
    <div class="row modal-container">
      <va-icon
        @click="closeModal"
        class="close-button"
        name="close"
        size="large"
      />
      <div class="flex left-modal-block"></div>
      <div class="flex right-modal-block">
        <div class="modal-header va-text-center">
          <h3 class="va-h3 pt-3">VegoVoyce</h3>
          <p class="va-h5 pt-5 mx-5">
            Get our new book listing multiples original vegan recipes completely
            free!!
          </p>
        </div>
        <div class="modal-body">
          <va-input
            type="text"
            color="secondary"
            class="mb-4 modal-email"
            v-model="modalUsername"
            placeholder="Enter your name (Optional)"
          />
          <va-input
            type="email"
            color="secondary"
            class="mb-4 modal-email"
            v-model="modalEmail"
            placeholder="Enter your email"
            :error="emailError"
            :error-messages="errorMessage"
          />
          <div class="checkbox-container">
            <va-checkbox
              class="mr-3"
              color="secondary"
              v-model="checkboxChecked"
            />
            <label
              @click="checkboxChecked = !checkboxChecked"
              class="va-checkbox__label"
              >By Subscribing you agree to receive weekly newsletters cited in
              our
              <span class="modalLink" @click="launchTerm(false)"
                >TERMS AND CONDITIONS</span
              >
              &
              <span class="modalLink" @click="launchTerm(true)"
                >PRIVACY POLICY</span
              >
            </label>
          </div>
        </div>
        <va-button
          class="modal-button"
          color="secondary"
          size="large"
          :disabled="modalEmail === '' || !checkboxChecked"
          @click="verifyEmail"
          >Subscribe</va-button
        >
      </div>
    </div>
  </va-modal>
  <va-modal v-model="openTermsPrivacyModal" fullscreen hide-default-actions>
    <PrivacyPolicy v-if="openPrivacyPolicy" />
    <TermsConditions v-else />
  </va-modal>
</template>

<script>
import TermsConditions from "@/components/TermsConditions";
import PrivacyPolicy from "@/components/PrivacyPolicy";
export default {
  name: "Modal",
  props: ["openDirectly", "openModal"],
  components: { TermsConditions, PrivacyPolicy },
  data() {
    return {
      showModal: false,
      modalUsername: "",
      modalEmail: "",
      checkboxChecked: true,
      openTermsPrivacyModal: false,
      openPrivacyPolicy: false,
      emailError: false,
      errorMessage: "",
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.$emit("modalClosed");
    },
    launchTerm(statement) {
      this.openTermsPrivacyModal = true;
      this.openPrivacyPolicy = statement;
    },
    verifyEmail() {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      this.emailError = !this.modalEmail.match(emailRegex);
      this.errorMessage = "Enter a valid email";
    },
  },

  mounted() {
    setTimeout(
      () => {
        this.showModal = true;
      },
      this.openDirectly ? 10 : 8000
    );
  },
  updated() {
    this.showModal = this.openModal;
    document.body.style.overflowY = "auto";
  },
};
</script>

<style>
:root {
  --va-modal-padding: 0;
  --va-checkbox-square-border: solid 0.125rem #5a5dbe;
  --va-message-list-font-size: 15px;
}
.modal-container {
  width: 60vw;
}

.close-button {
  cursor: pointer;
  position: absolute;
  right: 0;
  color: #1a1a1a;
}

.close-button:hover {
  color: #777575;
}

.left-modal-block {
  width: 40%;
  background-image: url(../assets/images/modal-image.jpg);
  background-size: cover;
  opacity: 0.9;
}

.right-modal-block {
  width: 60%;
}

.modal-email {
  width: 80%;
  margin: 5% 10%;
}

.modal-header h3 {
  letter-spacing: 2px;
}

.checkbox-container {
  display: flex;
  width: 80%;
  margin: 2% auto;
}

.modal-button {
  width: 60%;
  margin: 2% 20%;
}

.modalLink {
  font-weight: bold;
  cursor: pointer;
}
</style>