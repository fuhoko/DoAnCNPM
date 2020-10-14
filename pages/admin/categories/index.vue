<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'admin',
  async fetch() {
    await this.fetchDataCategories()
  },
  methods: {
    ...mapActions(['fetchDataCategories']),
  },
}
</script>
