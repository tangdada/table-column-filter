"use strict";var tableColumnFilterSimple=require("./tableColumnFilterSimple.js"),tableColumnFilter=require("./tableColumnFilter.js"),install=function(l){l.directive("tableColumnFilter",tableColumnFilter),l.directive("tableColumnFilterSimple",tableColumnFilterSimple)};module.exports={install:install,tableColumnFilterSimple:tableColumnFilterSimple,tableColumnFilter:tableColumnFilter};