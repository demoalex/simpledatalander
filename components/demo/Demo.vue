<template>
  <div class="grid grid-cols-2 gap-4">
    <Component :is="demo.main"/>
    <div class="bg-blue-500 p-4 text-white">Architecture</div>
    <div>
      <Logs :app="demo.app"/>
    </div>
    <div class="bg-blue-500 p-4 text-white">Code</div>
    <div>
      <UserStatus />
    </div>
  </div>

</template>
<script>
import Logs from '~/components/demo/Logs.vue'
import UserStatus from '~/components/demo/UserStatus.vue'

export default {
  components: {
    Logs, UserStatus
  },
  props: {
    demo: {
      type: Object,
      required: true,
    }
  }
}
</script>
