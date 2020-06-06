<template>
  <v-app>
    <v-app-bar color="#CEAB7E" app>
        <img src="../assets/icon.png" height="54px"/>
      <v-toolbar-title class="display-1 white--text shoptitle">
        KHAIBOOK
      </v-toolbar-title>
      <v-spacer/>
      <v-app-bar-nav-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-content>
      <nuxt-child>
      </nuxt-child>
    </v-content>
  </v-app>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;400&display=swap');

.v-application{
  font-family: 'Kanit', sans-serif !important;
}
.shoptitle{
  text-shadow: 0px 2.80183px 2.80183px rgba(0, 0, 0, 0.25);
}
</style>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
