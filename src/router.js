import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Overview from "./views/Overview"
import Products from "./views/Products"
import Profile from "./views/Profile"
import {fb} from "./firebase"

Vue.use(Router);


const router = new Router({
    mode:"history",
    base: process.env.BASE_URL,
    routes: [
        {
            path:"/",
            name: "home",
            component: Home
        },
        {
            path: "/admin",
            name: "admin",
            component: Admin,
            children:[{
                path:"overview",
                name: "overview",
                component: Overview
            },
            {
                path:"products",
                name:"products",
                component: Products
            },
            {
                path:"profile",
                name:"profile",
                component: Profile
            },

        ]

        }
    ]
});

router.beforeEach((to, from, next) => {

    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = fb.auth().currentUser
  
    if (requiresAuth && !currentUser) {
        next('/')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
  })
  
  export default router;