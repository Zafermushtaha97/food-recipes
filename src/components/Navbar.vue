<template>
    <div>
        
        <v-card elevation="1">
                <v-toolbar  class="amber lighten-1"  dark>
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title> 
                        <router-link to="/" tag="span" style="cursor: pointer">Recipes</router-link>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn class="hidden-xs-only" text  v-for="item in meunitems" :key="item.title"
                    router :to="item.route">
                        <v-icon left dark>{{item.icon}}</v-icon>
                     {{ item.title }}
                    </v-btn>
                     <v-btn text v-if="userIsAuthenticated" :to="'/account/' +UserisLogin">
                        <v-icon left dark >mdi-account-box</v-icon>
                        My Account
                    </v-btn>
                    <v-btn text v-if="userIsAuthenticated" @click="logout">
                        <v-icon left dark >mdi-exit-to-app</v-icon>
                        Logout
                    </v-btn>
                </v-toolbar>
            </v-card>

                      <v-navigation-drawer v-model="drawer" light="" absolute temporary color="white">
                <v-list>
                    <v-list-item v-for="item in meunitems" :key="item.title" router :to="item.route">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>  
                     <v-list-item v-if="userIsAuthenticated" :to="'/account/' + UserisLogin">
                        <v-list-item-icon>
                            <v-icon>mdi-account-box</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>My Account</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="userIsAuthenticated" @click="logout">
                        <v-list-item-icon>
                            <v-icon>mdi-exit-to-app</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>LogOut</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            drawer:false
        }
    },
    computed:{
        meunitems() {
              let meunitems = [
                {title:'Sign Up' , icon:'mdi-account-edit-outline' , route:'/Signup'},
               {title:'Sign in' , icon:'mdi-login', route:'/Signin'}
        
          
        ]
                if(this.userIsAuthenticated){
                    meunitems =[
                         {title:'FoodRecipes' , icon:'mdi-food' , route:'/recipes'},
                         {title:'Create Recipe' , icon:'mdi-knife', route:'/create'},
                        //  {title:'Profile',icon:'mdi-account-box',route:'/profile'}
                    ]
                }
            return meunitems
        },
          userIsAuthenticated(){
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
             UserisLogin(){
            if(!this.userIsAuthenticated){
                return false
            }
             return this.$store.getters.user.id   
    },
    },
  

    methods:{
        logout(){
            this.$store.dispatch('Logout')
        }
    },

}
</script>