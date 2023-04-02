<template>
  <ion-app>
    <NavBar />
    <ErrorDialog></ErrorDialog>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet} from "@ionic/vue";
import NavBar from "@/components/Navbar.vue";
import { mapActions } from "vuex";
import ErrorDialog from "@/components/ErrorDialog.vue";
export default {
  name: "App",
  components: { ErrorDialog, NavBar },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions("data", ["loading"]),
  },
  created() {
    this.loading();
  },
};
</script>
