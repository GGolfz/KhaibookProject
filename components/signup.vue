<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="info.email"
          label="Email*"
          :rules="[
            (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) && !!v
          ]"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="info.password"
          label="Password*"
          type="password"
          :rules="[(v) => !!v]"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="info.firstname"
          label="Firstname*"
          :rules="[(v) => !!v]"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="info.lastname"
          label="Lastname*"
          :rules="[(v) => !!v]"
        />
      </v-col>
      <v-col cols="12" class="text-right">
        <v-btn @click="signup">sign up</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const url = require('../config/config').realURL
export default {
  data() {
    return {
      info: {
        email: '',
        password: '',
        firstname: '',
        lastname: ''
      }
    }
  },
  methods: {
    signup() {
      this.$axios
        .$post(url + '/signup', this.info)
        .then((response) => {
          if (response) {
            if (response.message === 'register success') {
              window.location.reload()
            }
          }
        })
        .catch(() => {
          alert('ERROR: This email is already taken')
        })
    }
  }
}
</script>

<style></style>
