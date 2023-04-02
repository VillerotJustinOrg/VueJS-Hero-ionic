<template>
  <ion-page>
      <ion-tabs>
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom">
              <ion-tab-button tab="tab1" href="/tabs/auth">
                  <ion-icon aria-hidden="true" :icon="people" />
                  <ion-label>Login</ion-label>
              </ion-tab-button>

              <ion-tab-button tab="tab2" href="/tabs/profile">
                  <ion-icon aria-hidden="true" :icon="accessibility" />
                  <ion-label>Profile</ion-label>
              </ion-tab-button>

              <ion-tab-button tab="tab3" href="/tabs/home">
                  <ion-icon aria-hidden="true" :icon="home" />
                  <ion-label>Home</ion-label>
              </ion-tab-button>

              <ion-tab-button tab="tab4" href="/tabs/orgs">
                  <ion-icon aria-hidden="true" :icon="briefcase" />
                  <ion-label>Organisations</ion-label>
              </ion-tab-button>

              <ion-tab-button tab="tab5" href="/tabs/teams">
                  <ion-icon aria-hidden="true" :icon="logoSteam" />
                  <ion-label>Teams</ion-label>
              </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { people, home , accessibility, briefcase, logoSteam} from 'ionicons/icons';
</script>
