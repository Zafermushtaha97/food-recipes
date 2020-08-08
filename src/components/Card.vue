<template>
<v-layout>
    <v-flex class="d-flex justify-space-between">
      <v-card v-for="recipe in recipes" :key="recipe.title"
    class="my-12 "
    
  >
    <v-img
      height="250"
      :src="recipe.imageurl"
    ></v-img>

    <v-card-title>{{recipe.title}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
         max-width="30%"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        
      >
        Follow
      </v-btn>
    </v-card-actions>
    
  </v-card>
  </v-flex>
  </v-layout>
</template>
<script>
export default {
    name:'card',
    props:['recipe'],
    computed:{
    recipes(){
      return this.$store.getters.FeatureRecipes
    }
  },
}
</script>