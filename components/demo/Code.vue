<template>
  <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow col-span-2">


    <div class="bg-white px-4 py-3 border-b border-gray-200 sm:px-6 flex flex-row justify-between items-center">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Code Sandbox</h3>

          <button
              :disabled="loading"
              @click="run"
              type="button"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-out duration-700 ml-4">
              Run
          </button>
      </div>
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-2 p-6">
  
        <client-only>
          <MonacoEditor class="editor" v-model="code" language="python"/>
        </client-only>
        <div class="m-l-4 p-2">Output: <br>
          <textarea rows="15" readonly class="resize-none focus:outline-none w-full" v-model="output"></textarea>
        </div>
      </div>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'
export default {
  name: "Code",
  components: {
    MonacoEditor
  },
  data() {
    return {
      code: 'print("Hello World")',
      output: '',
      loading: false
    }
  },
  methods: {
    run() {
      this.loading = true
      this.$axios.$post(`${this.$config.codeSandboxApiUrl}/run-snippet`, {snippet: this.code}).then(data => {
        this.output = data.output
      }).catch(error => {
        console.error(error)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
  height: 400px;
  border: 1px solid #ccc;
}
</style>