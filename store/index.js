import {vuexfireMutations} from "vuexfire";

export const state = () => ({
  counter: 0
})

export const mutations = {
  ...vuexfireMutations,
  increment(state) {
    state.counter++
  }
}
