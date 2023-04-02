<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>
                    AppTitle
                </ion-title>
            </ion-toolbar>
        </ion-header>
    </ion-page>
    <ion-text> Welcome on the hero website </ion-text>
</template>

<script setup>
import { IonPage, IonHeader, IonText } from "@ionic/vue";
export default {
  name: "HomeView",
};
</script>

<style scoped></style>
