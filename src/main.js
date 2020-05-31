import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from 'jquery'
import {fb} from './firebase'
import VueFirestore from 'vue-firestore'

require('firebase/firestore')

Vue.use(VueFirestore,{
  Key: 'id',
  enumerable: true
})

Vue.use(VueFirestore)
window.$ = window.jQuery = jQuery

import 'bootstrap'
import 'popper.js'
import './assets/app.scss'


// import Swal from 'sweetalert2'

// window.Swal = Swal



// window.Toast = Toast


Vue.component('Navbar',require('./components/Navbar.vue').default)

Vue.config.productionTip = false

let app='';

fb.auth().onAuthStateChanged(function() {

  if(!app){
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
    
  }

});

