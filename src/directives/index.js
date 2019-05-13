import tableColumnFilterSimple from './tableColumnFilterSimple'
import tableColumnFilter from './tableColumnFilter'


const install = function (Vue) {
  Vue.directive('tableColumnFilter', tableColumnFilter)
  Vue.directive('tableColumnFilterSimple', tableColumnFilterSimple)
}

export default {
  install,
  tableColumnFilterSimple,
  tableColumnFilter
}