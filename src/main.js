import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import './components/firebaseInit';

Vue.config.productionTip = false


/* eslint-disable no-new */

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')