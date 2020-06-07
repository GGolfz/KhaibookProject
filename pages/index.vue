<template>
  <v-container>
    <v-row>
      <v-col cols="12">INDEX</v-col>
      <v-btn @click="test">test</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    test() {
      this.$emit('cart')
    }
  }
}
</script>

<style></style>
