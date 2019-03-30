<template>
  <div class="dashboard">
     <v-container grid-list-xl>
    <v-layout align-center justify-center v-for="item of items">
      <v-flex xs12 sm8 md6>
        <v-card>
          <v-img
              v-bind:src="item.imageUrl" 
              aspect-ratio="1"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{item.title}}</h3>
                <p>{{item.caption}}</p>
              </div>
            </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>
<script>
import firebase from 'firebase'
import db from '../components/firebaseInit';
export default{
    
    data:function(){
        return{
          items:[],
        };
    },
    created(){
      db.collection('item').onSnapshot((snapshot)=>{snapshot.docs.forEach(doc=>{
          this.items.push({
            id:doc.id,
            title: doc.data().title,
            caption: doc.data().caption,
            imageUrl: doc.data().imageUrl
          })
        })
      })
    },
    methods:{
        
    }
}
</script>