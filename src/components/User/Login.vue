<template>
<div class="login ">
    <v-container class="mt-16">
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card  dark color="transparent">
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="SignIn">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="email"
                                                label="Mail"
                                                id="email"
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
                                                v-model="password"
                                                type="password"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit">Sign In</v-btn>
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
    name:'login',
    data(){
        return {
            email:'',
            password:''
        }
    },
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
        watch: {
            users (value) {
                if (value !== null && value !== undefined) {
                    this.$router.push('/')
                }
            }
        },

        methods:{
            SignIn(){
                this.$store.dispatch('Signinusers',{email:this.email,password:this.password})
                this.$router.push('/')
            }
        }
}
</script>

<style scopped>
    .login{
    background-image:url(../../assets/interface2.jpg);
    background-position: center !important;
  background-size: cover !important;
  height: 572px;
}
</style>