const LETTER_CODES = {
  A: 65,
  Z: 90,
}

function toChar(_, i) {
  return String.fromCharCode(LETTER_CODES.A + i)
}

function toCell(row) {
  return function (_, col) {
    return `
    <div 
      class="cell"
      contenteditable
      data-type="cell"
      data-col="${col}"
      data-id="${row}:${col}"
    ></div> `
  }
}

function toColumn(col, i) {
  return `
  <div class="column" data-type="resizable" data-col="${i}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
`
}

function createRow(content, num = '') {
  return `
  <div class="row" data-type="resizable">
    <div class="row-info">
    ${num}
    ${num && '<div class="row-resize" data-resize="row"></div>'}
    </div>
    <div class="row-data">${content}</div>
  </div>
`
}

export function createTable(rowsCount = 30) {
  const columnCount = LETTER_CODES.Z - LETTER_CODES.A + 1
  const rows = []
  const cols = new Array(columnCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(cols))

  for (let row = 1; row < rowsCount + 1; row++) {
    const cells = new Array(columnCount).fill('').map(toCell(row)).join('')
    rows.push(createRow(cells, row))
  }

  return rows.join('')
}
