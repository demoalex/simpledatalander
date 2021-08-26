<template>
  <div class="col-span-2">


    <button v-for="(button, $index) in buttons" :key="$index"
      class="checkout inline-flex items-center px-4 py-2 mb-4 mr-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-out duration-700"
      role="link"
      type="button"
      @click="checkout(button)"
    >
      Checkout {{ button.type }} ${{ button.price }}
    </button>
    <div id="error-message"></div>
    <Table :type="type" />
  </div>

</template>

<script>
import Table from '~/components/demo/Table.vue'

export default {
  components: {
    Table
  },
  data() {
    return{
      url: process.browser ? window.location.href : "https://example.com/success",
      type: 'purchases',
      buttons: [
        {id: 'price_1JEHYeJ1cXBanLUjFBmHGZ5c', price: 10, mode: 'subscription', type: 'Subscription'},
        {id: 'price_1JEHYeJ1cXBanLUjKv3giHGE', price: 25, mode: 'payment', type: 'One-Time'},
        {id: 'price_1JQ8EYJ1cXBanLUj4VIedrry', price: 500, mode: 'subscription', type: 'Subscription'},
        {id: 'price_1JQ8EYJ1cXBanLUjlDfH5hlp', price: 700, mode: 'payment', type: 'One-Time'},
      ]
    }
  },
  methods: {
    checkout(button) {
      this.$stripe.redirectToCheckout({
        lineItems: [{price: button.id, quantity: 1}],
        mode: button.mode,
        successUrl: this.url,
        cancelUrl: this.url,
      })
        .then(function (result) {
          if (result.error) {
            var displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
          }
        });
    }
  }
}
</script>

<style scoped>
 .checkout {
   cursor:pointer;
 }
</style>
