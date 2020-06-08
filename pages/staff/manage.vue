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
      <v-data-table
        v-if="items !== []"
        :headers="headers"
        :items="items"
        :search="search"
      >
        <template v-slot:item.image="{ item }">
          <v-img :src="'/uploads/' + item._id + '.jpg'" />
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editBook(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteBook(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <BookForm ref="BookForm" @add="submitAdd" @edit="submitEdit" />
      <v-snackbar v-model="snackbar.show" :color="snackbar.type">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="refresh">close</v-btn>
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
          text: 'รูปภาพ',
          value: 'image',
          width: '15%'
        },
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
  mounted() {
    this.$axios
      .$get('/api/checkstaff')
      .then(() => {
        this.fetchData()
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
        this.$router.push('/')
      })
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
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('author', data.author)
        formData.append('price', data.price)
        formData.append('amount', data.amount)
        if (data.image) {
          formData.append('bookImage', data.image, '')
        }
        const response = await this.$axios.post('/api/book', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (response) {
          this.snackbar = {
            show: true,
            text: 'Success',
            type: 'Success'
          }
          this.$refs.BookForm.close()
          this.refresh()
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
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('author', data.author)
        formData.append('price', data.price)
        formData.append('amount', data.amount)
        if (data.image) {
          formData.append('bookImage', data.image, '')
        }
        const response = await this.$axios.put(
          `/api/book/${this.currentPK}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        if (response) {
          this.snackbar = {
            show: true,
            text: 'Success',
            type: 'Success'
          }
          this.$refs.BookForm.close()
          this.refresh()
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
          this.refresh()
        }
      } catch (error) {
        this.snackbar = {
          show: true,
          text: 'Fail',
          type: 'error'
        }
      }
    },
    refresh() {
      window.location.reload()
    }
  }
}
</script>
