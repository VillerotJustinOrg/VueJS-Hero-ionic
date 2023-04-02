<template>
  <v-dialog v-model="showForm" max-width="500px">
    <template v-slot:activator="{ on,attrs }">
      <v-btn color="blue" dark v-on="on" v-bind="attrs">Add Organisation</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add an Organisation</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  v-model="name"
                  label="Organisation Name"
                  required
              />
              <v-text-field
                  v-model="passwd"
                  label="Password"
                  required
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showForm = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="callAddOrg">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "FormAddOrg",
  data: ()=>({
    showForm: false,
    passwd:"",
    name:""
  }),
  methods: {
    ...mapActions("data",["addOrg"]),
    callAddOrg() {
      console.log("addOrg called")
      //data.addOrg({name:this.name, secret:this.passwd})
      this.addOrg({name:this.name, secret:this.passwd})
      this.showForm = false
    }
  }
}
</script>

<style scoped>

</style>