<template>
  <div class="col-span-2">
      <Table :type="type" />
  </div>
</template>

<script>
import Table from '~/components/demo/Table.vue'

export default {
  components: {
    Table
  },
  data () {
    return {
      type: "messages"
    }
  },
  mounted() {
    this.$intercom('boot')
  }
}
</script>

