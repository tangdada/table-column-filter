'use strict';

var tableColumnFilterSimple = require('./tableColumnFilterSimple.js');
var tableColumnFilter = require('./tableColumnFilter.js');

var install = function install(Vue) {
  Vue.directive('tableColumnFilter', tableColumnFilter);
  Vue.directive('tableColumnFilterSimple', tableColumnFilterSimple);
};

module.exports = {
  install: install,
  tableColumnFilterSimple: tableColumnFilterSimple,
  tableColumnFilter: tableColumnFilter
};