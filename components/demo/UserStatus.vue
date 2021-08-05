<template>
  <div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
          <tr>
            <th colspan="2"
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              User Properties
            </th>
          </tr>
          </thead>
          <tr v-for="(row, $index) in user" :key="$index">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div class="flex items-center">
                <div class="ml-3">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ row.property }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">
                {{ row.value }}
              </p>
            </td>
          </tr>
        </table>
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