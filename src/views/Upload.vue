<template>
  <v-container grid-list-xl>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6 md6>
        <v-card>
          <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Upload Picture</h3>
              </div>
            </v-card-title>
            <div align="center">
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                <v-text-field label="Title" placeholder="Insert title" box v-model="title"></v-text-field>
                <v-textarea label="Caption" placeholder="Insert caption" box v-model="caption"></v-textarea>
            </div>
            <div align="right">
              <v-btn color="info" v-on:click="submitData()">Submit</v-btn>
            </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center v-if="preview">
      <v-flex xs12 sm8 md6>
        <v-card>
            <v-card-title primary-title>
              <div>
                <h2 class="headline mb-0">Preview</h2>
                
              </div>
            </v-card-title>
          <v-img
              v-bind:src="imgUrl" 
              aspect-ratio="1"
            ></v-img>
            <v-card-text>
                <h3>{{title}}</h3>
                <p>{{caption}}</p>
            </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import firebase from 'firebase'
import storage from 'firebase/storage'
import db from '../components/firebaseInit';
export default{
    data: function(){
        return {
            preview: false,
            title:'',
            caption:'',
            newfile: '',
            imgUrl:'',
        };
    },

    created(){

    },
    methods:{
       
        handleFileUpload(){
            this.preview = true;
            this.newfile = this.$refs.file.files[0];
             var self = this;
             var storageRef = firebase.storage().ref();
            // Create the file metadata
            var metadata = {
            contentType: 'image/jpeg'
            };

            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef.child('uploads/' + this.newfile.name).put(this.newfile, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed', // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
            }, function(error) {

            }, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                self.imgUrl = downloadURL;
                console.log('File available at', downloadURL);
            });
            });
            
            
        },  
        submitData(){
            
            // Add a new document with a generated id.
          db.collection("item").add({
                title: this.title,
                caption: this.caption,
                imageUrl: this.imgUrl,
                filename: this.newfile.name,
                ownerID: firebase.auth().currentUser.uid,

            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            });
            this.preview = false;
            this.title = '';
            this.caption = '';
            this.imgUrl = '';
            
        }
    }
}
</script>