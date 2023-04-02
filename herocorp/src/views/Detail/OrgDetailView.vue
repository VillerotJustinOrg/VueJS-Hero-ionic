<template>
  <div>
    <h1>Organisation Details : {{currentOrg.name}}</h1>
    <v-data-table
        :headers="headers"
        :items="currentOrg.teams">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="red" @click="del(item)">Delete</v-btn>
        <v-btn color="green" @click="more(item)">More</v-btn>
      </template>
    </v-data-table>
    <AddTeamToOrg></AddTeamToOrg>
    {{currentOrg}}
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import AddTeamToOrg from "@/components/AddTeamToOrg";

export default {
  name: "OrgDetailView",
  components: {AddTeamToOrg},
  data: () => ({
    headers: [
      {text: 'Id', value: '_id'},
      {text: 'Nom', value: 'name'},
      {text: 'size', value: 'members.length'},
      {text: 'Actions', value:'actions'}
    ],
  }),
  computed: {
    ...mapState("data",["currentOrg"])
  },
  methods: {
    ...mapActions("data",["removeTeamInOrg"]),
    ...mapState("data",["loadTeam"]),
    ...mapMutations("errors",["pushError"]),
    del(item) {
      this.removeTeamInOrg(item)
    },
    async more(item) {
      console.log('more',item)
      await this.$store.dispatch("data/loadTeam", item)
      this.$router.push({name: "teamDetail", params: {id: item._id}})
    }
  },
  created() {
    console.log(this.currentOrg)
    if (! this.currentOrg) {
      this.pushError("You must log in / wrong password")
      this.$router.push({name: "auth"})
    }
  }
}
</script>

<style scoped>

</style>