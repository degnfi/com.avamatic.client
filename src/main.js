import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import VueAxios from "vue-axios";
import Notifications from "vue-notification";
import VueClipboard from "vue-clipboard2";
import Vuelocalstorage from "vue-localstorage";
import store from "./store"
import router from './router'
const avalanche = require("avalanche");

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true

Vue.use(VueAxios, axios);
Vue.use(Notifications);
Vue.use(VueClipboard);
Vue.use(Vuelocalstorage);
Vue.use(avalanche)

axios.defaults.baseURL = "https://api.avamatic.com/";
// axios.defaults.baseURL = "http://localhost:5050/";

let myNetworkID = 3;
let myBlockchainID = "X";
let ava = new avalanche.Avalanche(
  "bootstrap.avax.network",
  21000,
  "https",
  myNetworkID,
  myBlockchainID
);
Vue.prototype.$ava = ava.AVM();

new Vue({
  router,
  Notifications,
  Vuelocalstorage,
  store,
  render: h => h(App)
}).$mount('#app')
