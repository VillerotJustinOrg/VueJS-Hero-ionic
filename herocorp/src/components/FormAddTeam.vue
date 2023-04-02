<template>
  <v-dialog v-model="showForm" max-width="500px">
    <template v-slot:activator="{ on,attrs }">
      <v-btn color="blue" dark v-on="on" v-bind="attrs">Add Team</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Team</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  v-model="name"
                  label="Team Name"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showForm = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="callAddTeam">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "FormAddTeam",
  data: ()=>({
    showForm: false,
    name:""
  }),
  methods: {
    ...mapActions("data",["addTeam"]),
    callAddTeam() {
      console.log("callAddTeam")
      this.addTeam(this.name)
      this.showForm = false
    }
  }
}
</script>

<style scoped>

</style>