<template>
<v-layout>
  <v-toolbar app>
    
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="isLoggedIn"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase"  @click="goTo('/')">
        <span>Vue App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
  
      <v-btn
        flat
        target="_blank"
        @click="goTo('login')"
        v-if="!isLoggedIn"
      >
        <span class="mr-2">Login</span>
      </v-btn>
    <v-btn
        flat
        target="_blank"
        @click="goTo('register')"
        v-if="!isLoggedIn"
      >
        <span class="mr-2">Register</span>
      </v-btn>
    
    <v-btn
        flat
        target="_blank"
        @click="loggingOut"
        v-if="isLoggedIn"
      >
        <span class="mr-2">Logout</span>
      </v-btn>
      </v-toolbar>
      <v-navigation-drawer fixed v-model="drawer" app v-if="isLoggedIn">
        <v-list dense>
          <v-list-tile @click="goTo('dashboard')">
                <v-list-tile-action>
                  <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click="goTo('upload')">
                <v-list-tile-action>
                  <v-icon>cloud_upload</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Upload Picture</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click="goTo('edit')">
                <v-list-tile-action>
                  <v-icon>edit</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Edit Gallery</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
          </v-list>
      </v-navigation-drawer>
 </v-layout>
</template>
<script>
import firebase from 'firebase'

export default{
    data(){
        return{
          drawer: false,
          isLoggedIn: false,
        }
    },
    created(){
        if(firebase.auth().currentUser){
            this.isLoggedIn = true;
        }
    },
   methods:{
    loggingOut(){
      firebase.auth().signOut()
        .then(() => {
            alert('Are you sure you want to logout?');
            this.$router.go({ path: this.$router.path });
        });
    },

    goTo(page){
      this.$router.push(page);      
    }
  }
}
</script>