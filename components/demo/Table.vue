<template>
  <div>
    
    <div class="bg-white shadow overflow-hidden sm:rounded-md divide-y divide-gray-200">
      <div class="px-4 pt-5  sm:px-6 flex sm:flex-row flex-col justify-between items-center">
        <h2 class="text-2xl font-semibold leading-tight mb-5">Messages</h2>
        <div class="mb-5">
          <div class="flex flex-row mb-1 sm:mb-0">
            <div class="relative">
              <select
                  @change="changeLimit"
                  v-model="limit"
                  class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option :value="limit" v-for="limit in limits">{{ limit }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div class="relative" v-if="type=='messages'">
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
        </div>
        
      </div>
      <template v-for="(row, $index) in rows">
        
          <div class="flex items-center px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div class="min-w-0 flex-1 flex items-center">
              <div class="min-w-0 flex-1 pr-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  
                  <p class="mt-2 flex items-center font-medium text-sm text-indigo-600">
                    <!-- Heroicon name: solid/mail -->
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span class="truncate">{{ row.user }}</span>
                  </p>
                  <p class="text-sm truncate text-gray-900"><time>{{ new Date(row.created_at.seconds * 1000) }}</time></p>
                </div>
                <div class="hidden md:block">
                  <div class="flex flex-column justify-center flex-col h-full">
                    <p class="text-sm text-gray-900" v-html="row.text">
                      
                    </p>
                    <p v-if="type=='messages'" class="mt-2 flex items-center text-sm text-gray-500">
                      <span
                          class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span aria-hidden
                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                          <span class="relative">{{ row.assigned }}</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <!-- Heroicon name: solid/chevron-right -->
              <svg @click="toggleDetails(row, $index)" class="h-5 w-5 text-indigo-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        
        <div v-if="row.show" class="fixed inset-0 overflow-hidden z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div class="slide-overs absolute inset-0 overflow-hidden">
            <!-- Background overlay, show/hide based on slide-over state. -->
            <div class="absolute inset-0" aria-hidden="true">
              <div class="shadow-block absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-500 opacity-100" aria-hidden="true"></div>

              <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                <!--
                  Slide-over panel, show/hide based on slide-over state.

                  Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                    From: "translate-x-full"
                    To: "translate-x-0"
                  Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                    From: "translate-x-0"
                    To: "translate-x-full"
                -->
                <div class="slide-block w-screen max-w-2xl transform transition ease-in-out duration-500 sm:duration-700 translate-x-0">
                  <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div class="px-4 sm:px-6">
                      <div class="flex items-start justify-between">
                        <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                        </h2>
                        <div class="ml-3 h-7 flex items-center">
                          <button @click="toggleDetails(row, $index)" type="button" class="bg-white rounded-md cursor-pointer text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="sr-only">Close panel</span>
                            <!-- Heroicon name: outline/x -->
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="mt-6 relative flex-1 px-4 sm:px-6">
                      <!-- Replace with your content -->
                      <div class="absolute inset-0 px-4 sm:px-6">
                        <vue-json-pretty :data="row.details"> </vue-json-pretty>
                      </div>
                      <!-- /End replace -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <nav class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0" aria-label="Pagination">
      <div class="-mt-px w-0 flex-1 flex text-gray-500 hover:text-indigo-600 hover:border-indigo-600">
        <a  @click="prev" class="border-t-2 cursor-pointer border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 hover:border-indigo-600">
          <!-- Heroicon name: solid/arrow-narrow-left -->
          <svg class="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Previous
        </a>
      </div>
      <div class="-mt-px w-0 flex-1 flex justify-end text-gray-500 hover:text-indigo-600 hover:border-indigo-600">
        <a @click="next" class="border-t-2 cursor-pointer border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 hover:border-indigo-600">
          Next
          <!-- Heroicon name: solid/arrow-narrow-right -->
          <svg class="ml-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </nav>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  name: 'Table',
  props: {
    type: {
      type: String,
      required: true,
    }
  },
  components: {
    VueJsonPretty,
  },
  data () {
    return {
      categoriesAssigned: ['Billing', 'Cancellation', 'Member care', 'Rude'],
      assigned: '',
      lastVisible: null,
      firstVisible: null,
      limits: [5, 10, 20, 50, 100],
      limit: 5,
      email: '',
      functions: {
        messages: this.fetchMessages,
        purchases: this.fetchPurchases
      }
    }
  },
  async mounted() {
    await this.fetch()
  },
  computed: {
    ...mapGetters({
      messages: 'messages/list',
      purchases: 'purchases/list',
    }),
    data() {
      return {
        messages: this.messages,
        purchases: this.purchases
      }
    },
    rows() {
      return this.data[this.type]
    }
  },
  methods: {
    async fetch() {
      await this.functions[this.type]()
    },
    async fetchPurchases() {
      try {
        await this.$store.dispatch('purchases/bindPurchases', {
          lastVisible: this.lastVisible, firstVisible: this.firstVisible,
          limit: this.limit, email: this.email
        })
      } catch (e) {
        console.error(e)
      }
    },
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
      await this.fetch()
    },
    async changeAssigned() {
      this.lastVisible = null
      this.firstVisible = null
      await this.fetch()
    },
    async next() {
      this.lastVisible = this.rows[this.rows.length-1]
      this.firstVisible = null
      await this.fetch()
    },
    async prev() {
      this.firstVisible = this.rows[0]
      this.lastVisible = null
      await this.fetch()
    },
    async search() {
      await this.fetch()
    },
    toggleDetails(message, index) {
      this.$store.commit(`${this.type}/toggleShow`, index);
    }
  }
}
</script>

<style scoped>

</style>