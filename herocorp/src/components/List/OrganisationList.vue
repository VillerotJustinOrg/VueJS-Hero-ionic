<template>
  <ion-content>
      <h1>Organisation List: </h1>
      <FormAddOrg></FormAddOrg>
      <ion-grid
              :headers="header"
              :items="orgList"
      >

      </ion-grid>

  </ion-content>
</template>

<script setup lang="ts">
import FormAddOrg from "@/components/Form/FormAddOrg.vue";

const header:any = [
    {text: 'Id', value: '_id'},
    {text: 'Name', value: 'name'}
]
let orgList: any
</script>

<style scoped>

</style>