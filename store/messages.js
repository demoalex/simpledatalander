import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Vue from 'vue'

export const state = () => ({
  messages: [],
})

export const actions = {
  bindMessages: firestoreAction(async function ({ bindFirestoreRef }, data) {
    let ref = this.$fire.firestore.collection('messages')
    if (data.assigned)
      ref = ref.where('assigned', '==', data.assigned)
    if (data.email)
      ref = ref.where('user', '==', data.email)
    ref = ref.orderBy("created_at", "desc")
    if (data.lastVisible) {
      ref = ref.startAfter(data.lastVisible.created_at).limit(data.limit)
    }
    else if (data.firstVisible) {
      ref = ref.endBefore(data.firstVisible.created_at).limitToLast(data.limit)
    }
    else {
      ref = ref.limit(data.limit)
    }
    await bindFirestoreRef('messages', ref, { wait: true })
  }),
  // unbindMessages: firestoreAction(function ({ unbindFirestoreRef }) {
  //   unbindFirestoreRef('messages', false)
  // }),
}

export const getters = {
  list(state) {
    return state.messages
  }
}

export const mutations = {
  toggleShow(state, index) {
    const message = {...state.messages[index], show:!state.messages[index].show}
    Vue.set(state.messages, index, message)
  }
}
