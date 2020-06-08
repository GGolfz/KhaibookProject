<template>
  <v-container />
</template>

<script>
const url = require('../config/config').realURL
export default {
  mounted() {
    this.$router.push(url + '/')
  }
}
</script>

<style></style>
