<template>
  <div>
    <!-- Card Title -->
    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
      Register
    </h2>

    <form class="mt-10">
      <label for="first_name" class="block text-xs font-semibold text-gray-600 uppercase">First Name</label>
      <input v-model="user.first_name" @keydown="clearAlert"
             id="first_name" type="text" name="first_name" placeholder="first name" autocomplete="first_name"
             class="block w-full py-3 px-1 mt-2
                text-gray-800 appearance-none
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
             required />

      <label for="last_name" class="block mt-10 text-xs font-semibold text-gray-600 uppercase">Last Name</label>
      <input v-model="user.last_name" @keydown="clearAlert"
             id="last_name" type="text" name="last_name" placeholder="last name" autocomplete="last_name"
             class="block w-full py-3 px-1 mt-2
                text-gray-800 appearance-none
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
             required />

      <!-- Email Input -->
      <label for="email" class="block mt-10 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
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
          @click.prevent="register" :disabled="loading"
          type="button"
              class="w-full py-3 mt-10
                font-medium text-white uppercase
                focus:outline-none bg-blue-600 hover:bg-blue-700 rounded-xl hover:shadow-none">
        Create account
      </button>

      <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm ">
        <div v-show="!!showError">Register failed:<br><span v-html="error"></span></div>

      </div>

      <!-- Another Auth Routes -->
      <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
        <a v-if="0" class="flex-2 underline">
          Forgot password?
        </a>

        <p v-if="0" class="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
          or
        </p>

        <nuxt-link class="flex-2 underline" to="/demo/login">Login</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data: () => ({
    loading: false,
    showError: false,
    error: '',
    user: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    }
  }),

  methods: {
    clearAlert() {
      this.showError = false;
    },
    formatError(error) {
      let errorText = '';
      for (const [key, value] of Object.entries(error)) {
        errorText += `${key}: `
        for (let i=0; i<value.length; i++) {
          errorText += `${value[i]} `
        }
        errorText += '<br>'
      }
      return errorText
    },
    async register() {
      try {
        this.showError = false;
        this.loading = true;
        await this.$axios.$post(`${this.$config.apiUrl}/api/v1/users/register/`, this.user).catch(error => {
          this.error = this.formatError(error.response.data)
          this.loading = false;
          this.showError = true;
        });
        if (!this.showError) {
          await this.$auth.loginWith('local', {data: this.user})
          this.$router.push('/demo/user');
        }
      } catch (err) {
        this.loading = false;
        this.showError = true;
      }
    }
  }

};
</script>

<style>
</style>
