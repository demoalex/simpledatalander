<template>
  <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow col-span-2">

    <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        User Properties
      </h3>
    </div>

    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-200 divide-y>">

            <tr v-for="(row, $index) in user" :key="$index">
              <td class="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div class="flex items-center">
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ row.property }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="p-4 bg-white text-sm text-right">
                <p class="text-indigo-700 whitespace-no-wrap">
                  {{ row.value }}
                </p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>    
</template>

<script>
export default {
  name: "UserStatus",
  data() {
    return {
      user: [],
      lang: process.browser ? navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language : ''
    }
  },
  computed: {
    email() {
      return this.$auth.user && this.$auth.user.email || null
    }
  },
  mounted() {
    this.user = [
      {property: "Status", value: this.$auth.user && this.$auth.user.email ? 'Authorized': 'Anonymous'},
      {property: "Email", value: (this.$auth.user && this.$auth.user.email) || '-'},
      {property: "Language", value: this.lang}
    ]
  }
}
</script>

<style scoped>

</style>