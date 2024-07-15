// import "./assets/css-resets/browser-resets.scss";
import "./assets/css-resets/normalize.scss";
import "./assets/css-resets/typography.scss";
import "./assets/css-resets/custom-resets.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const startApp = () => {
  const app = createApp(App);
  app.use(router);
  app.mount("#app");
};

startApp();
