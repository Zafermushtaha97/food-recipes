<template>
<v-dialog width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
    <v-btn  accent class="mx-4" v-on="on" @click.stop="dialog=true">Edit Time
        <v-icon>mdi-timer</v-icon>
    </v-btn>
    </template>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title>
                        Edit Recipe Time
                        {{editedtime}}
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12> 
                    <v-time-picker v-model="editedtime" full-width actions format="24hr">
                        <template>
                           <v-btn text class="blue--text" @click.native="onSaveChanges()" >save

                           </v-btn>
                            <v-btn text class="blue--text" @click.native="dialog = false" >Close

                            </v-btn>
                        </template>
                    </v-time-picker>
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
            editedtime:null 
        }
    },
    methods:{
        onSaveChanges(){
            const newdate = new Date(this.recipe.date)
            const hours = this.editedtime.match(/^(\d+)/)[1]
            const minutes = this.editedtime.match(/:(\d+)/)[1]
            newdate.setHours(hours)
            newdate.setMinutes(minutes)
            this.$store.dispatch('UpdateRecipe',{
                id:this.recipe.id,
                date:newdate
            })
            return this.dialog = false
        }
    },
    created(){
        this.editedtime =new Date(this.recipe.date).toTimeString().substr(0, 9)
    }
}
</script>