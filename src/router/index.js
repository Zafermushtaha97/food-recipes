import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recipes from '@/components/Recipe/Recipes.vue'
import CreateRecipe from '@/components/Recipe/CreateRecipe'
import Recipe from '@/components/Recipe/Recipe'
import Signup from '@/components/User/Signup.vue'
import Login from '@/components/User/Login'
import account from '@/components/User/Account'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  },
  {
    path:'/create',
    name:'CreateRecipe',
    component:CreateRecipe
  },
  {
    path:'/recipes/:id',
    name:'recipe',
    component:Recipe,
    props:true
  },
  {
    path:'/Signup',
    name:'Signup',
    component:Signup
  },
  {
    path:'/Signin',
    name:'Login',
    component:Login
  },
  {
    path: '/account/:id',
    name: 'account',
    component: account,
    
    props:true
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
