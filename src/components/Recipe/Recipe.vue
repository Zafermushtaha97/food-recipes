<template>
    <div>
       <div class="home-back d-flex align-center text-center">
           <v-layout>
               <v-flex>
                   <h2>Recipe details</h2>
               </v-flex>
           </v-layout>
       </div>
       <div class="mt-12">
           <v-container>
           <v-layout>
               <v-flex xs8 class="mx-auto">
                   <v-layout>
                       <v-flex xs12>
                           <v-img :src="recipe.imageurl" max-height="425"></v-img>
                       </v-flex>
                   </v-layout>
                    <v-layout>
                       <v-flex xs12>
                           <h1 class="mt-6 spec-title">{{recipe.title}}</h1>
                            <!-- <div class="" v-if="UserCreator">
                                <v-dialog
                                v-model="dialog"
                                width="500"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    color="red lighten-2"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                   delete
                                    </v-btn>
                                </template>

                                <v-card>
                                    <v-card-title class=" grey lighten-2">
                                    Are you sure to reomve a recipe ?
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        text
                                         @click.native="deleterecipe(recipe.id)">
                                        Yes
                                    </v-btn>
                                      <v-btn
                                        color="primary"
                                        text
                                        @click="dialog = false"> Cancel
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                                </v-dialog>
                            </div> -->
                       </v-flex>
                   </v-layout>
                      <v-layout>
                       <v-flex xs12>
                           <div class="mt-4 blue-grey--text lighten-3--text
                            ">{{recipe.date | date}} | {{recipe.category}} | {{recipe.location}}

                        <edit-time v-if="UserCreator" :recipe = 'recipe'></edit-time>
                        <edit-date v-if="UserCreator" :recipe='recipe'></edit-date>
                        </div>
                       </v-flex>
                   </v-layout>
                   <v-layout>
                       <v-flex xs12>
                           <p class="mt-6 spec-desc">{{recipe.description}}</p>
                       </v-flex>
                   </v-layout>
                   <v-layout class="mb-8">
                       <v-flex xs6 class="mr-8">
                           <h2 class="bubble orange lighten-1 white--text py-3 px-5 rounded-lg my-6 ">Ingredients</h2>
                            <li v-for="ing in recipe.ingredients" :key="ing" class="ingredient mt-2">
                                {{ing}}

                            </li>
                       </v-flex>
                         <v-flex xs6 class="ml-4">
                           <h2 class="bubble orange lighten-1 white--text py-3 px-5 rounded-lg my-6 ">Methods</h2>
                            <li v-for="method in recipe.methods" :key="method" class="ingredient mt-2 upper-roman">
                                {{method}}

                            </li>
                       </v-flex>
                   </v-layout>
               </v-flex>
               <v-flex xs3 class="mx-8" v-if="UserCreator">
                   <edit-recipe :recipe='recipe'></edit-recipe>
               </v-flex>
           </v-layout>
           </v-container>
       </div>
    </div>
</template>

<script>
export default {
    name:'recipe',
    props:["id"],
    data(){
        return{
            
        }
    },
    components:{
    },
    computed:{
        recipe(){
            return this.$store.getters.LoadRecipe(this.id)
        },
         UserIsAuthenticated(){
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined            
                },
            UserCreator(){
                if(!this.UserIsAuthenticated){
                    return false
                }
                return this.$store.getters.user.id === this.recipe.createdid     
            },
    },
    methods:{
       
    },
}
</script>

<style  scopped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,200&display=swap');
    .home-back{
        background-image: url('../../assets/interface1.jpg') !important;
         background-position: center !important;
         background-size: cover !important;
         height: 14em;
         font-family: 'Josefin Sans', sans-serif;
            font-weight: 500;
    }
    .home-back h2{
        font-size: 40px;
        color: white;
    }
    .spec-title{
        font-weight: 600 !important;
         font-family: 'Josefin Sans', sans-serif;
    }
    .spec-desc{
        font-family: 'Poppins', sans-serif;
        font-size: 24px;
        color: #10285D;
    }.bubble{
         font-family:Georgia, 'Times New Roman', Times, serif;
         font-size: 20px;
        font-style: italic;

    }
    .ingredient{
         font-family:Georgia, 'Times New Roman', Times, serif;
        font-size: 18px;
        color: #10285D;
    }
    .upper-roman{
        list-style-type: upper-roman;
    }
</style>