<template>
  <v-dialog v-model="showForm">
    <template v-slot:activator="{ on,attrs }">
      <v-btn color="blue" dark v-on="on" v-bind="attrs">Add Team To Org</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline" id="buttonAddTeamToOrg">Add Team To Org</span>
      </v-card-title>
      <v-select
          v-model="selectedTeam"
          :items="teamList"
          item-text="name"
          item-value="_id"
          label="Hero"
          required></v-select>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="showForm = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="addTeam">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "AddTeamToOrg",
  data: () => ({
    nom: "",
    showForm: false,
    selectedTeam: null,
  }),
  computed:{
    ...mapState("data",["teamList"])
  },
  methods: {
    ...mapActions("data", ["addTeamToOrg"]),
    addTeam() {
      this.showForm=false
      console.log("team")
      console.log(this.selectedTeam)
      this.addTeamToOrg(this.selectedTeam)
    }
  }
}
</script>

<style scoped>
#buttonAddTeamToOrg{
  color: black;
}
</style>