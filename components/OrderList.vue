<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12">รายการคำสั่งซื้อของฉัน</v-col>
      <v-col
        class="text-center"
        cols="3"
        style="cursor:pointer"
        @click="state = 'wait'"
      >
        รอการชำระเงิน
      </v-col>
      <v-col
        class="text-center"
        cols="3"
        style="cursor:pointer"
        @click="state = 'order'"
      >
        รอการตรวจสอบ
      </v-col>
      <v-col
        class="text-center"
        cols="3"
        style="cursor:pointer"
        @click="state = 'send'"
      >
        รอการจัดส่ง
      </v-col>
      <v-col
        class="text-center"
        cols="3"
        style="cursor:pointer"
        @click="state = 'finish'"
      >
        ที่ต้องได้รับ
      </v-col>
      <v-col v-if="state === 'wait'" cols="12">
        <v-row>
          <v-col v-if="waitList.length === 0" class="text-center" cols="12">
            ไม่มีรายการคำสั่งซื้อ
          </v-col>
          <v-col v-for="(req, index) in waitList" :key="index" cols="12">
            <Order :data="req" :index="index + 1" @evidence="sendevi(req)" />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="state === 'order'" cols="12">
        <ShowOrder :list="orderList" />
      </v-col>
      <v-col v-if="state === 'send'" cols="12">
        <ShowOrder :list="sendingList" />
      </v-col>
      <v-col v-if="state === 'finish'" cols="12">
        <v-row>
          <v-col v-if="finishList.length === 0" class="text-center" cols="12">
            ไม่มีรายการคำสั่งซื้อ
          </v-col>
          <v-col v-for="(req, index) in finishList" :key="index" cols="12">
            <OrderFinish :data="req" :index="index + 1" @get="getted(req)" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <EvidenceForm ref="EvidenceForm" @send="send" />
  </v-container>
</template>

<script>
import EvidenceForm from './EvidenceForm'
import ShowOrder from './ShowOrder'
import Order from './OrderWait'
import OrderFinish from './OrderFinish'
const url = require('../config/config').realURL
export default {
  components: {
    ShowOrder,
    Order,
    OrderFinish,
    EvidenceForm
  },
  data() {
    return {
      state: 'wait',
      waitList: [],
      orderList: [],
      sendingList: [],
      finishList: [],
      currentPK: ''
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.waitList = await this.$axios.$get(url + '/api/request/waiting')
      this.orderList = await this.$axios.$get(url + '/api/request/ordering')
      this.sendingList = await this.$axios.$get(url + '/api/request/sending')
      this.finishList = await this.$axios.$get(url + '/api/request/finishing')
    },
    sendevi(req) {
      this.currentPK = req._id
      this.$refs.EvidenceForm.open(req)
    },
    async getted(req) {
      this.currentPK = req._id
      const response = await this.$axios.$put(
        url + `/api/request/recieve/${this.currentPK}`
      )
      if (response) {
        this.refresh()
      }
    },
    async send(data) {
      const formData = new FormData()
      formData.append('address', data.address)
      if (data.image) {
        formData.append('evidence', data.image, '')
      }
      const response = await this.$axios.put(
        url + `/api/request/update/${this.currentPK}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      if (response) {
        this.$refs.EvidenceForm.close()
        this.refresh()
      }
    },
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<style></style>
