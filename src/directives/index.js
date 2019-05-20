const tableColumnFilterSimple = require('./tableColumnFilterSimple.js')
const tableColumnFilter = require('./tableColumnFilter.js')


const install = function (Vue) {
  Vue.directive('tableColumnFilter', tableColumnFilter)
  Vue.directive('tableColumnFilterSimple', tableColumnFilterSimple)
}

module.exports = {
  install,
  tableColumnFilterSimple,
  tableColumnFilter
}