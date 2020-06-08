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
      <v-col cols="12" class="text-right">
        <v-btn @click="login">Log in</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      info: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$axios
        .$post('/login', this.info)
        .then((response) => {
          if (response) {
            if (response.message === 'login success') {
              window.location.reload()
            }
          }
        })
        .catch(() => {
          alert('ERROR: Wrong Password || Invalid Username')
        })
    }
  }
}
</script>

<style></style>
