import Vue from 'vue'
import App from './App.vue'
import DateFilter from './filter/date'
import router from './router'
import {store} from './store'
import vuetify from './plugins/vuetify';
import EditRecipe from '../src/components/Recipe/EditRecipe'
import EditDate from '../src/components/Recipe/EditDate'
import EditTime from '../src/components/Recipe/EditTime'
import particles from "./components/particles";
import * as firebase from "firebase";
Vue.config.productionTip = false
Vue.component('edit-recipe',EditRecipe)
Vue.component('edit-date',EditDate)
Vue.component('edit-time',EditTime)
Vue.component('particles',particles)
Vue.filter('date',DateFilter)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyAJxehoZA2lIS3kzofruHvEEYg0Wmj3rYo",
    authDomain: "foodrecipes-ea428.firebaseapp.com",
    databaseURL: "https://foodrecipes-ea428.firebaseio.com",
    projectId: "foodrecipes-ea428",
    storageBucket: "foodrecipes-ea428.appspot.com",
  })
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      this.$store.dispatch('autoSignin',user)
    }
  })
  this.$store.dispatch('loadRecipes')
  },
}).$mount('#app')
