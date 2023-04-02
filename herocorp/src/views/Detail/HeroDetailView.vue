<template>
  <ion-content>
    <ion-title>
      Public name:
      <!--  {{ currentHero.publicName }}-->
    </ion-title>
    <ion-title>
      Ream Name:
      <!-- {{ currentHero.realName }}-->
    </ion-title>
    <ion-grid
      style="padding-top: 10px"
      :headers="headers"
      :items="currentHero.powers"
    >
      <!-- 
        <template v-slot:[`item.type`]="{ item }">
        <span>{{ powerType[(item.type - 1) % 7].value }}</span>
        </template>
        -->
    </ion-grid>
    <EditUser></EditUser>
    <h2>Raw:</h2>
    {{ currentHero }}
  </ion-content>
</template>

<script>
import "@ionic/vue";
import { mapState } from "vuex";
import EditUser from "@/components/EditUser.vue";

export default {
  name: "HeroDetailView",
  components: { EditUser },
  computed: {
    ...mapState("data", ["currentHero"]),
  },
  data: () => ({
    powerType: [
      { value: "force" },
      { value: "vitesse" },
      { value: "endurance" },
      { value: "magie" },
      { value: "effrayant" },
      { value: "furtivité" },
      { value: "stupidité" },
    ],
    headers: [
      { text: "Name", value: "name" },
      { text: "Type", value: "type" },
      { text: "Level", value: "level" },
    ],
  }),
  methods: {
    formatPower(value) {
      console.log(value);
      switch (value) {
        default:
          return "error";
        case 0:
          //console.log("0 -> ", this.powerType[0]);
          return "force";
        case 1:
          //console.log("0 -> ", this.powerType[1]);
          return "vitesse";
        case 2:
          //console.log("0 -> ", this.powerType[2]);
          return "endurance";
        case 3:
          //console.log("0 -> ", this.powerType[3]);
          return "magie";
        case 4:
          //console.log("0 -> ", this.powerType[4]);
          return "effrayant";
        case 5:
          //console.log("0 -> ", this.powerType[5]);
          return "furtivité";
        case 6:
          //console.log("0 -> ", this.powerType[6]);
          return "stupidité";
      }
    },
    editPower(item) {
      console.log("editPower", item);
    },
    removePower(item) {
      console.log("removePower", item);
    },
  },
};
</script>

<style scoped></style>
