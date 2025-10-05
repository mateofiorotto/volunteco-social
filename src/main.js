import "./style.css";
import { createApp } from "vue";
import router from "./router/router";
import App from "./App.vue";
import "aos/dist/aos.css";
import AOS from 'aos';
import VueSweetalert2 from "vue-sweetalert2";

const app = createApp(App);

app.use(router);

app.use(AOS.init());

app.use(VueSweetalert2);

app.mount('#app');