<template>
  <v-row>
    <v-col cols="12" class="text-center">{{ detail.name }}</v-col>
    <v-col cols="12" class="text-center">ผู้แต่ง : {{ detail.author }}</v-col>
    <v-col cols="12" class="text-center">ราคา : {{ detail.price }} บาท</v-col>
    <v-col v-if="detail.amount != 0" cols="12" class="text-center">
      คงเหลือ : {{ detail.amount }} เล่ม
    </v-col>
    <v-col v-else cols="12" class="text-center">Out of stock</v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      default() {
        return {
          name: '',
          author: '',
          price: 0,
          amount: 0
        }
      }
    }
  }
}
</script>

<style></style>
