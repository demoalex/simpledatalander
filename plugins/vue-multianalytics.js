import Vue from 'vue'
import VueMultianalytics from 'vue-multianalytics/dist/vue-multianalytics'
import EventModule from "~/assets/js/events-module"

VueMultianalytics.addCustomModule('eventModule', EventModule)

export default ({ app, store, $config }, inject) => {
  if (process.client) {
    let $ma
    let url = $config.eventTrackerUrl

    $ma =
      VueMultianalytics.install(
        Vue,
        {
          modules: {
            eventModule: { store, url }
          },
          returnModule: true
        }
      )
    app.router.afterEach((to, from) => {
      $ma.trackView({ viewName: to.fullPath })
    })

    Vue.prototype.$ma = $ma
  }
}
