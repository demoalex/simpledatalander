<template>
  <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl">
    <Demo :demo="demo" />
  </div>
</template>

<script>
import Demo from '~/components/demo/Demo.vue'
import DemoChat from '~/components/demo/intercom/Chat.vue'

export default {
  components: {
    Demo, DemoChat
  },
  head() {
    return {
      title: "SimpleData - Demo - Intercom",
    }
  },
  layout: 'demo',
  data () {
    return {
      demo: {
        main: DemoChat,
        app: 'intercom'
      }
    }
  }
}
</script>

<style>
</style>
