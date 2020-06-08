<template>
  <v-container>
    <v-row>
      <v-col
        cols="6"
        class="text-center"
        style="cursor:pointer"
        @click="state = 'check'"
      >
        รอการตรวจสอบ
      </v-col>
      <v-col
        cols="6"
        class="text-center"
        style="cursor:pointer"
        @click="state = 'send'"
      >
        ต้องจัดส่ง
      </v-col>
    </v-row>
    <v-card v-if="state === 'check'">
      <v-card-title style="justify-content:center">
        <h3>รอการตรวจสอบ</h3>
      </v-card-title>
      <v-data-table :headers="headers" :items="orderItem">
        <template v-slot:item.name="{ item }">{{ item.firstname }}</template>
        <template v-slot:item.books="{ item }">
          <div v-for="(it, index) in item.item" :key="index">
            {{ it.buyamount }} x {{ it.name }}
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn @click="approve(item)">ดูข้อมูล</v-btn>
        </template>
      </v-data-table>
      <ApproveForm ref="ApproveForm" @update="update" />
    </v-card>
    <v-card v-if="state === 'send'">
      <v-card-title style="justify-content:center">
        <h3>รอการจัดส่ง</h3>
      </v-card-title>
      <v-data-table :headers="headers" :items="sendItem">
        <template v-slot:item.name="{ item }">{{ item.firstname }}</template>
        <template v-slot:item.books="{ item }">
          <div v-for="(it, index) in item.item" :key="index">
            {{ it.buyamount }} x {{ it.name }}
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn @click="send(item)">ส่งแล้ว</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import ApproveForm from '../../components/ApproveForm'
export default {
  components: {
    ApproveForm
  },
  data() {
    return {
      view: false,
      state: 'check',
      currentPK: null,
      headers: [
        {
          text: 'ชื่อผู้สั่ง',
          value: 'name'
        },
        {
          text: 'ที่อยู่ในการจัดส่ง',
          value: 'address'
        },
        {
          text: 'ราคาทั้งหมด',
          value: 'overallprice',
          width: '10%'
        },
        {
          text: 'รายชื่อหนังสือ',
          value: 'books'
        },
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          width: '10%'
        }
      ],
      orderitems: [],
      orderItem: [],
      senditems: [],
      sendItem: []
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.orderitems = await this.$axios.$get('/api/requests/order')
      this.senditems = await this.$axios.$get('/api/requests/send')
      await this.getName()
    },
    async getName() {
      await this.orderitems.forEach(async (item) => {
        const name = await this.$axios.$get(`/api/user/name/${item.userID}`)
        this.orderItem.push({ ...item, firstname: name.name })
      })
      await this.senditems.forEach(async (item) => {
        const name = await this.$axios.$get(`/api/user/name/${item.userID}`)
        this.sendItem.push({ ...item, firstname: name.name })
      })
    },
    refresh() {
      this.orderitems = []
      this.orderItem = []
      this.senditems = []
      this.sendItem = []
    },
    approve(item) {
      this.currentPK = item._id
      this.$refs.ApproveForm.open(item)
    },
    async send(item) {
      this.currentPK = item._id
      const data = { status: 'จัดส่งแล้ว' }
      const response = await this.$axios.$put(
        `/api/request/approve/${this.currentPK}`,
        data
      )
      if (response) {
        this.refresh()
        this.fetchData()
      }
    },
    async update(data) {
      let send = ''
      if (data === 'notapprove') send = { status: 'หลักฐานไม่ถูกต้อง' }
      else if (data === 'approve') send = { status: 'รอการจัดส่ง' }
      const response = await this.$axios.$put(
        `/api/request/approve/${this.currentPK}`,
        send
      )
      if (response) {
        this.refresh()
        this.fetchData()
      }
    }
  }
}
</script>

<style></style>
