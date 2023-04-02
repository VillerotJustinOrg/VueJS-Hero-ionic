<template>
  <div>
    <h1>Organisation List: </h1>
    <FormAddOrg></FormAddOrg>
    <v-data-table
        :headers="headers"
        :items="orgList"
        @click:row="goToOrgDetail">
    </v-data-table>
    {{orgList}}
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import FormAddOrg from "@/components/FormAddOrg";

export default {
  name: "OrganisationsView",
  components: {FormAddOrg},
  data: () => ({
    headers: [
      {text: 'Id', value: '_id'},
      {text: 'Name', value: 'name'}
    ],
  }),
  computed: {
    ...mapState("data",["orgList"])
  },
  methods: {
    ...mapActions("data" ,["loadOrg"]),
    async goToOrgDetail(item) {
      console.log("goToOrgDetail", item, "id: ", item._id)
      await this.loadOrg(item)
      this.$router.push({name: "orgDetailView", params: {id: item._id}})
    }
  }
}
</script>

<style scoped>

</style>