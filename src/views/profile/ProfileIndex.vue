<template>
  <v-flex xs10 class="center">
    <Table/>
  </v-flex>
    
</template>

<script>
import Table from '@/components/Table';
  export default {
    name: 'profileIndex',
    components: {Table}
  }
</script>

<style lang="scss" scoped>
.center {
  padding: 25px;
  margin: 0 auto;
}
</style>