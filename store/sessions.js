const initialState = {
  user: {},
  sessionId: null,
  status: 'anonymous',
}

export const state = () => ({
  ...initialState
})

export const mutations = {
  setSessionId: (state, sessionId) => {
    state.sessionId = sessionId
  },
}

export const getters = {
  getSessionId: state => state.sessionId,
}

export const actions = {
}
