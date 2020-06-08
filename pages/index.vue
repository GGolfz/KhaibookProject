<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" class="headline text-center">รายการหนังสือ</v-col>
      <v-col v-for="(book, index) in books" :key="index" cols="3">
        <Book :detail="book" @addtocart="addtocart" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Book from '../components/book'
export default {
  components: {
    Book
  },
  data() {
    return {
      books: []
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.books = await this.$axios.$get('/api/book')
    },
    addtocart(val) {
      this.$emit('addtocart', val)
    }
  }
}
</script>

<style></style>
