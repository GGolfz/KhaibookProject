<template>
  <v-row id="row" dense>
    <v-col cols="2" />
    <v-col v-for="(info, index) in infos" id="col" :key="index" cols="4">
      <nuxt-link :to="info.link">
        <BoxButton :info="info" />
      </nuxt-link>
    </v-col>
    <v-col cols="2" />
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
const url = require('../../config/config').realURL
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
          link: '/staff/order'
        },
        {
          head: 'จัดการคลังหนังสือ',
          icon: 'mdi-wrench',
          text: 'เพิ่ม ลด หนังสือในคลัง',
          color: '#FFAA42',
          link: '/staff/manage'
        }
      ]
    }
  },
  mounted() {
    this.$axios
      .$get(url + '/api/checkstaff')
      .then(() => {})
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
        this.$router.push(url + '/')
      })
  }
}
</script>
