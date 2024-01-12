import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import "./style.scss";

import App from "./App.vue";
const app = createApp(App);

import About from "./pages/About.vue";
import WakeUp from "./pages/WakeUp.vue";
import BedTime from "./pages/BedTime.vue";
import Settings from "./pages/Settings.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: (to) => {
        // TODO: For Home Screen app. Get which page from saved setting...
        return { path: "/wake-up" };
      },
    },
    { path: "/wake-up", name: "WakeUp", component: WakeUp },
    { path: "/bed-time", name: "BedTime", component: BedTime },
    { path: "/settings", name: "Settings", component: Settings },
    { path: "/:pathMatch(.*)*", name: "About", component: About },
  ],
});

app.use(router);
app.mount("#app");
