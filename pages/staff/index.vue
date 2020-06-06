<template>
  <v-row id="row" dense>
    <v-col v-for="(info, index) in infos" id="col" :key="index" cols="4">
      <nuxt-link :to="info.link">
        <BoxButton :info="info" />
      </nuxt-link>
    </v-col>
  </v-row>
</template>
<style scoped>
.v-application a {
  text-decoration: none !important;
  color: transparent !important;
}
#row {
  margin: 0;
  padding: 7% 2%;
}
#col {
  padding: 2%;
}
</style>
<script>
import BoxButton from '../../components/boxbutton'
export default {
  components: {
    BoxButton
  },
  data() {
    return {
      infos: [
        {
          head: 'รายการคำสั่งซื้อหนังสือ',
          icon: 'mdi-cart',
          text: 'ตรวจสอบคำสั่งซื้อหนังสือ',
          color: '#49B0A6',
          link: 'staff/order'
        },
        {
          head: 'จัดการคลังหนังสือ',
          icon: 'mdi-wrench',
          text: 'เพิ่ม ลด หนังสือในคลัง',
          color: '#FFAA42',
          link: 'staff/manage'
        },
        {
          head: 'คอมเมนต์จากผู้อ่าน',
          icon: 'mdi-comment',
          text: 'อ่านคอมเมนต์จากผู้สั่งซื้อ',
          color: '#FF457E',
          link: 'staff/comment'
        }
      ]
    }
  }
}
</script>
