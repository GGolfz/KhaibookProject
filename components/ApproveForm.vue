<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title style="justify-content:center">
        <span class="headline">ข้อมูลคำสั่งซื้อ</span>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field :value="request1.firstname" label="Name" disabled />
          </v-col>
          <v-col cols="12">
            <v-text-field :value="request1.address" label="Address" disabled />
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Book list"
              disabled
              :value="booklist"
              auto-grow
              rows="1"
            />
          </v-col>
          <v-col cols="10">
            <v-text-field
              v-model="request1.overallprice"
              label="Price"
              disabled
            />
          </v-col>
          <v-col cols="2" style="align-self:center">บาท</v-col>
          <v-col cols="3"></v-col>
          <v-col cols="6">
            <v-img :src="'/evidence/' + request1._id + '.jpg'" />
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="text-center">
        <v-spacer />
        <v-btn text @click="close">CLOSE</v-btn>
        <v-spacer />
        <v-btn color="red darken-1" text @click="update('notapprove')">
          Disappove
        </v-btn>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="update('approve')">
          Approve
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
        firstname: '',
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
        this.request1 = data
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
        firstname: '',
        address: '',
        overallprice: '',
        item: []
      }
      this.booklist = ''
    },
    update(val) {
      this.dialog = false
      this.$emit('update', val, this.request1._id)
      this.clearData()
    }
  }
}
</script>

<style></style>
