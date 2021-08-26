<template>
  <div class="grid px-6 rounded-3xl">
    <Demo :demo="demo" />
  </div>
</template>

<script>
import Demo from '~/components/demo/Demo.vue'
import Intercom from '~/components/demo/Intercom.vue'
import User from '~/components/demo/User.vue'
import Stripe from '~/components/demo/Stripe.vue'
import Code from '~/components/demo/Code.vue'

export default {
  components: {
    Demo, Intercom, User, Stripe, Code
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
        intercom: Intercom,
        user: User,
        stripe: Stripe,
        code: Code
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
