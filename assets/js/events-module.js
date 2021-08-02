import axios from 'axios'
import BasicModule from 'vue-multianalytics/src/modules/BasicModule'

export default class EventModule extends BasicModule {
  init(initConf = {}) {
    this.store = initConf.store
    this.url = initConf.url
    this.projectId = 'demo-simpledata'
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  trackEvent({category = 'Event', action, label = null, properties = {}}) {
    if (!(this.store && this.store.getters)) return
    // const account = this.store.getters['auth/getUserAccount']
    const data = {}
    data.event_time = (new Date()).toISOString()
    data.title = action
    data.project_id = this.projectId
    data.session_id = this.store.getters['sessions/getSessionId']
    data.platform = 'web'
    data.user_id = null
    axios.post(this.url, data, { headers: this.headers })
  }
}
