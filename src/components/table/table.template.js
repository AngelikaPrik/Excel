const LETTER_CODES = {
  A: 65,
  Z: 90,
}

const toChar = (_, i) => String.fromCharCode(LETTER_CODES.A + i)

const toCell = () => `<div class="cell" contenteditable></div>`

const toColumn = col => `<div class="column">${col}</div>`

const createRow = (content, num = '') => `
	<div class="row">
		<div class="row-info">${num}</div>
		<div class="row-data">${content}</div>
	</div>
`

export function createTable(rowsCount = 30) {
  const columnCount = LETTER_CODES.Z - LETTER_CODES.A + 1
  const rows = []
  const col = new Array(columnCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(cols))

  for (let i = 1; i < rowsCount + 1; i++) {
    const cells = new Array(columnCount).fill('').map(toCell).join('')
    rows.push(createRow(cells, i))
  }

  return rows.join('')
}
