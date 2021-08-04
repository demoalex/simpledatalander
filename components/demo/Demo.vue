<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="col-span-2">
      <Component :is="demo.main"/>
    </div>
    <div class="bg-blue-500 p-4 text-white">Architecture</div>
    <div>
      <Logs :app="demo.app"/>
    </div>
    <div class="bg-blue-500 p-4 text-white">Code</div>
    <div class="bg-blue-500 p-4 text-white">User</div>
  </div>

</template>
<script>
import Logs from '~/components/demo/Logs.vue'

export default {
  components: {
    Logs
  },
  props: {
    demo: {
      type: Object,
      required: true,
    }
  }
}
</script>
