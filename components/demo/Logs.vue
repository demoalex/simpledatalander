<template>
  <div class="bg-white rounded-lg shadow text-gray-900 overflow-hidden">
    <div class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Log</div>
    <div class="px-5 py-3" v-for="log in logs"><b>{{log.dt}}</b>: {{log.log.message}}</div>
    <div class="px-5 py-3" v-if="!logs.length">{{ message }}</div>
    <button
        @click.prevent="load" :disabled="loading"
        type="button"
        class="p-3 mt-10 mb-5 ml-5 text-center focus:outline-none
                text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded">
      Load log for last 15 minutes
    </button>
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