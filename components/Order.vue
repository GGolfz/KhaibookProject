<template>
  <v-row>
    <v-col cols="2" class="text-center" style="align-self:center">
      {{ index }}.
    </v-col>
    <v-col cols="6">
      <v-textarea :value="booklist" rows="1" auto-grow disabled></v-textarea>
    </v-col>
    <v-col cols="4" style="align-self:start">
      <v-text-field :value="data.overallprice + ' บาท'" disabled />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          overallprice: 0,
          item: []
        }
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      booklist: ''
    }
  },
  mounted() {
    Array.from(this.data.item).forEach((it) => {
      this.booklist += it.buyamount + ' * ' + it.name + '\n'
    })
  }
}
</script>

<style></style>
