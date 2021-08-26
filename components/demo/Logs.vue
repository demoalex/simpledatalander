<template>
  <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow col-span-2 lg:col-span-1">

    <div class="bg-white px-4 py-3 border-b border-gray-200 sm:px-6 flex flex-row justify-between items-center">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Log</h3>

      <button
        @click.prevent="load" :disabled="loading"
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Load log for last 15 minutes
    </button>
    </div>
    <div class="px-5 py-3" v-for="log in logs"><b>{{log.dt}}</b>: {{log.log.message}}</div>
    <div class="px-5 py-3" v-if="!logs.length">{{ message }}</div>
    
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Logs",
  data() {
    return {
      loading: false,
      logs: [],
      message: 'No loaded log records'
    }
  },
  computed: {
    ...mapGetters({
      getLogs: `logs/getLogs`,
    })
  },
  props: {
    app: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.logs = this.getLogs(this.app)
  },
  methods: {
    ...mapActions({
      fetchLog: 'logs/fetchLogs'
    }),
    async load() {
      this.loading = true
      await this.fetchLog(this.app)
      this.loading = false
      this.logs = this.getLogs(this.app)
      if (!this.logs.length) this.message = 'No log records during last 15 minutes'
    }
  }
}
</script>

<style scoped>

</style>