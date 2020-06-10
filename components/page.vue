<template>
  <v-row>
    <v-col v-for="(book, index) in books" :key="index" cols="12" sm="6" md="3">
      <Book :detail="book" @addtocart="addtocart" />
    </v-col>
  </v-row>
</template>

<script>
import Book from '../components/book'
export default {
  components: {
    Book
  },
  props: {
    books: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    addtocart(val) {
      this.$emit('addtocart', val)
    }
  }
}
</script>

<style></style>
