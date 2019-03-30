<template>
  <v-app id="app">
    <NavBar :key="$route.fullPath"></NavBar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import firebase from  'firebase'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data () {
    return {
      //
    }
  },
}
</script>
