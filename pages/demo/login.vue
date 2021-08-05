<template>
  <div>
    <!-- Card Title -->
    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
      Login
    </h2>

    <form class="mt-10">
      <!-- Email Input -->
      <label for="email" class="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
      <input v-model="user.email" @keydown="clearAlert"
          id="email" type="email" name="email" placeholder="e-mail address" autocomplete="email"
             class="block w-full py-3 px-1 mt-2
                text-gray-800 appearance-none
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
             required />

      <!-- Password Input -->
      <label for="password" class="block mt-10 text-xs font-semibold text-gray-600 uppercase">Password</label>
      <input
          v-model="user.password" @keydown="clearAlert"
          id="password" type="password" name="password" placeholder="password" autocomplete="current-password"
             class="block w-full py-3 px-1 mt-2 mb-4
                text-gray-800 appearance-none
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
             required />

      <!-- Auth Buttton -->
      <button
          @click.prevent="login" :disabled="loading"
          type="button"
              class="w-full py-3 mt-10
                font-medium text-white uppercase
                focus:outline-none bg-blue-600 hover:bg-blue-700 rounded-xl hover:shadow-none">
        Login
      </button>

      <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
        <div v-show="!!showError">Login failed</div>
      </div>

      <!-- Another Auth Routes -->
      <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
        <a v-if="0" class="flex-2 underline">
          Forgot password?
        </a>

        <p v-if="0" class="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
          or
        </p>

        <nuxt-link class="flex-2 underline" to="/demo/register">Create an Account</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: "SimpleData - Demo - Login",
    }
  },
  layout: 'auth',
  data: () => ({
    loading: false,
    showError: false,
    user: {
      username: '',
      password: ''
    }
  }),

  methods: {
    clearAlert() {
      this.showError = false;
    },
    async login() {
      try {
        this.showError = false;
        this.loading = true;
        await this.$auth.loginWith('local', {
          data: this.user
        })
        this.$router.push('/demo/user');
      } catch (err) {
        this.loading = false;
        this.showError = true;
      }
    }
  }
}
</script>

<style>
</style>
