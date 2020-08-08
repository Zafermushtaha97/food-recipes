<template>
    <div>
    <v-container>
        <h2 class="text-center mt-14 mb-4 title orange--text darken-1--text
         ">Recipes which I created </h2>
    <v-layout>
      <v-flex>
          <v-layout>
      <v-flex xs12 class="text-center">
        <v-progress-circular
                indeterminate
                class="blue--text darken-3--text"
                :width="5"
                :size="80"
                v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
        <v-row class="mt-8" v-if="filterlists">
          <v-col cols="6" v-for="recipe in filterlists"
      :key="recipe.title">
      <v-hover>
        <template v-slot="{ hover }">
         <v-card :elevation="hover ? 12 : 4"  :to="'/recipes/' + recipe.id">
          <v-img :src="recipe.imageurl" height="420">
            <div class="white title-recipe">
              <v-card-title class="">{{recipe.title}}</v-card-title>
                <v-card-subtitle class="pb-0">{{recipe.date | date}}</v-card-subtitle>
            </div>
          </v-img>
        </v-card>
        </template>
      </v-hover> 
        </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
    </div>
</template>
<script>
export default {
props:["id"],
    computed:{
         recipes(){
     return this.$store.getters.AllRecipes
    },
    loading(){
        return this.$store.getters.loading
    },
     UserIsAuthenticated(){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined            
        },
         UserCreator(){
        if(!this.UserIsAuthenticated){
            return false
        }
        return this.$store.getters.user.id    
        },
        filterlists(){
          return this.recipes.filter(recipe =>{
            return recipe.createdid.includes(this.id)
          })
        },

     
 
   
   
    },
 

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:ital,wght@1,300&display=swap');
    .title{
        font-size:3em !important;
        font-family: 'Open Sans Condensed', sans-serif;
    }
    .title-recipe{
  position: absolute;
  bottom: 0px;
  width: 100%;
  color: #212025;
}
</style>