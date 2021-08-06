<template>
  <div class="col-span-2">
    <button
      style="background-color:#6772E5;color:#FFF;padding:8px 12px;border:0;border-radius:4px;font-size:1em;cursor:pointer"
      id="checkout-button-price_1JEHYeJ1cXBanLUjFBmHGZ5c"
      role="link"
      type="button"
    >
      Checkout
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
      type: 'purchases'
    }
  },
  mounted() {
    if(this.$stripe) {
      const checkoutButton = document.getElementById('checkout-button-price_1JEHYeJ1cXBanLUjFBmHGZ5c');
      checkoutButton.addEventListener('click', () => {
        /*
         * When the customer clicks on the button, redirect
         * them to Checkout.
         */
        this.$stripe.redirectToCheckout({
          lineItems: [{price: 'price_1JEHYeJ1cXBanLUjFBmHGZ5c', quantity: 1}],
          mode: 'subscription',
          /*
           * Do not rely on the redirect to the successUrl for fulfilling
           * purchases, customers may not always reach the success_url after
           * a successful payment.
           * Instead use one of the strategies described in
           * https://stripe.com/docs/payments/checkout/fulfill-orders
           */
          successUrl: this.url,
          cancelUrl: this.url,
        })
          .then(function (result) {
            if (result.error) {
              /*
               * If `redirectToCheckout` fails due to a browser or network
               * error, display the localized error message to your customer.
               */
              var displayError = document.getElementById('error-message');
              displayError.textContent = result.error.message;
            }
          });
      });
    }
  }
}
</script>

<style scoped>

</style>
