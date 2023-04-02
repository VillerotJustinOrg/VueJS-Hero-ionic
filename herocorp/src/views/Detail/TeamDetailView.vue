<template>
  <div>
      <FormAddMember></FormAddMember>
      <p>{{currentTeam.name}}</p>
      {{currentTeam.members}}
      <v-data-table
              :headers="headers"
              :items="currentTeam.members">
          <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="orange" @click="more(item)">More</v-btn>
              <v-btn color="red" @click="del(item)">Delete</v-btn>
          </template>
      </v-data-table>
      <AddMemberToTeam></AddMemberToTeam>
  </div>
</template>

<script>
import FormAddMember from "@/components/FormAddMember";
import {mapActions, mapMutations, mapState} from "vuex";
import AddMemberToTeam from "@/components/AddMemberToTeam";
export default {
  name: "TeamDetailView",
  components: {AddMemberToTeam, FormAddMember},
  computed: {
    ...mapState("data",["currentTeam"])
  },
  data: () => ({
    headers: [
      {text: 'Id', value: '_id'},
      {text: 'PublicName', value: 'publicName'},
      {text: 'RealName', value: 'realName'},
      {text: 'nb powers', value: 'powers.length'},
      {text:'Actions', value:'actions'}
    ],
  }),
  methods:{
      ...mapActions("data",["removeHeroInTeam"]),
      ...mapMutations("errors",["pushError"]),
      del(item) {
          this.removeHeroInTeam(item).then(
              this.$store.dispatch("data/loadTeam", this.$store.state.data.currentTeam).then(
                  this.$router.push({name: "teamDetail", params: {id: this.$store.state.data.currentTeam._id}})
              )
          )
      },
      async more(item) {
          console.log("edit item: ",item);
          await this.$store.dispatch("data/loadHero", item);
          console.log("currentHero", this.$store.state.data.currentHero);
          this.$router.push({name: "heroDetail", params: {id: this.$store.state.data.currentHero._id}})
      }
  },
  created() {
      console.log(this.currentTeam)
      if (! this.currentTeam) {
          this.pushError("You must log in / wrong password")
          this.$router.push({name: "auth"})
      }
  }
}
</script>

<style scoped>

</style>