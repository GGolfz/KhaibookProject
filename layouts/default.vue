<template>
  <v-app>
    <v-app-bar color="#CEAB7E" app>
      <img src="../assets/icon.png" height="54px" />
      <v-toolbar-title class="display-1 white--text shoptitle">
        KHAIBOOK
      </v-toolbar-title>
      <v-spacer />
      <v-icon style="cursor:pointer" @click="cart = true">mdi-cart</v-icon>
    </v-app-bar>
    <v-content>
      <nuxt-child @addtocart="addtocart" />
      <v-dialog v-model="cart" width="450px">
        <v-card style="padding:3%">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="3">ชื่อหนังสือ</v-col>
                <v-col cols="3">จำนวน</v-col>
                <v-col cols="3">ราคา</v-col>
                <v-col cols="3"></v-col>
              </v-row>
            </v-col>
            <v-col v-for="(it, index) in item" :key="index" cols="12">
              <v-row>
                <v-col cols="3" style="align-self:center">
                  {{ it.name }}
                </v-col>
                <v-col cols="3" style="align-self:center">
                  {{ it.buyamount }} เล่ม
                </v-col>
                <v-col cols="3" style="align-self:center">
                  {{ it.price * it.buyamount }} บาท
                </v-col>
                <v-col cols="3">
                  <v-btn icon @click="del(it)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" style="align-self:center">
              รวมทั้งสิ้น {{ overallprice }} บาท
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn :disabled="item === []">ยืนยันรายการ</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>
<style>
.v-application {
  font-family: 'Kanit', sans-serif !important;
}
.shoptitle {
  text-shadow: 0px 2.80183px 2.80183px rgba(0, 0, 0, 0.25);
}
</style>
<script>
export default {
  data() {
    return {
      cart: false,
      item: [],
      overallprice: 0
    }
  },
  methods: {
    addtocart(val) {
      let check = false
      this.item.forEach((it) => {
        if (it._id === val._id) {
          it = val
          check = true
        }
      })
      if (!check) {
        this.item.push(val)
      }
      this.calculateprice()
    },
    del(val) {
      for (let i = 0; i < this.item.length; i++) {
        if (this.item[i]._id === val._id) {
          this.item.splice(i, 1)
        }
      }
      this.calculateprice()
    },
    calculateprice() {
      this.overallprice = 0
      this.item.forEach((it) => {
        this.overallprice += it.price * it.buyamount
      })
    }
  }
}
</script>
