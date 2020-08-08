<template>
<v-dialog width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
    <v-btn  class="mx-2" accent  v-on="on" @click.stop="dialog=true">Edit Date
        <v-icon>mdi-timetable</v-icon>
    </v-btn>
    </template>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title>
                        Edit Recipe Date
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12> 
                    <v-date-picker v-model="editeddate" full-width actions>
                        <template>
                           <v-btn text class="blue--text" @click.native="onSaveChanges()" >save

                           </v-btn>
                            <v-btn text class="blue--text" @click.native="editDialog = false" >Close

                            </v-btn>
                        </template>
                    </v-date-picker>
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
            editeddate:null
        }
    },
    methods: {
        onSaveChanges(){
            const newdate = new Date(this.recipe.date)
            const newday  = new Date(this.editeddate).getUTCDate()
            const newmonth  = new Date(this.editeddate).getUTCMonth()
            const newyear  = new Date(this.editeddate).getUTCFullYear()
            newdate.setUTCDate(newday)
            newdate.setUTCMonth(newmonth)
            newdate.setUTCFullYear(newyear)
            this.$store.dispatch('UpdateRecipe',{
                id:this.recipe.id,
                date:newdate
            })
            return this.dialog = false
        }
    },
    created(){
        this.editeddate = new Date(this.recipe.date).toISOString().substr(0,10)
    }
}
</script>