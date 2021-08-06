<template>
  <div class="col-span-2">
    <div class="py-8">
      <div>
        <h2 class="text-2xl font-semibold leading-tight">Messages</h2>
      </div>
      <Table :type="type" />
    </div>
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

