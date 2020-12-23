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
                        <!--     <v-text-field v-for="(ingredient,index) in ingredients" :key="index"
                                v-model="ingredients[index]"
                                label="ingredients"
                                ></v-text-field>
                                <v-text-field
                                @keydown.enter.prevent="adding" v-model="another"
                                label="ingredients"
                                required
                                placeholder="press enter to add ingredient"
                                ></v-text-field> -->
                            <multiselect v-model="ings" tag-placeholder="Add new ingredient" track-by="code" placeholder="Search or add a ingredient" label="name"  :options="ingredients" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
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
                            <vue-tel-input  v-model="phone" :dynamicPlaceholder=true  name='telephone' :enabledCountryCode=false 
                            mode='international'></vue-tel-input>
                            {{phonenumber}}
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
import { VueTelInput } from 'vue-tel-input'
import Multiselect from 'vue-multiselect'

export default {
    name:'Recipes',
    components:{VueTelInput,Multiselect},
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
            another:null,
            phone:'',
            methods:[],
            anothermethod:null,
            value: null,
            ingredients: [
        { name: 'salt', code: 'vu' },
        { name: 'pepper', code: 'js' },
        { name: 'white sugar', code: 'ws' },
        { name: 'brown sugar', code: 'bs' },
        { name: 'Vinegar', code: 'vi' },
        { name: 'Baking Powder,', code: 'bp' },
        { name: 'Olive oil', code: 'oo' },
        { name: 'Peanut oil', code: 'po' },
        { name: 'Coconut oil', code: 'co' },
        { name: 'Spices ', code: 'sp' },
        { name: 'milled pepper', code: 'mp' },
        { name: 'basil', code: 'ba' },
        { name: 'oregano', code: 'or' },
        { name: 'parsley', code: 'pa' },
        { name: 'garlic powder', code: 'gp' },
        { name: 'onion powder', code: 'op' },
        { name: 'cinnamon', code: 'ci' },
        { name: 'nutmeg', code: 'nu' },
        { name: 'chili', code: 'ch' },
        { name: 'cumin', code: 'cu' },
        { name: 'thyme', code: 'th' },
        { name: 'vanilla', code: 'va' },
        { name: 'Flours', code: 'fl' },
        { name: 'parsley', code: 'py' },
        { name: 'Almond flour', code: 'af' },
        { name: 'Coconut Flour', code: 'cf' },
        { name: 'Soy Sauce', code: 'ss' },
        { name: 'garlic', code: 'gl' },
        { name: 'Onion', code: 'on' },
        { name: 'black olives', code: 'bk' },
        { name: 'mint tea bags', code: 'mt' },
        { name: 'tea bags', code: 'tb' },
        { name: 'Nuts', code: 'nu' },
        { name: 'Pumpkin seeds', code: 'ps' },
        { name: 'sunflower seeds', code: 'nu' },
        { name: 'walnuts', code: 'wl' },
        { name: 'pine nuts', code: 'pi' },
        { name: 'nut butters', code: 'nb' },
        { name: 'cashews and pecans', code: 'sh'},
        { name: 'Sun-dried tomatoes', code: 'sd' },
        { name: 'pesto', code: 'ps' },
        { name: 'pumpkin', code: 'mk' },
        { name: 'coffee', code: 'fa' },
        { name: 'Cheeses ', code: 'hs' },
        { name: 'mozzarella', code: 'zm' },
        { name: 'Greek yogurt', code: 'on' },
        { name: 'cheese', code: 'fa' },
        { name: 'butter', code: 'fa' },
        { name: 'ground beef', code: 'gr' },
        { name: 'eggs', code: 'sg' },
        { name: 'sliced pepperoni', code: 'fa' },
        { name: 'coffee', code: 'fa' },
        { name: 'coffee', code: 'fa' },
        ],
        ings:[]
    }
    },
    computed:{
        formIsValid () {
                return this.title !== '' && 
                    this.location !== '' &&
                    this.imageurl !== '' &&
                    this.category !== null &&
                    this.description !== '' &&
                    this.ings !==''
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
            },
            phonenumber(){
        return this.phone.replace(/[^+\d]+/g, "")
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
                ingredients:this.ings,
                methods:this.methods,
                date:this.submittableDateTime,
                phone:this.phonenumber
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
      /*       adding(){
            if(this.another){
                this.ingredients.push(this.another)
                this.another=null
            }
        }, */
        addmethod(){
            if(this.anothermethod){
                this.methods.push(this.anothermethod)
                this.anothermethod = null
            }
        },
        addTag(newTag){
        const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
    }
        this.ingredients.push(tag)
        this.ings.push(tag)
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>