<template>
  <div class="col-span-2">
    <button v-for="(button, $index) in buttons" :key="$index"
      class="checkout"
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
   margin-right: 15px;
   background-color:#6772E5;
   color:#FFF;
   padding:8px 12px;
   border:0;
   border-radius:4px;
   font-size:1em;
   cursor:pointer;
 }
</style>
