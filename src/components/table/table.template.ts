import { toInlineStyles } from '@core/utils'
import { defaultStyles } from '@constants'
import { parse } from '@core/parse'
import { IModelState } from '@core/models'

enum LETTER_CODES {
  A = 65,
  Z = 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state: object, index: number): string {
  return (state[index as keyof typeof state] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state: object, index: number): string {
  return (state[index as keyof typeof state] || DEFAULT_HEIGHT) + 'px'
}

function toChar(_: null, i: number): string {
  return String.fromCharCode(LETTER_CODES.A + i)
}

function toCell(state: IModelState, row: number) {
  return function (_: null, col: number) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    })
    return `
    <div 
      class="cell"
      contenteditable
      data-type="cell"
      data-col="${col}"
      data-id="${id}"
      data-value="${data || ''}"
      style="${styles}; width: ${width}"
    >${parse(data) || ''}</div> `
  }
}

function toColumn(column: IColumn) {
  const { col, index, width } = column
  return `
  <div
    class="column"
    data-type="resizable"
    data-col="${index}"
    style="width: ${width}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
`
}

function createRow(index: number, content: string, state = {}) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
      <div class="row-info">
      ${index || ''}
      ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function withWidthFrom(state: IModelState) {
  return function (col: string, index: number): IColumn {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    }
  }
}

export function createTable(rowsCount = 30, state: IModelState) {
  const columnCount = LETTER_CODES.Z - LETTER_CODES.A + 1
  const rows = []
  const cols = new Array(columnCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnCount)
      .fill('')
      .map(toCell(state, row))
      .join('')
    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}

interface IColumn {
  col: string
  index: number
  width: string
}
