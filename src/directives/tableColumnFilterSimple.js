let updateTiming = undefined;
// <th col="xxx" basic(默认不设置) unchecked(默认不设置) >xxx</th>
const getColumnOptions = (el) => {
  let thsEle = el.getElementsByTagName('th')
  let columnsTransFromThs = []
  for(let i=0;i<thsEle.length;i++) {
    let th = thsEle[i]
    let colName = (th.attributes.col || {}).value
    if (colName) {
      let thObj = {
        name: colName,
        disabled: !!th.attributes.basic,
        unchecked: !!th.attributes.unchecked,
      }
      columnsTransFromThs.push(thObj)
    }
  }
  return columnsTransFromThs
}
const directive = {
  inserted: function(el) {
    let cols = getColumnOptions(el)
    let newEle = document.createElement('div')
    newEle.style.textAlign = 'left'
    // 1. 自定义开关
    let switch1 = document.createElement('a')
    switch1.style.cursor = 'pointer'
    switch1.innerHTML = '表格自定义'
    switch1.addEventListener("click", function() {
      let checkboxs = document.getElementById('table-columns-checkboxs')
      let show = checkboxs.style.display
      if (show == 'none') {
        checkboxs.style.display = 'initial'
        switch1.innerHTML = '收起自定义'
      } else {
        checkboxs.style.display = 'none'
        switch1.innerHTML = '表格自定义'
      }
    })
    newEle.appendChild(switch1)
    
    let checkboxWrap = document.createElement('span')
    checkboxWrap.setAttribute('id', 'table-columns-checkboxs')
    checkboxWrap.style.display = 'none' // 默认隐藏
    checkboxWrap.style.marginLeft = '20px'
    cols.forEach((col) => {
      let label = document.createElement('label')
      label.setAttribute('for', col.name)
      label.style.display = 'inline-block'
      label.style.marginRight = '10px'

      let box = document.createElement('input')
      box.setAttribute('type', 'checkbox')
      box.setAttribute('checked', true)
      box.setAttribute('id', col.name)
      box.disabled = !!col.disabled // 必选,不可以修改
      box.checked = !col.unchecked

      // 添加复选框事件
      box.addEventListener("change", function(event) {
        let id = event.target.id
        let checked = event.target.checked
        let ths = el.getElementsByTagName('th')
        for(let i=0;i<ths.length;i++) {
          let th = ths[i]
          if (th.attributes.col && th.attributes.col.value == id) {
            th.style.display = checked ? 'table-cell' : 'none'

            // 根据th的位置隐藏对应的td
            let trs = el.getElementsByTagName('tr')
            for(let j=0;j<trs.length;j++) {
              let tds = trs[j].getElementsByTagName('td')
              if (tds[i]) {
                tds[i].style.display = checked ? 'table-cell' : 'none'
              }
            }
          }
        }
      })
      // 2. 加入复选框
      label.appendChild(box)
      let text = document.createTextNode(col.name)
      label.appendChild(text)
      checkboxWrap.appendChild(label)

      newEle.appendChild(checkboxWrap)
    })

    el.parentNode.insertBefore(newEle, el);
  },
  update: function(el) {
    if (updateTiming) {
      return
    }
    updateTiming = setTimeout(() => {
      updateTiming = undefined;
      let checkboxContainer = document.getElementById('table-columns-checkboxs')
      let checkboxs = checkboxContainer.getElementsByTagName('input')
      for (let i=0;i<checkboxs.length;i++) {
        let ipt = checkboxs[i]

        let ths = el.getElementsByTagName('th')
        for(let i=0;i<ths.length;i++) {
          let th = ths[i]
          if (th.attributes.col && th.attributes.col.value == ipt.id) {
            th.style.display = ipt.checked ? 'table-cell' : 'none'

            // 根据th的位置隐藏对应的td
            let trs = el.getElementsByTagName('tr')
            for(let j=0;j<trs.length;j++) {
              let tds = trs[j].getElementsByTagName('td')
              if (tds[i]) {
                tds[i].style.display = ipt.checked ? 'table-cell' : 'none'
              }
            }
          }
        }
      }
    }, 400)
  },
}

export default directive
