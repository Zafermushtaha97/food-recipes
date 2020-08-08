<template>
<v-dialog width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
    <v-btn  accent  v-on="on" @click.stop="dialog=true">Edit Recipe
        <v-icon>mdi-playlist-edit</v-icon>
    </v-btn>
    </template>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title>
                        Edit Post
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12> 
                    <v-card-text>
                            <v-text-field name="title"  id="title" label="Title"
                            v-model="editedtitle"
                          
                            Required></v-text-field>
                             <v-text-field name="location"  id="location" label="Location"
                            v-model="editedlocation"
                          
                            Required></v-text-field>
                             <v-textarea name="description" id="description" label="Description" 
                             v-model="editeddescription"
                             Required></v-textarea>
                               <v-select
                                v-model="editedcategory"
                                :items="items"
                                label="Category"
                                required
                                ></v-select>
                    </v-card-text>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-actions>
                        <v-btn text class="blue--text" @click="onsavechange()" >Save</v-btn>
                        <v-btn text class="blue--text" @click.stop="dialog=false">Close</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</v-dialog>  
</template>
<script>
export default {
    props:["recipe"],
    data(){
        return{
            dialog:false,
            editedtitle:this.recipe.title,
            editedlocation:this.recipe.location,
            editeddescription:this.recipe.description,
            editedcategory:this.recipe.category,
            items:['sweets','red foods','green foods'],
        }
    },
    methods:{
        onsavechange(){
            if (this.editedtitle.trim() === '' || this.editedlocation.trim() === '' || this.editeddescription === '' || this.editedcategory.trim() === '' ){
                return
            }
            this.dialog = false
            this.$store.dispatch('UpdateRecipe',{
                id:this.recipe.id,
                title:this.editedtitle,
                description:this.editeddescription,
                location:this.editedlocation,
                category:this.editedcategory
            })
        }
    },
}
</script>