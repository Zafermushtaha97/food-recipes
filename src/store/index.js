import Vue from 'vue'
import Vuex from 'vuex'
// import slugify from 'slugify'

Vue.use(Vuex)
import * as firebase from 'firebase'
export const store = new Vuex.Store({
  state: {
    recipes:[
      // {
      //   imageurl:'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
      //   description: 'New York, New York!',
      //   title: 'Meetup in New York',
      //   date:new Date()
      // },
      // {
      //   imageurl:'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
      //   description: 'New second York, New York!',
      //   title: 'Meetup second in New York',
      //   date:new Date()
      // },
      // {
      //   imageurl:'https://images.pexels.com/photos/1556688/pexels-photo-1556688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      //   description: 'New third York, New York!',
      //   title: 'Meetup  third in New York',
      //   date:new Date()
      // },
    ],
    user:null,
    loading:false
  },
  mutations: {
    createrecipe(state,payload){
      state.recipes.push(payload)
    },
    SetUser(state,payload){
      state.user = payload
    },
    setloadedrecipes(state,payload){
      state.recipes = payload
    },
    updaterecipe(state,payload){
      const recipe = state.recipes.find(recipe =>{
        return  recipe.id === payload.id
      })
      if (payload.title){
        recipe.title = payload.title
      }
      if (payload.description){
        recipe.description = payload.description
      }
      if (payload.location){
        recipe.location = payload.location
      }
      if (payload.category){
        recipe.category = payload.category
      }
      if(payload.ingredients){
        recipe.ingredients  = payload.ingredients
      }
      if(payload.methods){
        recipe.methods = payload.methods
      }
      if (payload.date){
        recipe.date = payload.date
      }
    },
    setloading(state,payload){
      state.loading = payload
    },
  },
  actions: {
    createRecipe({commit,getters},payload){
      const recipe = {
        title:payload.title,
        location:payload.location,
        description:payload.description,
        category:payload.category,
        ingredients:payload.ingredients,
        methods:payload.methods,
        date:payload.date.toISOString(),
        createdid:getters.user.id,

      }
      let imageurl
      let key 
      firebase.database().ref('recipes').push(recipe)
      .then((data) => {
        key = data.key
        return key
      }).then(key => {
           const fileName = payload.image.name
            const extension = fileName.slice(fileName.lastIndexOf('.'))
            return firebase.storage().ref('recipe/' + key + '.' + extension).put(payload.image)
      }).then(uploadTaskSnapshot => {
        return uploadTaskSnapshot.ref.getDownloadURL()

      }).then(imageurl =>{
        return firebase.database().ref('recipes').child(key).update({
          imageurl:imageurl
        })
      }).then(() =>{
        commit('createrecipe',{
          ...recipe,
          imageurl:imageurl,
          id:key
        })
      }).catch((error) =>{
        console.log(error)
      })

    },
    loadRecipes({commit}){
      commit('setloading', true)
      firebase.database().ref('recipes').once("value")
      .then((data) => {
        const recipes = []
        const obj = data.val()
        for (let key in obj){
          recipes.push({
            
            id:key,
            title:obj[key].title,
            location:obj[key].location,
            category:obj[key].category,
            description:obj[key].description,
            imageurl:obj[key].imageurl,
            date:obj[key].date,
            ingredients:obj[key].ingredients,
            methods:obj[key].methods,
            createdid:obj[key].createdid
            
          })
        }
        commit('setloadedrecipes',recipes)
        commit('setloading', false)
      })
    },
    Signupusers({commit},payload){
      // username = slugify(payload.username,{
      //   replacment:'-',
      //   remove : /[$*_+~.()/'"!\-:@]/g,
      //   lower:true
      // })
      // firebase.database().ref('usersinfo').child(slug)
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
      .then(user => {
        const newuser={
          username : this.username,
          id:user.id,
          fbasekey:{}
        }
        commit('SetUser',newuser)
      }).catch(error => {
        console.log(error)
      })
    },
    Signinusers({commit},payload){
      firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
      .then(user => {
        const newuser = {
          id:user.id,
          fbasekey:{}
        }
        commit('SetUser',newuser)
      }).catch(error =>{
        return error
      })
    },
    autoSignin({commit},payload){
      commit('SetUser',{id:payload.uid,fbasekey:{}})
    },
    Logout({commit}){
      firebase.auth().signOut()
      commit('SetUser',null)
    },
    UpdateRecipe({commit},payload){
      const updateobj={}
      if (payload.title){
        updateobj.title = payload.title
      }
      if (payload.description){
        updateobj.description = payload.description
      }
      if (payload.location){
        updateobj.location = payload.location
      }
      if (payload.category){
        updateobj.category = payload.category
      }
      if(payload.ingredients){
        updateobj.ingredients = payload.ingredients
      }
      if(payload.methods){
        updateobj.methods = payload.methods
      }
      if (payload.date){
        updateobj.date = payload.date
      }
      firebase.database().ref('recipes').child(payload.id).update(updateobj)
      .then(() => {
        commit('updaterecipe',payload)
      }).catch(error =>{
        console.log(error)
      })
    }
  },
  getters:{
    AllRecipes(state){
      return state.recipes.sort((recipeA,recipeB) =>{
        return recipeA.date < recipeB.date 
      })
    },
    latestRecipes(state){
      return state.recipes.sort((recipeA,recipeB) =>{
        return recipeA.date > recipeB.date ? -1 :1
      })
    },
    FeatureRecipes(state,getters){
       return getters.latestRecipes.slice(0,6)
    },
    user(state){
      return state.user
    },
    LoadRecipe( state ){
      return (RecipeId) =>{
        return state.recipes.find((recipe) =>{
          return recipe.id === RecipeId
        })
      }
    },
    loading(state){
      return state.loading
    }
  },
  modules: {
  }
})
