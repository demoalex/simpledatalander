<template>
  <div class="bg-white rounded-lg shadow text-gray-900 overflow-hidden col-span-2">
    <div class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Code Sandbox</div>
      <div class="flex p-2">
        <div>
          <client-only>
            <MonacoEditor class="editor" v-model="code" language="python"/>
          </client-only>
          <button
              :disabled="loading"
              @click="run"
              type="button"
              class="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 focus:outline-none"
                  >Run
          </button>
        </div>
        <div class="m-l-4 p-2 w-full">Output: <br>
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

<style scoped>
.editor {
  height: 400px;
  width: 600px;
  border: 1px solid #ccc;
}
</style>