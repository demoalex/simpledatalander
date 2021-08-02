const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function randomString(length, chars) {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export default function ({ store }) {
  let sessionId = store.getters['sessions/getSessionId']
  if (!sessionId) {
    sessionId = randomString(32, CHARS)
    store.commit('sessions/setSessionId', sessionId)
  }
}
