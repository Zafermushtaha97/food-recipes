<template v-slot:activator="{ on }">
    <v-container class="mx-auto">
        <v-layout row>
            <v-flex xs12 class="mt-5 " offset-sm3>
                <h5 class="amber--text darken-2--text
 display-2 font-weight-light lora">Create a new food recipe</h5>
            </v-flex>
        </v-layout>
        <v-layout row class="mt-5">
            <v-flex xs12>
                <v-form @submit.prevent="createrecipe">
                    <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="title" v-model="title" id="title" label="Title" Required></v-text-field>
                        </v-flex>
                    </v-layout>
                        <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea name="description" v-model="description" id="description" label="Description" Required></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                               <v-text-field v-for="(ingredient,index) in ingredients" :key="index"
                                v-model="ingredients[index]"
                                 label="ingredients"
                                  ></v-text-field>
                                <v-text-field
                                @keydown.enter.prevent="adding" v-model="another"
                                label="ingredients"
                                required
                                placeholder="press enter to add ingredient"
                                 ></v-text-field>
                        </v-flex>
                    </v-layout>
                      <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                               <v-text-field v-for="(method,index) in methods" :key="index"
                                v-model="methods[index]"
                                 label="methods"
                                  ></v-text-field>
                                <v-text-field
                                @keydown.enter.prevent="addmethod" v-model="anothermethod"
                                label="methods"
                                required
                                placeholder="press enter to add method"
                                 ></v-text-field>
                        </v-flex>
                    </v-layout>
                     <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="location" v-model="location" id="location" label="Location" Required></v-text-field>
                        </v-flex>
                    </v-layout>
                        <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                              <v-select
                                v-model="category"
                                :items="items"
                                label="Category"
                                required
                               
                                ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn  @click="onPickFile" class="blue darken-2" dark>Upload Image</v-btn>
                            <input type="file"  ref="fileInput" @change="onFilePicked"
                                   class="d-none" accept="image/*"> <!--accept all type of img-->
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageurl" height="150">
                        </v-flex>
                    </v-layout>
                
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <h4>Choose a Data & Time</h4>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-2">
                        <v-flex xs12 sm6 offset-sm3>
                            <template>
                                <v-date-picker v-model="date"></v-date-picker>
                            </template>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker v-model="time" format="24hr"></v-time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn type="submit" class="blue accent-2 white--text" :disabled="!formIsValid">Create FoodRecipe</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name:'Recipes',
    data(){
       return{
           title:'',
           location:'',
           category:null,
           description:'',
           date: new Date().toISOString().substr(0, 10),
          time: new Date(),
          imageurl:'',
          items:['sweets','red foods','green foods'],
          image:null,
          ingredients:[],
          another:null,
          methods:[],
          anothermethod:null
       }
    },
    computed:{
          formIsValid () {
                return this.title !== '' &&
                    this.location !== '' &&
                    this.imageurl !== '' &&
                    this.category !== null &&
                    this.description !== ''
            },
              submittableDateTime () {
                const date = new Date(this.date)
                if (typeof this.time === 'string') {
                    let hours = this.time.match(/^(\d+)/)[1]
                    const minutes = this.time.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)
                } else {
                    date.setHours(this.time.getHours())
                    date.setMinutes(this.time.getMinutes())
                }
                return date
            }
    },
    methods:{
        createrecipe(){
            if (!this.formIsValid){
                return
            }
            if(!this.image){
                return
            }
            const recipedata= {
                title:this.title,
                location:this.location,
                description:this.description,
                category:this.category,
                image:this.image,
                ingredients:this.ingredients,
                methods:this.methods,
                date:this.submittableDateTime
            }
            this.$store.dispatch('createRecipe', recipedata)
            this.$router.push('/recipes')
        },
            onPickFile () {
                this.$refs.fileInput.click()
            },
            onFilePicked (event) {
                const files = event.target.files
                let filename = files[0].name
                if (filename.lastIndexOf('.') <= 0) {
                 return alert('Please add a valid file!')
                }
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                 this.imageurl = fileReader.result
                })
                fileReader.readAsDataURL(files[0])
                 this.image = files[0]
            },
            adding(){
            if(this.another){
                this.ingredients.push(this.another)
                this.another=null
            }
        },
        addmethod(){
            if(this.anothermethod){
                this.methods.push(this.anothermethod)
                this.anothermethod = null
            }
        }
        
    }

}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Lora&display=swap');
    .lora{
        font-family: 'Lora', serif !important;
    }
</style>