<template>
  <v-row>
    <v-col cols="3"></v-col>
    <v-col cols="6" class="text-center">
      <v-img
        :src="'/uploads/' + detail._id + '.jpg'"
        style="cursor:pointer"
        @click="goto(detail._id)"
      />
    </v-col>
    <v-col cols="3"></v-col>
    <v-col cols="12" class="text-center">{{ detail.name }}</v-col>
    <v-col cols="12" class="text-center">ผู้แต่ง : {{ detail.author }}</v-col>
    <v-col cols="12" class="text-center">ราคา : {{ detail.price }} บาท</v-col>
    <v-col v-if="detail.amount != 0" cols="12" class="text-center">
      คงเหลือ : {{ detail.amount }} เล่ม
    </v-col>
    <v-col v-else cols="12" class="text-center">Out of stock</v-col>
    <v-col cols="12" class="text-center">
      <v-btn :disabled="detail.amount === 0" @click="dialog = true">
        ใส่ลงตะกร้า
      </v-btn>
    </v-col>
    <v-dialog v-model="dialog" width="400px">
      <v-card>
        <BuyForm :detail="detail" @addtocart="addtocart" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import BuyForm from './buyform'
export default {
  components: {
    BuyForm
  },
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
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    goto(val) {
      this.$router.push(`${val}`)
    },
    addtocart(val) {
      this.dialog = false
      this.$emit('addtocart', val)
    }
  }
}
</script>

<style></style>
