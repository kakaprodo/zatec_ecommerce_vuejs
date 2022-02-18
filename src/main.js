import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import BodyLayoutVue from "./components/BodyLayout.vue";

const app = createApp(App);

app.use(router);
app.component("BodyLayout", BodyLayoutVue);

app.mount("#app");
