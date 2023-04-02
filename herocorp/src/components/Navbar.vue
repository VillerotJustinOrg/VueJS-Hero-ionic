<template>
  <div>
    <v-navigation-drawer v-model="showLeftMenu" absolute temporary app>
      <v-list>
          <v-list-item>
              <v-app-bar-nav-icon @click="showLeftMenu = false"></v-app-bar-nav-icon>
          </v-list-item>
          <v-list-item :to="{name:'home'}">
              <v-list-item-content>home</v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:'teams'}">
              <v-list-item-content>teams</v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:'organisations'}">
              <v-list-item-content>organisations</v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:'profile'}">
              <v-list-item-content>profile</v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:'auth'}">
              <v-list-item-content>login</v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app hide-on-scroll>
        <v-app-bar-nav-icon @click="showLeftMenu = true"></v-app-bar-nav-icon>
        <h1>
            Hero-corp
        </h1>
        <v-spacer></v-spacer>
        User:
        {{Username}}
        <v-spacer></v-spacer>
        OrgPassword:
        {{passwd}}
        <v-spacer></v-spacer>
        <!--            <v-btn icon>-->
        <!--                <v-icon>mdi-magnify</v-icon>-->
        <!--            </v-btn>-->
        <v-btn to="/auth">Log In</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    showLeftMenu: false
  }),
  computed: {
    passwd() {
      return this.$store.state.auth.passwd
    },
    Username() {
        if (this.$store.state.data.currentuser != null){
            return this.$store.state.data.currentuser.name
        }
        return ""
        //return this.$store.state.data.currentuser
    }
  }
}
</script>

<style scoped>

</style>