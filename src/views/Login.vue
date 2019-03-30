<template>
<v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="email"  label="Email" v-model="email"></v-text-field>
                  <v-text-field prepend-icon="lock"  label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="LogIn" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import firebase from 'firebase'

export default{
    name:'login',
    data:function(){
        return{
            email:'',
            password:'',
        };
    },
    methods:{
        
        LogIn: function(e){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(
                user =>{
                    alert('Welcome!');
                    this.$router.push('/dashboard');
                },
                err =>{
                    alert(err.message);
                }
            );
            e.preventDefault();
        }
    }
}
</script>