<template>
  <div>
      <v-container>
          <div>
              <h1>Enter Organisation Password :</h1>
              <v-text-field
                  v-model="password"
                  label="Password"
                  required
              ></v-text-field>
              <v-btn @click="auth">Log In</v-btn>
              <!--            type="password"-->
          </div>
          <div style="padding-top: 10px">
              <h1>User Connexion</h1>
              <v-form>
                  <v-text-field
                      v-model="username"
                      label="Username"
                      required>
                  </v-text-field>
                  <v-text-field
                      v-model="passwordUser"
                      label="Password"
                      required>
                  </v-text-field>
                  <v-btn @click="userSignIn">User Log In</v-btn>
              </v-form>
          </div>
      </v-container>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "AuthView",
  data: () => ({
      password: "",
      username: "",
      passwordUser: ""
  }),
  methods: {
      ...mapMutations("auth",["setPasswd"]),
      ...mapActions("data",["singInAPI"]),
      ...mapActions("data",["getUserAPI"]),
      auth() {
          this.setPasswd(this.password)
      },
      async userSignIn(){
          //{ login: ..., password: ...}
          await this.singInAPI({login: this.username, password: this.passwordUser})
          await this.getUserAPI()
          this.$router.push({name:"profile"})
      }
  }
}
</script>

<style scoped>

</style>