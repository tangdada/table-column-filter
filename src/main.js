import Vue from 'vue'
import App from './App.vue'
const direcs = require('../dist/js/index.js')

Vue.config.productionTip = false
Vue.use(direcs)
new Vue({
  render: h => h(App),
}).$mount('#app')
