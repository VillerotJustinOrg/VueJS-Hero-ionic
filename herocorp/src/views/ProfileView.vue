<template>
  <ion-content>
    <ion-text>
      <h1>
        Public name:
        <!-- {{ currentHero.publicName }}-->
      </h1>
    </ion-text>
    <ion-text>
      <h1>
        Ream Name:
        <!-- {{ currentHero.realName }}-->
      </h1>
    </ion-text>
    <ion-grid
      style="padding-top: 10px"
      :headers="headers"
      :items="currentHero.powers"
    >
      <template v-slot:[`item.type`]="{ item }">
        <span>{{ powerType[(item.type - 1) % 7].value }}</span>
      </template>
    </ion-grid>
    <EditUserAPI></EditUserAPI>

    <ion-text>
      <h2>Raw:</h2>
      {{ currentHero }}
    </ion-text>
  </ion-content>
</template>

<script setup>
import { IonContent, IonGrid, IonText } from "@ionic/vue";
import { mapState } from "vuex";
import EditUserAPI from "@/components/EditUserAPI.vue";

export default {
  name: "ProfileView",
  components: { EditUserAPI },
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
};
</script>

<style scoped></style>
