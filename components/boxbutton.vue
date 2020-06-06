<template>
  <v-container id="contain">
      <v-row id="banner">
          <v-col cols="6">
              <v-img :src="imgLink"/>
          </v-col>
          <v-col cols="6">
              {{head}}
          </v-col>
      </v-row>
      <v-row>
          <v-col cols="12">
              {{text}}
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    props:{
        imgLink:String,
        text:String,
        head:String
    }
}
</script>

<style>
#banner{
    background-color: burlywood;
}
#contain{
    box-shadow: 0px 1.85264px 1.85264px rgba(0, 0, 0, 0.1);
    padding:0 12px;
    
}
</style>