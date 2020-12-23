<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->

    <div class="recipes">
        <v-layout>
            <v-flex>
                <v-card>
                    <v-img src="https://images.pexels.com/photos/2720445/pexels-photo-2720445.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" height="450">
                        <v-row align="center" class="lightbox white--text pa-2 fill-height text-center">
                                <v-col>
                                    <div class="titlepage">RECIPES FOOD</div>
                                    <h1></h1>
                                </v-col>
                        </v-row>
                    </v-img>
                </v-card>
            </v-flex>
        </v-layout>
<v-container class="mt-14">
  <v-layout class="justify-center">
    <v-flex xs4>
          <v-text-field
            outlined
            label="Search"
            v-model="search"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
    </v-flex>
    </v-layout>
    <v-layout>
    <v-flex xs2>
    <v-tooltip top disabled>
      <template v-slot:activator="{ on }">
      <v-btn small  class="mr-3" color="primary" v-on:click="sortby('date')" v-on="on">
          <v-icon small left>mdi-folder</v-icon>
          <span class="caption text-lowercase">By Project Date</span>
        </v-btn>
      </template>  
    </v-tooltip>
    </v-flex>
    <v-flex xs4>
        <v-btn small  class="mr-3" color="primary" >filter by categgory</v-btn>
        <v-checkbox
              v-model="currentFilter"
              label="All"
              color="primary"
              value="ALL"
              hide-details
            ></v-checkbox>
        <v-checkbox
              v-model="currentFilter"
              label="sweets"
              color="primary"
              value="sweets"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="currentFilter"
              label="red foods"
              color="primary"
              value="red foods"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="currentFilter"
              label="green foods"
              color="primary"
              value="green foods"
              hide-details
            ></v-checkbox>
    </v-flex>
    </v-layout>
</v-container>
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
        <v-container>
        <v-layout class="mt-12 mx-14 py-6 px-4 amber lighten-1"  v-for="recipe in filteredList" :key="recipe.title"
        v-if="recipe.category === currentFilter || currentFilter === 'ALL'">
            <v-flex xs8 class="">
                <div class="white--text">
                    <v-card class="">
                        <v-container class="py-0">
                          <v-layout row>
                          <v-flex xs12>
                        <v-img :src="recipe.imageurl" height="250">
                        </v-img>
                        <v-card-title>{{recipe.title}}</v-card-title>
                        <v-card-text class="subtitle-1">{{recipe.description}}</v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="purple"
                                text
                                :to="'/recipes/' + recipe.id">Explore  </v-btn>
                        </v-card-actions>
                        </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card>
                </div>
            </v-flex>
            <v-flex xs4>
              <div class="pa-6">
                <v-list class="amber lighten-1">
                <v-layout>
                    <v-flex xs12>
                        <v-list-item class="cursor-pointer ">
                <v-list-item-action>
                  <v-icon medium class="orange--text darken-2--text">mdi-food</v-icon>
                </v-list-item-action>
                <v-list-item-content class="white--text">
                  <v-list-item-title>{{recipe.category}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
                    </v-flex>
                </v-layout>
                  <v-layout>
                    <v-flex xs12>
                        <v-list-item class="cursor-pointer">
                <v-list-item-action>
                  <v-icon  medium class="blue--text darken-3--text">mdi-timetable</v-icon>
                </v-list-item-action>

                <v-list-item-content class="white--text">
                  <v-list-item-title>{{recipe.date | date}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
                    </v-flex>
                </v-layout>
                  <v-layout>
                    <v-flex xs12>
                <v-list-item class="cursor-pointer ">
                <v-list-item-action class="black--text">
                  <v-icon class="black--text" medium>mdi-map-marker-multiple</v-icon>
                </v-list-item-action>
                <v-list-item-content class="white--text">
                  <v-list-item-title>{{recipe.location}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
                    </v-flex>
                </v-layout>

                  <v-layout v-if="UserCreator === recipe.createdid">
                    <v-flex xs12>
                <v-list-item class="cursor-pointer">
                <v-list-item-action>
                  <v-icon medium class="deep-purple--text lighten-5--text">mdi-account</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="deep-purple--text lighten-5--text">created by you</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
                    </v-flex>
                </v-layout>
          </v-list>
              </div>
            </v-flex>
        </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    name:'Recipes',
    data(){
      return{
        currentFilter:'ALL',
        search:'',
        items:['red foods','sweets','green foods']
      }
    },
    computed:{
    recipes(){
      return this.$store.getters.AllRecipes
    },
    getuser(){
            return this.$store.getters.user
      },
    loading () {
      return this.$store.getters.loading
    },
    filteredList(){
      return this.recipes.filter(recipe => {
        return recipe.title.toLowerCase().includes(this.search.toLowerCase())
      })
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
    },
    methods:{
      sortby(prop){
      this.recipes.sort((a,b) => a[prop] > b[prop] ? -1:1)
    },
    filterby(prop){
      this.recipes.filter((a) => a[prop] === 'sweets' ? -1:1)
    }
    },
}
</script>

<style  scoped> 
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:ital,wght@1,300&display=swap');
.titlepage{
    font-size: 5em;
    font-family: 'Open Sans Condensed', sans-serif;
    color: floralwhite;
}
.cursor-pointer{
    cursor: pointer;
}
</style>