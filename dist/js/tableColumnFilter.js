'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// {col: xxx, basic, unchecked, selected: xxx}
// 每列内容定义为对象，name:列名，basic:不可更改，unchecked: 是否默认不选中, selected: 是否选中
var columns = [];
var columns_bak = [];
var initialColumns = [];
var tableId = void 0;

var dirctive = {
  inserted: function inserted(el, binding) {
    tableId = binding.value;
    var cols = getColumnOptions(el);
    initialColumns = cols.map(function (c) {
      return c.name;
    });
    columns = cols.map(function (col) {
      col.selected = !col.unchecked;
      return col;
    });
    getCacheColmuns();

    columns_bak = JSON.parse(JSON.stringify(columns)); // 备份修改前的列信息，点击“取消”时用到

    var containerEle = getContainerEle();
    var maskEle = getMaskEle();

    var modalWrapEle = getModalWrapEle();
    var modalEle = getModalEle();
    var modalHeadEle = getModalHeadEle();
    var modalBodyEle = getModalBodyEle(cols);
    var modalFootEle = getModalFootEle(el);
    modalEle.appendChild(modalHeadEle);
    modalEle.appendChild(modalBodyEle);
    modalEle.appendChild(modalFootEle);
    modalWrapEle.appendChild(modalEle);

    containerEle.appendChild(maskEle);
    containerEle.appendChild(modalWrapEle);

    var switch1 = getSwitchEle();

    el.parentNode.insertBefore(switch1, el);
    el.appendChild(containerEle);
  },
  componentUpdated: function componentUpdated(el) {
    resolveTableBySelectColumns(el, columns);
  }
  // 获取缓存中的列设置
};var getCacheColmuns = function getCacheColmuns() {
  var cols = void 0;
  try {
    cols = JSON.parse(localStorage.getItem('cache-columns-' + tableId));
    var cacheColsMap = {};
    cols.forEach(function (c) {
      cacheColsMap[c.name] = c;
    });
    columns = columns.map(function (col) {
      if (cacheColsMap[col.name]) {
        col.selected = cacheColsMap[col.name].selected;
      }
      return col;
    });
  } catch (err) {}
};
// 缓存列设置
var setCacheColmuns = function setCacheColmuns() {
  if (tableId && (typeof localStorage === 'undefined' ? 'undefined' : _typeof(localStorage)) == 'object') {
    for (var i = 0; i < columns.length; i++) {
      columns[i].unchecked = !columns[i].selected;
    }
    var s = JSON.stringify(columns);
    localStorage.setItem('cache-columns-' + tableId, s);
  }
};
// <th col="xxx" basic(默认不设置) unchecked(默认不设置) >xxx</th>
var getColumnOptions = function getColumnOptions(el) {
  var thsEle = el.getElementsByTagName('th');
  var columnsTransFromThs = [];
  for (var i = 0; i < thsEle.length; i++) {
    var th = thsEle[i];
    var colName = (th.attributes.col || {}).value;
    if (colName) {
      var thObj = {
        name: colName,
        disabled: !!th.attributes.basic,
        unchecked: !!th.attributes.unchecked
      };
      columnsTransFromThs.push(thObj);
    }
  }
  return columnsTransFromThs;
};
// 设置dom属性
var setEleAttributes = function setEleAttributes(ele, attrs) {
  for (var key in attrs) {
    ele.setAttribute(key, attrs[key]);
  }
};
// 设置dom样式
var setEleStyles = function setEleStyles(ele, styles) {
  for (var key in styles) {
    ele.style[key] = styles[key];
  }
};
var getMaskEle = function getMaskEle() {
  var ele = document.createElement('div');
  var styles = {
    position: 'fixed',
    overflow: 'auto',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '1000',
    outline: '0',
    background: '#000',
    opacity: '0.5'
  };
  setEleStyles(ele, styles);
  return ele;
};
var getModalEle = function getModalEle() {
  var ele = document.createElement('div');
  var styles = {
    position: 'relative',
    top: '100px',
    width: '800px',
    margin: '0 auto',
    outline: 'none',
    background: '#fff',
    borderRadius: '4px',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.55)'
  };
  setEleStyles(ele, styles);
  return ele;
};
var closeModal = function closeModal() {
  var modal = document.getElementById('table-col-select');
  modal.style.display = 'none';
};
var getModalHeadEle = function getModalHeadEle() {
  var ele = document.createElement('div');
  var styles = {
    fontSize: '18px',
    borderBottom: '1px solid #dddee1',
    padding: '10px 15px'
  };
  setEleStyles(ele, styles);
  var text = document.createTextNode('需要显示字段');
  ele.appendChild(text);

  var close = document.createElement('div');
  close.innerHTML = 'X';
  setEleStyles(close, { float: 'right', cursor: 'pointer', fontWeight: 'bold', color: '#999' });
  close.addEventListener('click', function () {
    var modal = document.getElementById('table-col-select');
    modal.style.display = 'none';
  });
  ele.appendChild(close);
  return ele;
};
var getModalBodyEle = function getModalBodyEle(cols) {
  var ele = document.createElement('div');
  var left = document.createElement('div');
  left.innerHTML = '<div style="padding: 10px;font-weight: bold;">可选字段:</div>';
  setEleStyles(left, { float: 'left', width: '80%', minHeight: '200px', maxHeight: '400px', overflowY: 'auto', borderRight: '1px solid #dddee1' });
  var right = document.createElement('div');
  setEleAttributes(right, { id: 'table-column-filter-right' });
  setEleStyles(right, { float: 'left', width: '19%', maxHeight: '400px', overflowY: 'auto', borderLeft: '1px solid #dddee1', marginLeft: '-1px' });
  var clear = document.createElement('div');
  setEleStyles(clear, { clear: 'both' });

  var checkboxWrap = document.createElement('span');
  checkboxWrap.setAttribute('id', 'table-columns-checkboxs');
  cols.forEach(function (col) {
    var box = document.createElement('input');
    setEleAttributes(box, { type: 'checkbox', 'id': col.name });
    box.disabled = !!col.disabled; // 必选,不可以修改
    box.checked = !!col.selected; // 必选,不可以修改
    // 添加复选框事件
    box.addEventListener('change', function (event) {
      var id = event.target.id;
      var checked = event.target.checked;
      columns = columns.map(function (col) {
        if (col.name == id) {
          col.selected = checked;
        }
        return col;
      });
      setSelectedColumnEle();
    });
    // 加入复选框
    var label = document.createElement('label');
    var text = document.createTextNode(' ' + col.name);
    setEleStyles(label, { display: 'inline-block', padding: '5px 10px', minWidth: '100px' });
    label.setAttribute('for', col.name);
    label.appendChild(box);
    label.appendChild(text);
    checkboxWrap.appendChild(label);

    left.appendChild(checkboxWrap);
  });

  setSelectedColumnEle(right);

  ele.appendChild(left);
  ele.appendChild(right);
  ele.appendChild(clear);
  return ele;
};
var setSelectedColumnEle = function setSelectedColumnEle(initialRight) {
  var right = initialRight || document.getElementById('table-column-filter-right');
  right.innerHTML = '<div style="padding: 10px;font-weight: bold;">当前选定的字段:</div>';

  var ele = document.createElement('div');

  var _loop = function _loop(i) {
    var col = columns[i];
    if (!col.selected) return 'continue';
    var item = document.createElement('div');
    setEleStyles(item, { padding: '5px 10px', background: col.disabled ? '#eee' : '#fff' });
    if (!col.disabled) {
      item.onmouseover = function () {
        item.style.background = '#eee';
        var c = item.getElementsByTagName('span')[1];
        if (c) c.style.display = 'initial';
      };
      item.onmouseout = function () {
        item.style.background = '#fff';
        var c = item.getElementsByTagName('span')[1];
        if (c) c.style.display = 'none';
      };
    }
    item.innerHTML = '<span>' + col.name + '</span>';
    setEleAttributes(item, { col: col.name });
    var closeBtn = document.createElement('span');
    closeBtn.innerHTML = 'X';
    setEleStyles(closeBtn, { float: 'right', display: 'none', cursor: 'pointer', color: '#999', fontWeight: 'bold' });
    closeBtn.onclick = function (event) {
      var colName = event.target.parentNode.attributes.col.value;
      item.parentNode.removeChild(item);
      var boxWrap = document.getElementById('table-columns-checkboxs');
      var ipts = boxWrap.getElementsByTagName('input');
      for (var _i = 0; _i < ipts.length; _i++) {
        var ipt = ipts[_i];
        if (ipt.id == colName) {
          ipt.checked = false;
        }
      }
      columns = columns.map(function (c) {
        if (c.name == colName) {
          c.selected = false;
        }
        return c;
      });
    };
    if (!col.disabled) item.appendChild(closeBtn);

    ele.appendChild(item);
  };

  for (var i = 0; i < columns.length; i++) {
    var _ret = _loop(i);

    if (_ret === 'continue') continue;
  }
  right.appendChild(ele);
};
var getModalFootEle = function getModalFootEle(el) {
  var ele = document.createElement('div');
  setEleStyles(ele, { padding: '10px 15px', borderTop: '1px solid #dddee1', textAlign: 'right' });
  var clo = document.createElement('button');
  setEleStyles(clo, { padding: '5px 15px', background: '#fff', border: '1px solid #dddee1', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' });
  clo.innerHTML = '取消';
  clo.onclick = function () {
    columns = JSON.parse(JSON.stringify(columns_bak));
    rollbackSelect(columns);
    closeModal();
  };
  var btn = document.createElement('button');
  setEleStyles(btn, { padding: '5px 15px', background: '#34c0e3', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer' });
  btn.innerHTML = '保存';
  btn.onclick = function () {
    columns_bak = JSON.parse(JSON.stringify(columns));
    resolveTableBySelectColumns(el, columns);
    closeModal();
    setCacheColmuns();
  };
  ele.appendChild(btn);
  ele.appendChild(clo);

  return ele;
};
var rollbackSelect = function rollbackSelect(columns) {
  setSelectedColumnEle();
  columns.forEach(function (col) {
    var boxWrap = document.getElementById('table-columns-checkboxs');
    var ipts = boxWrap.getElementsByTagName('input');
    for (var i = 0; i < ipts.length; i++) {
      var ipt = ipts[i];
      if (ipt.id == col.name) {
        ipt.checked = col.selected;
      }
    }
  });
};
var getModalWrapEle = function getModalWrapEle() {
  var ele = document.createElement('div');
  var styles = {
    position: 'fixed',
    overflow: 'auto',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '1000',
    outline: '0'
  };
  setEleStyles(ele, styles);
  return ele;
};
var getSwitchEle = function getSwitchEle() {
  var switchWrap = document.createElement('div');
  setEleStyles(switchWrap, { textAlign: 'left', cursor: 'pointer' });
  var ele = document.createElement('a');
  ele.innerHTML = '列表自定义';
  ele.addEventListener('click', function () {
    var modal = document.getElementById('table-col-select');
    var show = modal.style.display;
    modal.style.display = show == 'none' ? 'initial' : 'none';
  });
  switchWrap.appendChild(ele);
  return switchWrap;
};
var getContainerEle = function getContainerEle() {
  var ele = document.createElement('div');
  setEleAttributes(ele, { id: 'table-col-select' });
  var styls = { display: 'none', width: '100%', height: '100%', textAlign: 'left' };
  setEleStyles(ele, styls);
  return ele;
};
var resolveTableBySelectColumns = function resolveTableBySelectColumns(el, columns) {
  var ths = el.getElementsByTagName('th');
  for (var i = 0; i < ths.length; i++) {
    var th = ths[i];
    // 没有定义的列,不作处理
    if (!th.attributes.col || initialColumns.indexOf(th.attributes.col.value) == -1) continue;

    // 根据选中的列,显示表格
    var colNames = columns.filter(function (col) {
      return col.selected;
    }).map(function (col) {
      return col.name;
    });
    var showStyle = colNames.indexOf(th.attributes.col.value) > -1 ? 'table-cell' : 'none';
    th.style.display = showStyle;

    // 根据th的位置隐藏对应的td
    var trs = el.getElementsByTagName('tr');
    for (var j = 0; j < trs.length; j++) {
      var tds = trs[j].getElementsByTagName('td');
      if (tds[i]) {
        tds[i].style.display = showStyle;
      }
    }
  }
};

module.exports = dirctive;