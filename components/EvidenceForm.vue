<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title style="justify-content:center">
        <span class="headline">ข้อมูลคำสั่งซื้อ</span>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-textarea
              label="รายการหนังสือ"
              disabled
              :value="booklist"
              auto-grow
              rows="1"
            />
          </v-col>
          <v-col cols="10">
            <v-text-field
              v-model="request1.overallprice"
              label="ราคา"
              disabled
            />
          </v-col>
          <v-col cols="2" style="align-self:center">
            บาท
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="request1.address"
              label="ที่อยู่สำหรับการจัดส่ง"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="request1.image"
              label="หลักฐานการโอน"
              required
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="text-center">
        <v-spacer />
        <v-btn text @click="close">ปิด</v-btn>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="send">
          บันทึก
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      request1: {
        image: null,
        address: '',
        overallprice: '',
        item: []
      },
      booklist: ''
    }
  },
  methods: {
    open(data) {
      this.dialog = true
      if (data) {
        this.request1 = { ...data }
        Array.from(data.item).forEach((it) => {
          this.booklist += it.buyamount + ' * ' + it.name + '\n'
        })
      }
    },
    close() {
      this.dialog = false
      this.clearData()
    },
    clearData() {
      this.request1 = {
        address: '',
        overallprice: '',
        item: []
      }
      this.booklist = ''
    },
    send() {
      this.dialog = false
      this.$emit('send', this.request1)
      this.clearData()
    }
  }
}
</script>

<style></style>
