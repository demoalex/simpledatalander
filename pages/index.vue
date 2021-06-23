<template>
  <div class="container">
    <V0Placeholder />
  </div>
</template>

<script>

export default {
  layout: 'empty',
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
