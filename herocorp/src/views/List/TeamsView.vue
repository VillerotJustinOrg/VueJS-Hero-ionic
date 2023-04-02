<template>
  <div>
    <h1>Team List</h1>
    <FormAddTeam></FormAddTeam>
    <v-data-table
        :headers="headers"
        :items="teamList"
        @click:row="goToTeamDetail">
    </v-data-table>
    {{teamList[1]}}
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import FormAddTeam from "@/components/FormAddTeam";

export default {
  name: "TeamView",
  data: () => ({
    headers: [
      {text: 'Id', value: '_id'},
      {text: 'Nom', value: 'name'},
      {text: 'NbAffiliation',value:'nbAffiliations'},
    ],
    showForm: false,
  }),
  components: {FormAddTeam},
  computed: {
    ...mapState("data",["teamList"])
  },
  methods:{
    ...mapActions("data",["loadTeam"]),
    async goToTeamDetail(item) {
      console.log("goToTeamDetail",item)
      await this.$store.dispatch("data/loadTeam", item)
      console.log("push")
      this.$router.push({name: "teamDetail", params: {id: item._id}})
    }
  }
}
</script>

<style scoped>

</style>