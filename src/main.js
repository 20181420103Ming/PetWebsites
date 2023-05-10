// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import  bootstrap from 'bootstrap'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(bootstrap)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import App from './App'
import router from './router'
import store from "./store/index"
 
Vue.use(BootstrapVue)
 
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.use(ViewUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
