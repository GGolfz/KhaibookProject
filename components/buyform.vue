<template>
  <v-container>
    <v-row dense>
      <v-col cols="6">ชื่อหนังสือ {{ detail.name }}</v-col>
      <v-col cols="6" class="text-right">ราคา {{ detail.price }} บาท</v-col>
      <v-col cols="6">
        <v-row>
          <v-col cols="3" style="align-self:center">
            <v-btn icon @click="minus">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="buyamount" :rules="[(v) => v > 0 && !!v]" />
          </v-col>
          <v-col cols="3" style="align-self:center">
            <v-btn icon @click="plus">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="text-right" style="align-self:center">
        ราคารวม {{ buyamount * detail.price }} บาท
      </v-col>
      <v-col cols="12" class="text-right" style="align-self:center">
        <v-btn @click="addtocart">ใส่ลงตะกร้า</v-btn>
      </v-col>
    </v-row>
  </v-container>
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
  },
  data() {
    return {
      buyamount: 1
    }
  },
  methods: {
    minus() {
      if (this.buyamount > 1) {
        this.buyamount -= 1
      } else {
        this.buyamount = 1
      }
    },
    plus() {
      if (this.buyamount < this.detail.amount) {
        this.buyamount = parseInt(parseInt(this.buyamount) + 1)
      } else {
        this.buyamount = this.detail.amount
      }
    },
    addtocart() {
      this.detail = Object.assign(this.detail, { buyamount: this.buyamount })
      this.$emit('addtocart', this.detail)
    }
  }
}
</script>

<style></style>
