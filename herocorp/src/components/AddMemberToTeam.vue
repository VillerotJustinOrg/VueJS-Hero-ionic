<template>
  <v-dialog v-model="showForm">
    <template v-slot:activator="{ on,attrs }">
      <v-btn color="blue" dark v-on="on" v-bind="attrs">Add Member to Team</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add a member to a team</span>
      </v-card-title>
      <v-select
          v-model="selectedOrg"
          :items="heroList"
          item-text="publicName"
          item-value="_id"
          label="Hero"
          required></v-select>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="showForm = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="addMembre">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "AddMemberToTeam",
  data: () => ({
    nom: "",
    showForm: false,
    selectedOrg: null,
  }),
  computed:{
    ...mapState("data",["heroList"])
  },
  methods: {
    ...mapActions("data", ["addMemberToTeam"]),
    async addMembre() {
        this.showForm = false;
        this.addMemberToTeam({idHeroes: [this.selectedOrg], idTeam: this.$route.params.id}).then(
            this.$store.dispatch("data/loadTeam", this.$store.state.data.currentTeam).then(
                this.$router.push({name: "teamDetail", params: {id: this.$store.state.data.currentTeam._id}})
            )
        )
    }
  }
}
</script>

<style scoped>
.button-color{
    color: black;
}
</style>