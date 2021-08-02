<template>
  <div class="container">
    <V0Placeholder />
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: "SimpleData",
    }
  },
  mounted() {
    let props = {
      some: 'a',
      thing: 1
    }
    this.$ma.trackEvent({category: 'Event', action: 'Index Action', label: 'Index Label', properties: props})
    let i = 1
    setInterval(() => {
      this.$ma.trackEvent({category: 'Event', action: 'periodic', label: 'periodic Label', value: i++, properties: props})
    }, 60000)
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS */
.container {
/*@apply min-h-screen flex justify-center items-center text-center mx-auto;*/
@apply mx-auto;
}

/*.container {*/
/*  margin: 0 auto;*/
/*  !*min-height: 100vh;*!*/
/*  !*display: flex;*!*/
/*  !*justify-content: center;*!*/
/*  !*align-items: center;*!*/
/*  !*text-align: center;*!*/
/*}*/

</style>
