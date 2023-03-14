import { Dom } from '@core/dom'
import { range } from '@core/utils'

export function shouldResize(event: MouseEvent): string | void {
  const target = event.target as HTMLDivElement
  if (target) {
    return target.dataset.resize
  }
}

export function isCell(event: MouseEvent): boolean | void {
  const target = event.target as HTMLDivElement
  if (target) {
    return target.dataset.type === 'cell'
  }
}

export function matrix($target: Dom, $current: Dom) {
  const target = $target.id(true)
  const current = $current.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc: string[], col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(
  key: string,
  { col, row }: { [key: string]: number }
) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1

      break
  }
  return `[data-id="${row}:${col}"]`
}
