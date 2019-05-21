'use strict';

var updateTiming = undefined;
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
var directive = {
  inserted: function inserted(el) {
    var cols = getColumnOptions(el);
    var newEle = document.createElement('div');
    newEle.style.textAlign = 'left';
    // 1. 自定义开关
    var switch1 = document.createElement('a');
    switch1.style.cursor = 'pointer';
    switch1.innerHTML = '表格自定义';
    switch1.addEventListener("click", function () {
      var checkboxs = document.getElementById('table-columns-checkboxs');
      var show = checkboxs.style.display;
      if (show == 'none') {
        checkboxs.style.display = 'initial';
        switch1.innerHTML = '收起自定义';
      } else {
        checkboxs.style.display = 'none';
        switch1.innerHTML = '表格自定义';
      }
    });
    newEle.appendChild(switch1);

    var checkboxWrap = document.createElement('span');
    checkboxWrap.setAttribute('id', 'table-columns-checkboxs');
    checkboxWrap.style.display = 'none'; // 默认隐藏
    checkboxWrap.style.marginLeft = '20px';
    cols.forEach(function (col) {
      var label = document.createElement('label');
      label.setAttribute('for', col.name);
      label.style.display = 'inline-block';
      label.style.marginRight = '10px';

      var box = document.createElement('input');
      box.setAttribute('type', 'checkbox');
      box.setAttribute('checked', true);
      box.setAttribute('id', col.name);
      box.disabled = !!col.disabled; // 必选,不可以修改
      box.checked = !col.unchecked;

      // 添加复选框事件
      box.addEventListener("change", function (event) {
        var id = event.target.id;
        var checked = event.target.checked;
        var ths = el.getElementsByTagName('th');
        for (var i = 0; i < ths.length; i++) {
          var th = ths[i];
          if (th.attributes.col && th.attributes.col.value == id) {
            th.style.display = checked ? 'table-cell' : 'none';

            // 根据th的位置隐藏对应的td
            var trs = el.getElementsByTagName('tr');
            for (var j = 0; j < trs.length; j++) {
              var tds = trs[j].getElementsByTagName('td');
              if (tds[i]) {
                tds[i].style.display = checked ? 'table-cell' : 'none';
              }
            }
          }
        }
      });
      // 2. 加入复选框
      label.appendChild(box);
      var text = document.createTextNode(col.name);
      label.appendChild(text);
      checkboxWrap.appendChild(label);

      newEle.appendChild(checkboxWrap);
    });

    el.parentNode.insertBefore(newEle, el);
  },
  update: function update(el) {
    if (updateTiming) {
      return;
    }
    updateTiming = setTimeout(function () {
      updateTiming = undefined;
      var checkboxContainer = document.getElementById('table-columns-checkboxs');
      var checkboxs = checkboxContainer.getElementsByTagName('input');
      for (var i = 0; i < checkboxs.length; i++) {
        var ipt = checkboxs[i];

        var ths = el.getElementsByTagName('th');
        for (var _i = 0; _i < ths.length; _i++) {
          var th = ths[_i];
          if (th.attributes.col && th.attributes.col.value == ipt.id) {
            th.style.display = ipt.checked ? 'table-cell' : 'none';

            // 根据th的位置隐藏对应的td
            var trs = el.getElementsByTagName('tr');
            for (var j = 0; j < trs.length; j++) {
              var tds = trs[j].getElementsByTagName('td');
              if (tds[_i]) {
                tds[_i].style.display = ipt.checked ? 'table-cell' : 'none';
              }
            }
          }
        }
      }
    }, 400);
  }
};

module.exports = directive;