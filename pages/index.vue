<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" class="headline text-center">รายการหนังสือ</v-col>
      <v-col cols="12">
        <v-row>
          <span
            v-for="index in pages"
            :key="index"
            class="mr-2"
            @click="currentpage = index"
          >
            {{ index }}
          </span>
        </v-row>
      </v-col>
      <v-col v-for="(book, index) in listbooks" :key="index" cols="12">
        <Page
          v-if="currentpage === index+1"
          :books="book"
          @addtocart="addtocart"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Page from '../components/page'
const url = require('../config/config').realURL
export default {
  components: {
    Page
  },
  data() {
    return {
      books: [],
      listbooks: [],
      pages: 0,
      currentpage: 1
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.books = await this.$axios.$get(url + '/api/book')
      await this.dividebook()
    },
    dividebook() {
      const length = this.books.length
      for (let i = 0; i <= length; i += 8) {
        this.listbooks.push([...this.books.splice(0, 8)])
        this.pages += 1
      }
    },
    addtocart(val) {
      this.$emit('addtocart', val)
    }
  }
}
</script>

<style></style>
