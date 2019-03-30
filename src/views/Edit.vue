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
           <v-card-actions>
                  <v-spacer></v-spacer>
                  <Popup :id="item.id" :title="item.title" :caption="item.caption"></Popup>
                  
                  <v-btn  color="error" @click="deleteData(item,index)">
                    <v-icon>delete</v-icon>DELETE
                  </v-btn>
            </v-card-actions>
                
            
            
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>
<script>
import firebase from 'firebase'
import db from '../components/firebaseInit';
import Popup from '../components/Popup';
import storage from 'firebase/storage'
export default{
    components:{
      Popup,
    },
    data:function(){
        return{
          items:[],
        };
    },
    created(){
        var self = this;
        var userID = firebase.auth().currentUser.uid;
        
     
      db.collection("item").where("ownerID", "==", userID)
        .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) { 
                self.items.push({
                    id:doc.id,
                    title: doc.data().title,
                    caption: doc.data().caption,
                    imageUrl: doc.data().imageUrl,
                    filename: doc.data().filename
                    
                })
            });
        });
    },
    methods:{
      deleteData(item,index){
        
        var storageRef = firebase.storage().ref();
        
        var fileRef = storageRef.child('uploads/' + item.filename);
        //delete storage
        fileRef.delete().then(function() {
                console.log("Picture deleted!");
              }).catch(function(error) {
                console.log(error);
              });
        //delete database
        db.collection("item").doc(item.id).delete().then(function() {
            console.log("Document successfully deleted!");
            
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        this.items.splice(index,1);

        
        
      },
        
    }
}
</script>