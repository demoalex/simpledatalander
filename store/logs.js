const initialState = {
  logs: {
    intercom: []
  }
}

export const state = () => ({
  ...initialState
})

export const mutations = {
  intercomLogsSet: (state, intercomLogs) => {
    state.logs.intercom = intercomLogs
  },
}

export const getters = {
  getLogs: (state) =>  {
    return (app) => {
      return state.logs[app]
    }
  }
}

export const actions = {
  fetchLogs({ commit }, app) {
    return this.$axios.$get(`${this.$config.apiUrl}/api/v1/logs/${app}/`).then(data => {
      commit(`${app}LogsSet`, data)
    })
  }
}
