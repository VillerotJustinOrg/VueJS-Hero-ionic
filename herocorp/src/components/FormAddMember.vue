<template>
  <v-dialog v-model="showForm">
    <template v-slot:activator="{ on,attrs }">
      <v-btn color="blue" dark v-on="on" v-bind="attrs">Add Member</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add a Member</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
            v-model="name"
            label="Name"
            required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="showForm = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="callAddMember">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "FormAddMember",
  data: () => ({
    name: "",
    showForm: false
  }),
  methods: {
    ...mapActions("data", ["addMember"]),
    callAddMember() {
        this.addMember({publicName: this.name, realName: this.name})
        this.showForm = false;
    }
  }
}
</script>

<style scoped>

</style>