<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title style="justify-content:center">
        <span class="headline">{{ thmode }}ข้อมูลหนังสือ</span>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col v-if="mode === 'edit'" cols="12">
            <v-img :src="'/uploads/' + book._id + '.jpg'" height="120px" />
          </v-col>
          <v-col cols="12">
            <v-file-input v-model="book.image" label="Image*" required />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="book.name" label="Name*" required />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="book.author" label="Author*" required />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="book.price" label="Price*" required />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="book.amount" label="Amount*" required />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">CLOSE</v-btn>
        <v-btn color="blue darken-1" text @click="save">SAVE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      mode: '',
      thmode: '',
      book: {
        image: null,
        name: '',
        author: '',
        price: '',
        amount: ''
      }
    }
  },
  methods: {
    open(mode, data) {
      this.dialog = true
      this.mode = mode
      if (mode === 'add') {
        this.thmode = 'เพิ่ม'
      } else if (mode === 'edit') {
        this.thmode = 'แก้ไข'
      }
      if (data) {
        this.book = { ...data }
      }
    },
    close() {
      this.dialog = false
      this.clearData()
    },
    clearData() {
      this.book = {
        image: null,
        name: '',
        author: '',
        price: '',
        amount: ''
      }
    },
    save() {
      this.dialog = false
      this.$emit(this.mode, this.book)
    }
  }
}
</script>

<style></style>
