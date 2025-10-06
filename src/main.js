import "./style.css";
import { createApp } from "vue";
import router from "./router/router";
import App from "./App.vue";
import "aos/dist/aos.css";
import AOS from 'aos';
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.use(router);

app.use(VueSweetalert2);

app.mount('#app');

AOS.init();