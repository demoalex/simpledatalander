<template>
  <div>
    <client-only>
      <DemoIntercomOnPage />
    </client-only>

    <div class="py-8">
      <div>
        <h2 class="text-2xl font-semibold leading-tight">Messages</h2>
      </div>
      <div class="my-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0">
          <div class="relative">
            <select
                @change="changeLimit"
                v-model="limit"
                class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option :value="limit" v-for="limit in limits">{{ limit }}</option>
            </select>
            <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div class="relative">
            <select
                @change="changeAssigned"
                v-model="assigned"
                class="appearance-none h-full rounded-r border-t border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700  sm:rounded-r-none sm:border-r-0 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
              <option :value="''">All</option>
              <option :value="category" v-for="category in categoriesAssigned" :key="category">{{ category }}</option>
            </select>
            <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="block relative">
                    <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
          <input
              @change="search"
              v-model="email"
              placeholder="Search by user email"
              class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
        </div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
            <tr>
              <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Text
              </th>
              <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Created at
              </th>
              <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Assignee
              </th>
              <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                View Details
              </th>
            </tr>
            </thead>
            <tbody>
            <template v-for="(message, $index) in messages">
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ message.user }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap" v-html="message.text"></p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ new Date(message.created_at.seconds * 1000) }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <span
                                          class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                          <span aria-hidden
                                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                          <span class="relative">{{ message.assigned }}</span>
                                      </span>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button type="button" @click="toggleDetails(message, $index)" class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Details</button>
                </td>
              </tr>
              <tr v-if="message.show" class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" colspan="5">{{ message.details }}</td>
              </tr>
            </template>
            </tbody>
          </table>
          <div
              class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span v-if="0" class="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                  @click="prev"
                  class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                Prev
              </button>
              <button
                  @click="next"
                  class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      categoriesAssigned: ['Billing', 'Cancellation', 'Member care', 'Rude'],
      assigned: '',
      lastVisible: null,
      firstVisible: null,
      limits: [20, 50, 100],
      limit: 20,
      email: ''
    }
  },
  async mounted() {
    await this.fetchMessages()
  },
  computed: {
    ...mapGetters({
      messages: 'messages/list',
    }),
  },
  methods: {
    async fetchMessages() {
      try {
        await this.$store.dispatch('messages/bindMessages', {
          assigned: this.assigned, lastVisible: this.lastVisible, firstVisible: this.firstVisible,
          limit: this.limit, email: this.email
        })
      } catch (e) {
        console.error(e)
      }
    },
    async changeLimit() {
      await this.fetchMessages()
    },
    async changeAssigned() {
      this.lastVisible = null
      this.firstVisible = null
      await this.fetchMessages()
    },
    async next() {
      this.lastVisible = this.messages[this.messages.length-1]
      this.firstVisible = null
      await this.fetchMessages()
    },
    async prev() {
      this.firstVisible = this.messages[0]
      this.lastVisible = null
      await this.fetchMessages()
    },
    async search() {
      await this.fetchMessages()
    },
    toggleDetails(message, index) {
      this.$store.commit('messages/toggleShow', index)
    }
  }
}
</script>

