<template>
<v-app id="register">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="info">
                <v-toolbar-title>Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="email"  label="Email" type="text" v-model="email"></v-text-field>
                  <v-text-field prepend-icon="lock"  label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="signUp">Sign Up</v-btn>
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
    name:'register',
    data:function(){
        return{
            email:'',
            password:'',
        };
    },
    methods:{
        signUp: function(e){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(
                user =>{
                    alert('Account created!');
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