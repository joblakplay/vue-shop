import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Overview from "./views/Overview"
import Products from "./views/Products"

Vue.use(Router);

export default new Router({
    mode:"history",
    //base: process.env.BASE_URL,
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
            }]
        }
    ]
})