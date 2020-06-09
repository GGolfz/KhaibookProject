<template>
  <v-app>
    <v-app-bar color="#CEAB7E" app>
      <img
        src="../assets/icon.png"
        height="54px"
        style="cursor:pointer"
        @click="home"
      />
      <v-toolbar-title
        class="display-1 white--text shoptitle"
        style="cursor:pointer"
        @click="home"
      >
        KHAIBOOK
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="auth && isStaff" class="navitem" @click="staff">
        STAFF
      </v-btn>
      <v-btn v-if="auth" class="ml-12 navitem" @click="openorder">
        MY ORDERS
      </v-btn>
      <v-btn icon style="cursor:pointer" class="ml-12" @click="cart = true">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn class="ml-12 navitem" @click="onpayment">ช่องทางการโอนเงิน</v-btn>
      <v-btn v-if="!auth" class="navitem ml-12 mr-4" @click="login">
        login
      </v-btn>
      <v-btn v-if="auth" class="navitem ml-12 mr-4" @click="logout">
        logout
      </v-btn>
      <v-menu offset-y class="hamburger">
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon class="hamburger" v-bind="attrs" v-on="on" />
        </template>
        <v-list>
          <v-list-item v-if="auth && isStaff" @click="staff">
            <v-list-item-title>
              STAFF
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="auth" @click="openorder">
            <v-list-item-title>
              MY ORDER
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="onpayment">
            <v-list-item-title>
              ช่องทางการโอนเงิน
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="auth" @click="logout">
            <v-list-item-title>
              LOG OUT
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!auth" @click="login">
            <v-list-item-title>
              LOG IN
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-dialog v-model="dialog" width="800px">
        <v-card class="px-6 py-3">
          <v-row>
            <v-col class="text-center" cols="6" @click="state = 'login'">
              Login
            </v-col>
            <v-col class="text-center" cols="6" @click="state = 'register'">
              Register
            </v-col>
            <SignUp v-if="state === 'register'" />
            <Login v-if="state === 'login'" />
          </v-row>
        </v-card>
      </v-dialog>
      <nuxt-child @addtocart="addtocart" />
      <v-dialog v-model="order" width="800px">
        <v-card>
          <OrderList />
        </v-card>
      </v-dialog>
      <v-dialog v-model="cart" width="450px">
        <v-card style="padding:3%">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="3">ชื่อหนังสือ</v-col>
                <v-col cols="3">จำนวน</v-col>
                <v-col cols="3">ราคา</v-col>
                <v-col cols="3"></v-col>
              </v-row>
            </v-col>
            <v-col v-for="(it, index) in item" :key="index" cols="12">
              <v-row>
                <v-col cols="3" style="align-self:center">
                  {{ it.name }}
                </v-col>
                <v-col cols="3" style="align-self:center">
                  {{ it.buyamount }} เล่ม
                </v-col>
                <v-col cols="3" style="align-self:center">
                  {{ it.price * it.buyamount }} บาท
                </v-col>
                <v-col cols="3">
                  <v-btn icon @click="del(it)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" style="align-self:center">
              รวมทั้งสิ้น {{ overallprice }} บาท
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn :disabled="auth && item === []" @click="buy">
                ยืนยันรายการ
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      <v-dialog v-model="payment" width="600px">
        <v-card class="pa-4">
          <v-card-title style="justify-content:center">
            <h3>ช่องทางการโอนเงิน</h3>
          </v-card-title>
          <v-row>
            <v-col cols="12" class="text-center">
              <b>ธนาคารไทยพาณิชย์ : </b> XXX-XXX-XXXX
            </v-col>
            <v-col cols="12" class="text-center">
              <b>ธนาคารกสิกร : </b> XXX-XXX-XXXX
            </v-col>
            <v-col cols="12" class="text-center">
              <b>ธนาคารกรุงเทพ : </b> XXX-XXX-XXXX
            </v-col>
            <v-col cols="12" class="text-center">
              <b>ธนาคารกรุงไทย : </b> XXX-XXX-XXXX
            </v-col>
            <v-col cols="12" class="text-center">
              <h5>
                หากรายการคำสั่งซื้อที่แจ้งโอนแล้ว ไม่ปรากฎในช่อง รอการตรวจสอบ /
                รอการจัดส่ง / ที่ต้องได้รับ <br />
                กรุณาติดต่อที่ admin@khaibook.com
              </h5>
            </v-col>
          </v-row>
          <v-card-actions style="justify-content:center">
            <v-btn @click="payment = false"> ปิด </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>
<style>
.v-application {
  font-family: 'Kanit', sans-serif !important;
}
.shoptitle {
  text-shadow: 0px 2.80183px 2.80183px rgba(0, 0, 0, 0.25);
}
@media only screen and (max-width: 768px) {
  .navitem {
    display: none !important;
  }
  .hamburger {
    display: block !important;
  }
}
@media only screen and (min-width: 769px) {
  .navitem {
    display: block !important;
  }
  .hamburger {
    display: none !important;
  }
}
</style>
<script>
import OrderList from '../components/OrderList'
import SignUp from '../components/signup'
import Login from '../components/login'
const url = require('../config/config').realURL
export default {
  components: {
    SignUp,
    Login,
    OrderList
  },
  data() {
    return {
      cart: false,
      item: [],
      overallprice: 0,
      auth: false,
      dialog: false,
      state: 'login',
      id: '',
      address: '',
      order: false,
      payment: false,
      isStaff: false
    }
  },
  async mounted() {
    if (this.$route.name === null) {
      this.$router.push('/')
    } else {
      const response = await this.$axios.get(url + '/api/auth')
      if (response.data.uid) {
        this.id = response.data.uid
        this.auth = true
      }
    }
    this.$axios
      .$get(url + '/api/checkstaff')
      .then(() => {
        this.isStaff = true
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
        this.$router.push('/')
      })
  },
  methods: {
    addtocart(val) {
      let check = false
      this.item.forEach((it) => {
        if (it._id === val._id) {
          it = val
          check = true
        }
      })
      if (!check) {
        this.item.push(val)
      }
      this.calculateprice()
    },
    del(val) {
      for (let i = 0; i < this.item.length; i++) {
        if (this.item[i]._id === val._id) {
          this.item.splice(i, 1)
        }
      }
      this.calculateprice()
    },
    calculateprice() {
      this.overallprice = 0
      this.item.forEach((it) => {
        this.overallprice += it.price * it.buyamount
      })
    },
    buy() {
      const buyreq = Object.assign(
        { uid: this.id },
        { item: this.item },
        { overallprice: this.overallprice },
        { address: this.address }
      )
      this.$axios.$post(url + '/api/buy', buyreq).then(() => {
        window.location.reload()
      })
    },
    openorder() {
      this.order = true
    },
    onpayment() {
      this.payment = true
    },
    login() {
      this.dialog = true
    },
    async logout() {
      await this.$axios.get(url + '/logout')
      window.location.reload()
    },
    staff() {
      this.$router.push('/staff')
    },
    home() {
      this.$router.push('/')
    }
  }
}
</script>
