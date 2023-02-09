import { createApp } from "vue";
import App from "./App.vue";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import "../src/assets/css/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";
import router from "./router";

const app = createApp(App);

app
  .use(
    createVuestic({
      config: {
        colors: {
          variables: {
            primary: "#4DBD8A",
            secondary: "#5A5DBE",
            success: "#28d942",
            info: "#508FE0",
            danger: "#e34b4a",
            warning: "#ffc900",
            gray: "#babfc2",
            dark: "#34495e",
            darkerSecondary: "#2b30c0",
          },
        },
      },
    })
  )
  .use(router)
  .mount("#app");
