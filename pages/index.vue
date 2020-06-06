<template>
  <v-container>
    <v-row>
      <v-col cols="4" v-for="(info,index) in infos" :key="index">
        <BoxButton :head="info.head" :imgLink="info.imgLink"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BoxButton from "../components/boxbutton";
export default {
  data(){
    return{
      infos:[
        {
          head:"รายการคำสั่งซื้อ",
          imgLink:"/_nuxt/assets/order.png"
        },
        {
          head:"จัดการคลังหนังสือ",
          imgLink:"/_nuxt/assets/manage.png"
        },
        {
          head:"คอมเมนต์จากผู้อ่าน",
          imgLink:"/_nuxt/assets/comment.png"
        }
      ]
    }
  },
  components: {
    BoxButton
  }
}
</script>
