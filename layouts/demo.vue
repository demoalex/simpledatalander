<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">

    <div class="h-screen flex overflow-hidden bg-gray-100">
      <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
      <div class="navbar-menu fixed inset-0 flex z-40" role="dialog" aria-modal="true">
        <!--
          Off-canvas menu overlay, show/hide based on off-canvas menu state.

          Entering: "transition-opacity ease-linear duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "transition-opacity ease-linear duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" @click="toggleMenu"></div>

        <!--
          Off-canvas menu, show/hide based on off-canvas menu state.

          Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
          Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
        -->
        <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
          <!--
            Close button, show/hide based on off-canvas menu state.

            Entering: "ease-in-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in-out duration-300"
              From: "opacity-100"
              To: "opacity-0"
          -->
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="toggleMenu">
              <span class="sr-only">Close sidebar</span>
              <!-- Heroicon name: outline/x -->
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-shrink-0 flex items-center px-4">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg" alt="Workflow">
          </div>
          <div class="mt-5 flex-1 h-0 overflow-y-auto">
            <nav class="px-2 space-y-1">
              <!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-600" -->
              <template v-for="(item, $index) in menu">
                <nuxt-link @click.native="menuItemClick(item)" class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-4 py-2 text-sm font-medium rounded-md ransition ease-out duration-700" :to="item.to">
                  <svg class="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" @click="toggleMenu(item)">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  {{ item.name }}
                </nuxt-link>
              </template>
            </nav>
          </div>
        </div>

        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>

    </div>


    <div class="hidden bg-indigo-700 md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4">
            <nuxt-link class="flex h-8 title-font font-medium items-center text-gray-900 mb-4 md:mb-0" to="/demo/intercom">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="2" class="w-12 h-12 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </nuxt-link>
          </div>
          <div class="mt-5 flex-1 flex flex-col">
            <nav class="flex-1 px-2 space-y-1">
              <template v-for="(item, $index) in menu">
                <nuxt-link @click.native="menuItemClick(item)" class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-4 py-2 text-sm font-medium rounded-md ransition ease-out duration-700" :to="item.to">
                  {{ item.name }}
                </nuxt-link>
              </template>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button type="button" @click="toggleMenu" class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
          <span class="sr-only">Open sidebar</span>
          <!-- Heroicon name: outline/menu-alt-2 -->
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex">
          </div>
          <div class="ml-4 flex items-center md:ml-0">
            <nuxt-link v-if="!email" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-out duration-700" to="/demo/login">Sign In</nuxt-link>
            <nuxt-link v-if="!email" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-out duration-700 ml-4" to="/demo/register">Sign up</nuxt-link>
  
            <div class="ml-3 relative" v-if="email">
            <div>
              <button type="button" class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true" @click="dropdown = !dropdown">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
              </button>
            </div>

            <div :class="`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-${dropdown ? 'out' : 'in'} duration-${dropdown ? '100' : '75'} transform opacity-${dropdown ? '100' : '0'} scale-${dropdown ? '100' : '95'}`" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <!-- Active: "bg-gray-100", Not Active: "" -->
              {{ email }}
              <a href="#" class="block px-4 py-2 text-sm text-gray-700" @click="logout">Logout</a>
            </div>
          </div>
          </div>
        </div>
      </div>

      <main>
        <div class="py-6">
          <div class="relative  mx-auto px-6 mb-4">
            <div class="bg-gradient-to-r from-pink-400 to-indigo-500 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
              <div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div class="lg:self-center">
                  <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
                    <span class="block">Ready to dive in?</span>
                    <span class="block text-indigo-500">Start your free trial today.</span>
                  </h2>
                  <p class="mt-4 text-lg leading-6 text-white">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.</p>
                  <a href="#" class="mt-8 bg-white border border-transparent rounded-md shadow py-3 px-6 inline-flex items-center text-base font-medium text-pink-400 hover:text-pink-500">Sign up for free</a>
                </div>
              </div>
              <div class="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                <img class="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20" src="https://tailwindui.com/img/component-images/full-width-with-sidebar.jpg" alt="App screenshot">
              </div>
            </div>
          </div>
          <nuxt />
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss">

  main{
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .navbar-menu{
    transform: translateX(-100%);
    transition: .3s;

    &.is-open{
      transform: translateX(0%);
    }
  }

  .max-w-screen-3xl {
    max-width: 1920px;
    margin: 0 auto;
  }

  .nuxt-link-active{
    color: #fff;
    --tw-bg-opacity: 1;
    background-color: rgba(55,48,163,var(--tw-bg-opacity));

    &:hover{
      color: #fff;
      --tw-bg-opacity: 1;
      background-color: rgba(55,48,163,var(--tw-bg-opacity));
    }
  }
</style>

<script>

export default {
  name: 'TheNavBar',
  data() {
    return {
      dropdown: false,
      menu: [
        {name: 'User', to: '/demo/user', current: true},
        {name: 'Intercom', to: '/demo/intercom', current: false},
        {name: 'Stripe', to: '/demo/stripe', current: false},
        {name: 'Code Sandbox', to: '/demo/code', current: false},
        {name: 'Events', to: '/demo/events', current: false},
      ]
    }
  },
  computed: {
    email() {
      return this.$auth.user && this.$auth.user.email || null
    }
  },
  methods: {
    menuItemClick(item) {
      this.$ma.trackEvent({action: `${item.name} Nav Click`})
    },
    toggleMenu(item=null) {
      const menu = document.querySelectorAll('.navbar-menu');
      for (let j = 0; j < menu.length; j++) {
        menu[j].classList.toggle('is-open');
      }
    },
    logout() {
      this.$auth.logout().catch(() => {}).finally(() => {
        if (process.browser) location.reload()
      });
    }
  },
  mounted() {
  }
}
</script>
