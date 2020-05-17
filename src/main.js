import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import jQquery from'jquery'

window.$ = window.jQquery = jQquery

import 'popper.js'
import './assets/app.scss'

//Vue.component('Navbar',require('./components/Navbar.vue').default)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
