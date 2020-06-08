<template>
  <v-row>
    <v-col v-if="list.length === 0" class="text-center" cols="12">
      ไม่มีรายการคำสั่งซื้อ
    </v-col>
    <v-col v-for="(req, index) in list" :key="index" cols="12">
      <Order :data="req" :index="index + 1" />
    </v-col>
  </v-row>
</template>

<script>
import Order from './Order'
export default {
  components: {
    Order
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style></style>
