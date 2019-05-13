// {col: xxx, basic, unchecked, selected: xxx}
// 每列内容定义为对象，name:列名，basic:不可更改，unchecked: 是否默认不选中, selected: 是否选中
let columns = []
let columns_bak = []
let initialColumns = []
let tableId;

const dirctive = {
  inserted: function(el, binding) {
    tableId = binding.value
    let cols = getColumnOptions(el) 
    initialColumns = cols.map(c => c.name)
    columns = cols.map(col => {
      col.selected = !col.unchecked
      return col
    })
    getCacheColmuns()

    columns_bak = JSON.parse(JSON.stringify(columns)) // 备份修改前的列信息，点击“取消”时用到

    let containerEle = getContainerEle()
    let maskEle = getMaskEle()

    let modalWrapEle = getModalWrapEle()
    let modalEle = getModalEle()
    let modalHeadEle = getModalHeadEle()
    let modalBodyEle = getModalBodyEle(cols)
    let modalFootEle = getModalFootEle(el)
    modalEle.appendChild(modalHeadEle)
    modalEle.appendChild(modalBodyEle)
    modalEle.appendChild(modalFootEle)
    modalWrapEle.appendChild(modalEle)

    containerEle.appendChild(maskEle)
    containerEle.appendChild(modalWrapEle)

    let switch1 = getSwitchEle()

    el.parentNode.insertBefore(switch1, el)
    el.appendChild(containerEle)
  },
  componentUpdated: function(el) {
    resolveTableBySelectColumns(el, columns)
  },
}
// 获取缓存中的列设置
const getCacheColmuns = () => {
  let cols;
  try {
    cols = JSON.parse(localStorage.getItem('cache-columns-' + tableId))
    let cacheColsMap = {}
    cols.forEach(c => {
      cacheColsMap[c.name] = c
    })
    columns = columns.map(col => {
      if (cacheColsMap[col.name]) {
        col.selected = cacheColsMap[col.name].selected
      }
      return col
    })
  } catch(err) {

  }
}
// 缓存列设置
const setCacheColmuns = () => {
  if (tableId && localStorage && localStorage.setItem) {
    for (let i=0;i<columns.length;i++) {
      columns[i].unchecked = !columns[i].selected
    }
    let s = JSON.stringify(columns)
    localStorage.setItem('cache-columns-' + tableId, s)
  }
}
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
// 设置dom属性
const setEleAttributes = (ele, attrs) => {
  for (let key in attrs) {
    ele.setAttribute(key, attrs[key])
  }
}
// 设置dom样式
const setEleStyles = (ele, styles) => {
  for (let key in styles) {
    ele.style[key] = styles[key]
  }
}
const getMaskEle = () => {
  let ele = document.createElement('div')
  let styles = {
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
  }
  setEleStyles(ele, styles)
  return ele
}
const getModalEle = () => {
  let ele = document.createElement('div')
  let styles = {
    position: 'relative',
    top: '100px',
    width: '800px',
    margin: '0 auto',
    outline: 'none',
    background: '#fff',
    borderRadius: '4px',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.55)',
  }
  setEleStyles(ele, styles)
  return ele
}
const closeModal = () => {
  let modal = document.getElementById('table-col-select')
  modal.style.display = 'none'
}
const getModalHeadEle = () => {
  let ele = document.createElement('div')
  let styles = {
    fontSize: '18px',
    borderBottom: '1px solid #dddee1',
    padding: '10px 15px',
  }
  setEleStyles(ele, styles)
  let text = document.createTextNode('需要显示字段')
  ele.appendChild(text)

  let close = document.createElement('div')
  close.innerHTML = 'X'
  setEleStyles(close, {float: 'right', cursor: 'pointer', fontWeight: 'bold', color: '#999'})
  close.addEventListener('click', function() {
    let modal = document.getElementById('table-col-select')
    modal.style.display = 'none'
  })
  ele.appendChild(close)
  return ele
}
const getModalBodyEle = (cols) => {
  let ele = document.createElement('div')
  let left = document.createElement('div')
  left.innerHTML = '<div style="padding: 10px;font-weight: bold;">可选字段:</div>'
  setEleStyles(left, {float: 'left', width: '80%', minHeight: '200px', maxHeight: '400px', overflowY: 'auto', borderRight: '1px solid #dddee1'})
  let right = document.createElement('div')
  setEleAttributes(right, {id: 'table-column-filter-right'})
  setEleStyles(right, {float: 'left', width: '19%', maxHeight: '400px', overflowY: 'auto', borderLeft: '1px solid #dddee1', marginLeft: '-1px'})
  let clear = document.createElement('div')
  setEleStyles(clear, {clear: 'both'})

  let checkboxWrap = document.createElement('span')
  checkboxWrap.setAttribute('id', 'table-columns-checkboxs')
  cols.forEach((col) => {
    let box = document.createElement('input')
    setEleAttributes(box, {type: 'checkbox', 'id': col.name})
    box.disabled = !!col.disabled // 必选,不可以修改
    box.checked = !!col.selected // 必选,不可以修改
    // 添加复选框事件
    box.addEventListener('change', function(event) {
      let id = event.target.id
      let checked = event.target.checked
      columns = columns.map(col => {
        if (col.name == id) {
          col.selected = checked
        }
        return col
      })
      setSelectedColumnEle()
    })
    // 加入复选框
    let label = document.createElement('label')
    let text = document.createTextNode(' ' + col.name)
    setEleStyles(label, {display: 'inline-block', padding: '5px 10px', minWidth: '100px'})
    label.setAttribute('for', col.name)
    label.appendChild(box)
    label.appendChild(text)
    checkboxWrap.appendChild(label)

    left.appendChild(checkboxWrap)

  })

  setSelectedColumnEle(right)
  
  ele.appendChild(left)
  ele.appendChild(right)
  ele.appendChild(clear)
  return ele
}
const setSelectedColumnEle = (initialRight) => {
  let right = initialRight || document.getElementById('table-column-filter-right')
  right.innerHTML = '<div style="padding: 10px;font-weight: bold;">当前选定的字段:</div>'

  let ele = document.createElement('div')
  for (let i=0;i<columns.length;i++) {
    let col = columns[i]
    if (!col.selected) continue
    let item = document.createElement('div')
    setEleStyles(item, {padding: '5px 10px', background: col.disabled ? '#eee' : '#fff'})
    if (!col.disabled) {
      item.onmouseover = function() { 
        item.style.background = '#eee'
        let c = item.getElementsByTagName('span')[1]
        if (c) c.style.display = 'initial'
      };
      item.onmouseout = function() { 
        item.style.background = '#fff'
        let c = item.getElementsByTagName('span')[1]
        if (c) c.style.display = 'none'
      };
    }
    item.innerHTML = '<span>'+col.name+'</span>'
    setEleAttributes(item, {col: col.name})
    let closeBtn = document.createElement('span')
    closeBtn.innerHTML = 'X'
    setEleStyles(closeBtn, {float: 'right', display: 'none', cursor: 'pointer', color: '#999', fontWeight: 'bold'})
    closeBtn.onclick = function(event) {
      let colName = event.target.parentNode.attributes.col.value
      item.parentNode.removeChild(item)
      let boxWrap = document.getElementById('table-columns-checkboxs')
      let ipts = boxWrap.getElementsByTagName('input')
      for (let i=0;i<ipts.length;i++) {
        let ipt = ipts[i]
        if (ipt.id == colName) {
          ipt.checked = false
        }
      }
      columns = columns.map(c => {
        if (c.name == colName) {
          c.selected = false
        }
        return c
      }) 
    }
    if (!col.disabled) item.appendChild(closeBtn)

    ele.appendChild(item)
  }
  right.appendChild(ele)
}
const getModalFootEle = (el) => {
  let ele = document.createElement('div')
  setEleStyles(ele, { padding: '10px 15px', borderTop: '1px solid #dddee1', textAlign: 'right'})
  let clo = document.createElement('button')
  setEleStyles(clo, {padding: '5px 15px', background: '#fff', border: '1px solid #dddee1', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px'})
  clo.innerHTML = '取消'
  clo.onclick = function() {
    columns = JSON.parse(JSON.stringify(columns_bak))
    rollbackSelect(columns)
    closeModal()
  }
  let btn = document.createElement('button')
  setEleStyles(btn, {padding: '5px 15px', background: '#34c0e3', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer',})
  btn.innerHTML = '保存'
  btn.onclick = function() {
    columns_bak = JSON.parse(JSON.stringify(columns))
    resolveTableBySelectColumns(el, columns)
    closeModal()
    setCacheColmuns()
  }
  ele.appendChild(btn)
  ele.appendChild(clo)

  return ele
}
const rollbackSelect = (columns) => {
  setSelectedColumnEle()
  columns.forEach(col => {
    let boxWrap = document.getElementById('table-columns-checkboxs')
    let ipts = boxWrap.getElementsByTagName('input')
    for (let i=0;i<ipts.length;i++) {
      let ipt = ipts[i]
      if (ipt.id == col.name) {
        ipt.checked = col.selected
      }
    }
  })
}
const getModalWrapEle = () => {
  let ele = document.createElement('div')
  let styles = {
    position: 'fixed',
    overflow: 'auto',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '1000',
    outline: '0',
  }
  setEleStyles(ele, styles)
  return ele
}
const getSwitchEle = () => {
  let switchWrap = document.createElement('div')
  setEleStyles(switchWrap, {textAlign: 'left', cursor: 'pointer'})
  let ele = document.createElement('a')
  ele.innerHTML = '列表自定义'
  ele.addEventListener('click', function() {
    let modal = document.getElementById('table-col-select')
    let show = modal.style.display
    modal.style.display = show == 'none' ? 'initial' : 'none'
  })
  switchWrap.appendChild(ele)
  return switchWrap
}
const getContainerEle = () => {
  let ele = document.createElement('div')
  setEleAttributes(ele, { id: 'table-col-select' })
  let styls = { display: 'none', width: '100%', height: '100%', textAlign: 'left' }
  setEleStyles(ele, styls)
  return ele
}
const resolveTableBySelectColumns = (el, columns) => {
  let ths = el.getElementsByTagName('th')
  for (let i = 0; i < ths.length; i++) {
    let th = ths[i]
    // 没有定义的列,不作处理
    if (!th.attributes.col || initialColumns.indexOf(th.attributes.col.value) == -1) continue

    // 根据选中的列,显示表格
    let colNames = columns.filter(col => col.selected).map(col => col.name)
    let showStyle = colNames.indexOf(th.attributes.col.value) > -1 ? 'table-cell' : 'none'
    th.style.display = showStyle

    // 根据th的位置隐藏对应的td
    let trs = el.getElementsByTagName('tr')
    for (let j = 0; j < trs.length; j++) {
      let tds = trs[j].getElementsByTagName('td')
      if (tds[i]) {
        tds[i].style.display = showStyle
      }
    }
  }
}

export default dirctive