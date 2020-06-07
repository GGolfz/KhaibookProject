<template>
  <v-container id="contain">
    <v-row class="row1" :style="{ background: info.color }">
      <v-col cols="1"></v-col>
      <v-col cols="4" class="text-center icon">
        <v-icon x-large style="font-size:7em;color:white !important;">
          {{ info.icon }}
        </v-icon>
      </v-col>
      <v-col cols="6" class="text-center">
        <label class="title2">{{ info.head }}</label>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-row class="row2">
      <v-col cols="8" class="text1">{{ info.text }}</v-col>
      <v-col cols="4" class="text-right">
        <v-icon>mdi-launch</v-icon>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          head: '',
          text: '',
          color: '',
          icon: ''
        }
      }
    }
  }
}
</script>

<style>
.v-application a {
  text-decoration: none !important;
  cursor: pointer;
}
.row1 {
  padding-top: 5%;
  padding-bottom: 5%;
}
.row2 {
  padding-top: 3%;
  padding-bottom: 2%;
  font-size: 1.05em;
}
#contain {
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 0 12px;
}
.icon {
  align-self: center;
}
.title2 {
  color: white !important;
  font-size: 2em !important;
}
.text1 {
  color: black !important;
}
</style>
