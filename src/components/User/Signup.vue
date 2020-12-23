<template>
<div class="signup">
    <v-container class="mt-14">
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
            <v-card   >
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="Signup">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="username"
                                                label="Username"
                                                id="username"
                                                :rules="nameRules"
                                                v-model="username"
                                                type="text"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="email"
                                                label="Mail"
                                                id="email"
                                                :rules="emailRules"
                                                v-model="email"    
                                                type="email"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="password"
                                                label="Password"
                                                id="password"
                                                :rules="passwordRules"
                                                v-model="password"
                                                type="password"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                id="confirmPassword"
                                                v-model="confirmPassword"
                                                type="password"
                                                :rules="[comparepassword]"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit">
                                            Sign up
                                            <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon></span>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    </div>
</template>


<script>

export default {
    name:'signup',
    data(){
        return{
            username:'',
            email:'',
            password:'',
            confirmPassword:'',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 14) || 'Name must be less than 14 characters',
                v => (v && v.length >= 4) || 'Name must be more than 4 characters',
                ],
            emailRules:[
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules:[
                v => !!v || 'Password is required',
                v => (v && v.length >=6) || 'password must be more than 6 characters'
            ]

        }
    },
    computed:{
        comparepassword(){
            return this.password !== this.confirmPassword ? 'Password dont match' :'' 
        },
        user(){
            return this.$store.getters.user
        },
    },
    watch:{
        user (value){
            if (value !== null && value !== undefined){
                this.$router.push('/')
            }
        }
    },
    methods:{
        Signup(){
            //this.$refs.form.validate()
            this.$store.dispatch('Signupusers',{email:this.email,password:this.password,username:this.username})
            this.$router.push('/')
        }
    }
    
}
</script>

<style scoped>
.signup{
    /* background-image:url(../../assets/interface3.jpg); */
    background-position: center !important;
  background-size: cover !important;
  height: 570px;
}
    
</style>