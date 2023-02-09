import { ExelComponent } from '@core/ExelComponent'
import { isCell, matrix, shouldResize } from './table.functions'
import { resizeHandler } from './table.resize'
import { createTable } from './table.template'
import { TableSelection } from './TableSelection'
import { $ } from '@core/dom'

export class Table extends ExelComponent {
  static className = 'exel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }
  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="1:0"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
                        .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }
}
