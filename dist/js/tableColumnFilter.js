"use strict";var _interopRequireDefault=require("D:\\code\\table-column-filter\\node_modules\\@babel\\runtime-corejs2/helpers/interopRequireDefault"),_typeof2=_interopRequireDefault(require("D:\\code\\table-column-filter\\node_modules\\@babel\\runtime-corejs2/helpers/esm/typeof"));require("core-js/modules/web.dom.iterable");var _stringify=_interopRequireDefault(require("D:\\code\\table-column-filter\\node_modules\\@babel\\runtime-corejs2/core-js/json/stringify"));require("core-js/modules/es6.function.name");var tableId,columns=[],columns_bak=[],initialColumns=[],dirctive={inserted:function(e,t){tableId=t.value;var n=getColumnOptions(e);initialColumns=n.map(function(e){return e.name}),columns=n.map(function(e){return e.selected=!e.unchecked,e}),getCacheColmuns(),columns_bak=JSON.parse((0,_stringify.default)(columns));var l=getContainerEle(),o=getMaskEle(),a=getModalWrapEle(),r=getModalEle(),d=getModalHeadEle(),i=getModalBodyEle(n),c=getModalFootEle(e);r.appendChild(d),r.appendChild(i),r.appendChild(c),a.appendChild(r),l.appendChild(o),l.appendChild(a);var s=getSwitchEle();e.parentNode.insertBefore(s,e),e.appendChild(l)},componentUpdated:function(e){resolveTableBySelectColumns(e,columns)}},getCacheColmuns=function(){var e;try{e=JSON.parse(localStorage.getItem("cache-columns-"+tableId));var t={};e.forEach(function(e){t[e.name]=e}),columns=columns.map(function(e){return t[e.name]&&(e.selected=t[e.name].selected),e})}catch(e){}},setCacheColmuns=function(){if(tableId&&"object"==("undefined"==typeof localStorage?"undefined":(0,_typeof2.default)(localStorage))){for(var e=0;e<columns.length;e++)columns[e].unchecked=!columns[e].selected;var t=(0,_stringify.default)(columns);localStorage.setItem("cache-columns-"+tableId,t)}},getColumnOptions=function(e){for(var t=e.getElementsByTagName("th"),n=[],l=0;l<t.length;l++){var o=t[l],a=(o.attributes.col||{}).value;if(a){var r={name:a,disabled:!!o.attributes.basic,unchecked:!!o.attributes.unchecked};n.push(r)}}return n},setEleAttributes=function(e,t){for(var n in t)e.setAttribute(n,t[n])},setEleStyles=function(e,t){for(var n in t)e.style[n]=t[n]},getMaskEle=function(){var e=document.createElement("div");return setEleStyles(e,{position:"fixed",overflow:"auto",top:"0",right:"0",bottom:"0",left:"0",zIndex:"1000",outline:"0",background:"#000",opacity:"0.5"}),e},getModalEle=function(){var e=document.createElement("div");return setEleStyles(e,{position:"relative",top:"100px",width:"800px",margin:"0 auto",outline:"none",background:"#fff",borderRadius:"4px",boxShadow:"0 0 20px 0 rgba(0,0,0,0.55)"}),e},closeModal=function(){document.getElementById("table-col-select").style.display="none"},getModalHeadEle=function(){var e=document.createElement("div");setEleStyles(e,{fontSize:"18px",borderBottom:"1px solid #dddee1",padding:"10px 15px"});var t=document.createTextNode("需要显示字段");e.appendChild(t);var n=document.createElement("div");return n.innerHTML="X",setEleStyles(n,{float:"right",cursor:"pointer",fontWeight:"bold",color:"#999"}),n.addEventListener("click",function(){document.getElementById("table-col-select").style.display="none"}),e.appendChild(n),e},getModalBodyEle=function(e){var t=document.createElement("div"),o=document.createElement("div");o.innerHTML='<div style="padding: 10px;font-weight: bold;">可选字段:</div>',setEleStyles(o,{float:"left",width:"80%",minHeight:"200px",maxHeight:"400px",overflowY:"auto",borderRight:"1px solid #dddee1"});var n=document.createElement("div");setEleAttributes(n,{id:"table-column-filter-right"}),setEleStyles(n,{float:"left",width:"19%",maxHeight:"400px",overflowY:"auto",borderLeft:"1px solid #dddee1",marginLeft:"-1px"});var l=document.createElement("div");setEleStyles(l,{clear:"both"});var a=document.createElement("span");return a.setAttribute("id","table-columns-checkboxs"),e.forEach(function(e){var t=document.createElement("input");setEleAttributes(t,{type:"checkbox",id:e.name}),t.disabled=!!e.disabled,t.checked=!!e.selected,t.addEventListener("change",function(e){var t=e.target.id,n=e.target.checked;columns=columns.map(function(e){return e.name==t&&(e.selected=n),e}),setSelectedColumnEle()});var n=document.createElement("label"),l=document.createTextNode(" "+e.name);setEleStyles(n,{display:"inline-block",padding:"5px 10px",minWidth:"100px"}),n.setAttribute("for",e.name),n.appendChild(t),n.appendChild(l),a.appendChild(n),o.appendChild(a)}),setSelectedColumnEle(n),t.appendChild(o),t.appendChild(n),t.appendChild(l),t},setSelectedColumnEle=function(e){var t=e||document.getElementById("table-column-filter-right");t.innerHTML='<div style="padding: 10px;font-weight: bold;">当前选定的字段:</div>';for(var l=document.createElement("div"),n=function(e){var t=columns[e];if(!t.selected)return"continue";var a=document.createElement("div");setEleStyles(a,{padding:"5px 10px",background:t.disabled?"#eee":"#fff"}),t.disabled||(a.onmouseover=function(){a.style.background="#eee";var e=a.getElementsByTagName("span")[1];e&&(e.style.display="initial")},a.onmouseout=function(){a.style.background="#fff";var e=a.getElementsByTagName("span")[1];e&&(e.style.display="none")}),a.innerHTML="<span>"+t.name+"</span>",setEleAttributes(a,{col:t.name});var n=document.createElement("span");n.innerHTML="X",setEleStyles(n,{float:"right",display:"none",cursor:"pointer",color:"#999",fontWeight:"bold"}),n.onclick=function(e){var t=e.target.parentNode.attributes.col.value;a.parentNode.removeChild(a);for(var n=document.getElementById("table-columns-checkboxs").getElementsByTagName("input"),l=0;l<n.length;l++){var o=n[l];o.id==t&&(o.checked=!1)}columns=columns.map(function(e){return e.name==t&&(e.selected=!1),e})},t.disabled||a.appendChild(n),l.appendChild(a)},o=0;o<columns.length;o++)n(o);t.appendChild(l)},getModalFootEle=function(e){var t=document.createElement("div");setEleStyles(t,{padding:"10px 15px",borderTop:"1px solid #dddee1",textAlign:"right"});var n=document.createElement("button");setEleStyles(n,{padding:"5px 15px",background:"#fff",border:"1px solid #dddee1",borderRadius:"4px",cursor:"pointer",marginLeft:"10px"}),n.innerHTML="取消",n.onclick=function(){columns=JSON.parse((0,_stringify.default)(columns_bak)),rollbackSelect(columns),closeModal()};var l=document.createElement("button");return setEleStyles(l,{padding:"5px 15px",background:"#34c0e3",border:"none",borderRadius:"4px",color:"#fff",cursor:"pointer"}),l.innerHTML="保存",l.onclick=function(){columns_bak=JSON.parse((0,_stringify.default)(columns)),resolveTableBySelectColumns(e,columns),closeModal(),setCacheColmuns()},t.appendChild(l),t.appendChild(n),t},rollbackSelect=function(e){setSelectedColumnEle(),e.forEach(function(e){for(var t=document.getElementById("table-columns-checkboxs").getElementsByTagName("input"),n=0;n<t.length;n++){var l=t[n];l.id==e.name&&(l.checked=e.selected)}})},getModalWrapEle=function(){var e=document.createElement("div");return setEleStyles(e,{position:"fixed",overflow:"auto",top:"0",right:"0",bottom:"0",left:"0",zIndex:"1000",outline:"0"}),e},getSwitchEle=function(){var e=document.createElement("div");setEleStyles(e,{textAlign:"left",cursor:"pointer"});var t=document.createElement("a");return t.innerHTML="列表自定义",t.addEventListener("click",function(){var e=document.getElementById("table-col-select"),t=e.style.display;e.style.display="none"==t?"initial":"none"}),e.appendChild(t),e},getContainerEle=function(){var e=document.createElement("div");setEleAttributes(e,{id:"table-col-select"});return setEleStyles(e,{display:"none",width:"100%",height:"100%",textAlign:"left"}),e},resolveTableBySelectColumns=function(e,t){for(var n=e.getElementsByTagName("th"),l=0;l<n.length;l++){var o=n[l];if(o.attributes.col&&-1!=initialColumns.indexOf(o.attributes.col.value)){var a=-1<t.filter(function(e){return e.selected}).map(function(e){return e.name}).indexOf(o.attributes.col.value)?"table-cell":"none";o.style.display=a;for(var r=e.getElementsByTagName("tr"),d=0;d<r.length;d++){var i=r[d].getElementsByTagName("td");i[l]&&(i[l].style.display=a)}}}};module.exports=dirctive;