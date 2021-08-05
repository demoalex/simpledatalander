<template>
  <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl">
    <Demo :demo="demo" />
  </div>
</template>

<script>
import Demo from '~/components/demo/Demo.vue'
import DemoChat from '~/components/demo/intercom/Chat.vue'
import User from '~/components/demo/User.vue'

export default {
  components: {
    Demo, DemoChat, User
  },
  head() {
    return {
      title: "SimpleData - Demo",
    }
  },
  layout: 'demo',
  data () {
    return {
      demoComponents: {
        intercom: DemoChat,
        user: User
      },
    }
  },
  computed: {
    demo() {
      return {
        main: this.demoComponents[this.$route.params.app],
        app: this.$route.params.app
      }
    }
  }
}
</script>

<style>
</style>
