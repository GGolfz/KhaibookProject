<template>
  <v-container class="headline">
    <Book :detail="book" />
  </v-container>
</template>

<script>
import Book from '../../components/bookbig'
const url = require('../config/config').realURL
export default {
  components: {
    Book
  },
  data() {
    return {
      id: String,
      book: {
        type: Object,
        default() {
          return {
            name: '',
            author: '',
            price: '',
            amount: ''
          }
        }
      }
    }
  },
  async mounted() {
    this.id = this.$route.params.id
    this.book = await this.$axios.$get(url + `/api/book/${this.id}`)
  },
  methods: {
    addtocart(val) {
      this.$emit('addtocart', val)
    }
  }
}
</script>

<style></style>
