<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn color="primary" depressed @click="addBook">+ New</v-btn>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :search="search">
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editBook(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteBook(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <BookForm ref="BookForm" @add="submitAdd" @edit="submitEdit" />
      <v-snackbar v-model="snackbar.show" :color="snackbar.type">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="snackbar.show = false">close</v-btn>
      </v-snackbar>
      <v-dialog v-model="confirm" max-width="400px">
        <v-card>
          <v-card-title class="headline">ยืนยันการลบหนังสือ</v-card-title>
          <v-card-text>เมื่อยืนยันจะไม่สามารถกู้คืนข้อมูลได้</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="confirm = false">Cancel</v-btn>
            <v-btn text color="danger" @click="submitDelete">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import BookForm from '../../components/BookForm'
export default {
  components: {
    BookForm
  },
  data() {
    return {
      search: '',
      snackbar: {
        show: false,
        text: '',
        type: ''
      },
      confirm: false,
      currentPK: null,
      headers: [
        {
          text: 'ชื่อหนังสือ',
          value: 'name'
        },
        {
          text: 'ผู้แต่ง',
          value: 'author'
        },
        {
          text: 'ราคา',
          value: 'price'
        },
        {
          text: 'จำนวน',
          value: 'amount'
        },
        {
          text: 'Actions',
          value: 'action',
          sortable: false
        }
      ],
      items: []
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.items = await this.$axios.$get('/api/book')
    },
    addBook() {
      this.$refs.BookForm.open('add')
    },
    editBook(item) {
      this.currentPK = item._id
      this.$refs.BookForm.open('edit', item)
    },
    deleteBook(item) {
      this.currentPK = item._id
      this.confirm = true
    },
    async submitAdd(data) {
      try {
        const response = await this.$axios.post('/api/book', data)
        if (response) {
          this.snackbar = {
            show: true,
            text: 'Success',
            type: 'Success'
          }
          this.$refs.BookForm.close()
          this.fetchData()
        }
      } catch (error) {
        this.snackbar = {
          show: true,
          text: 'Fail',
          type: 'error'
        }
      }
    },
    async submitEdit(data) {
      try {
        const response = await this.$axios.put(
          `/api/book/${this.currentPK}`,
          data
        )
        if (response) {
          this.snackbar = {
            show: true,
            text: 'Success',
            type: 'Success'
          }
          this.$refs.BookForm.close()
          this.fetchData()
        }
      } catch (error) {
        this.snackbar = {
          show: true,
          text: 'Fail',
          type: 'error'
        }
      }
    },
    async submitDelete() {
      try {
        this.confirm = false
        const response = await this.$axios.delete(`/api/book/${this.currentPK}`)
        if (response) {
          this.snackbar = {
            show: true,
            text: 'Success',
            type: 'Success'
          }
          this.$refs.BookForm.close()
          this.fetchData()
        }
      } catch (error) {
        this.snackbar = {
          show: true,
          text: 'Fail',
          type: 'error'
        }
      }
    }
  }
}
</script>
