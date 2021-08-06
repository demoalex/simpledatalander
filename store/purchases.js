import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Vue from 'vue'

export const state = () => ({
  purchases: []
})

export const actions = {
  bindPurchases: firestoreAction(async function ({ bindFirestoreRef }, data) {
    let ref = this.$fire.firestore.collection('purchases')
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
    await bindFirestoreRef('purchases', ref, { wait: true })
  }),
}

export const getters = {
  list(state) {
    return state.purchases
  }
}

export const mutations = {
  toggleShow(state, index) {
    const message = {...state.purchases[index], show:!state.purchases[index].show}
    Vue.set(state.purchases, index, message)
  }
}
