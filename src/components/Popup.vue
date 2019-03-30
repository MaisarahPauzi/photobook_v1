<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn slot="activator"  color="info">
        <v-icon>edit</v-icon>EDIT
     </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Edit Image Details
        </v-card-title>

        <v-card-text>
          <v-text-field label="New Title"  box v-model="newtitle"></v-text-field>
          <v-text-field label="New Caption"  box v-model="newcaption"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn
            color="primary"
            flat
            @click="updateData()"
          >
            SAVE
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            EXIT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import firebase from 'firebase'
import db from '../components/firebaseInit';
export default {
      props:{
          id:{
            type: String,
            required: true
          },
          title: {
            type: String,
            required: true
        },
        caption:{
            type: String,
            required:true
        }
      },
    data () {
      return {
        item_id: this.id,
        newtitle: this.title,
        newcaption: this.caption,
        dialog: false
      }
    },
    methods:{
      updateData(){
        db.collection("item").doc(this.item_id).update({
            "title": this.newtitle,
            "caption": this.newcaption
        })
        .then(function() {
            console.log("Document successfully updated!");
        });
      }
    }
  }
</script>
