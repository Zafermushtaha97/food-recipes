<template>
<div>
<div class="home d-flex">
 <v-container>
  <v-layout class="mt-12">
    <v-flex xs7 class="mt-16 pt-12">
      <p class="title-back">We belive good food offer great smile</p>
      <v-btn large="" class="amber darken-1 py-3 white--text"
      :to="'/recipes/'"
       >View Recipes</v-btn>

    </v-flex>
  </v-layout>
 </v-container>
 </div>
 <br>
  <!-- <v-container>
  <v-layout class="my-14">
    <v-flex >
      <v-hover>
        <template v-slot="{ hover }">
                <v-card 
      :elevation="hover ? 12 : 4"
      max-width="65%"
      class="mx-auto"
      
      >
      <v-carousel 
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
    
  >
    <v-carousel-item
      v-for="recipe in recipes"
      :key="recipe.title"
      :src="recipe.imageurl"
      :to="'/recipes/' + recipe.id"
    >
         <v-row
          class="fill-height"
          align="center"
          justify="center"
        > -->
          <!-- <div class="title justify-center text-center">
            <h2 >{{ recipe.title }}</h2>
             </div> -->
        <!-- </v-row> -->
    <!-- </v-carousel-item>
  </v-carousel>
  </v-card>
        </template>
      </v-hover>

    </v-flex>
  </v-layout>
 </v-container> --> 

 <br>
  <v-container>
    <v-layout xs12 >
        <v-flex xs6 class="py-12">
          <h2 class="my-5 title-back2">We Provide Good Food For Your Family!
          </h2>
          <p class="paragraph2">Ut enim acgsd minim veniam, quxcis nostrud exercitation ullamco laboris nisi ufsit aliquip ex ea commodo consequat is aute irure m, quis nostrud exer.</p>
        </v-flex>

         <v-flex xs6 class="py-12">
           <v-hover>
             <template v-slot="{ hover }">
                <v-card  :elevation="hover ? 12 : 4" >
                 <v-img src="../assets/back2.jpg"></v-img>
                 </v-card>
             </template>
           </v-hover> 
        </v-flex>
    </v-layout>
  </v-container>

  <v-container>
    <v-layout>
      <v-flex>
        <h2 class="title-back2 text-center">Our Recnet Recipes</h2>
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
        <v-row class="mt-8">
          <v-col cols="4" v-for="recipe in recipes"
      :key="recipe.title">
      <v-hover>
        <template v-slot="{ hover }">
         <v-card :elevation="hover ? 12 : 4"  :to="'/recipes/' + recipe.id">
          <v-img :src="recipe.imageurl" aspect-ratio="1">
            <div class="white title-recipe">
              <v-card-title class="subtitle">{{recipe.title}}</v-card-title>
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
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    
    
  },
  computed:{
    recipes(){
      return this.$store.getters.FeatureRecipes
    },
    loading(){
      return this.$store.getters.loading
    }
  
  },
  
  data(){
    return{
      
    }
  }
}
</script>
<style  scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,200&display=swap');
.home{
  background-image: url('../assets/back1.jpg') !important;
  background-position: center !important;
  background-size: cover !important;
  height: 480px;
}
.title{
  /* position: absolute; */
 
  padding-top: 20%;
  
  /* bottom: 40px; */
  /* margin-left: 35%; */
  /* background: rgba(75, 76, 71, 0.45); */
  /* padding: 6px; */
}
.title h2{
font-family: 'Josefin Sans', sans-serif;
font-weight: 600;
 font-size: 2em;
}
.title-back{
  font-family: 'Josefin Sans', sans-serif;
font-weight: 700;
 font-size: 4em;
 color: #212025;
}
.title-back2{
    font-family: 'Josefin Sans', sans-serif;
font-weight: 700;
 font-size: 3em;
 color: #212025;
}
.title-recipe{
  position: absolute;
  bottom: 0px;
  width: 100%;
  color: #212025;
}
.subtitle{
  font-size: 1em !important;
}
.paragraph2{
   font-family: 'Poppins', sans-serif;
    font-size: 24px;
    color: #212025;
}
  

</style>