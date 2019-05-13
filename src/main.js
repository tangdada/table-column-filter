import Vue from 'vue'
import App from './App.vue'
import direcs from './directives'

Vue.config.productionTip = false

Vue.use(direcs)
new Vue({
  render: h => h(App),
}).$mount('#app')
