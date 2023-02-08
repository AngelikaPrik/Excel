import { ExelComponent } from '@core/ExelComponent'
import { shouldResize } from './table.functions'
import { resizeHandler } from './table.resize'
import { createTable } from './table.template'

export class Table extends ExelComponent {
  static className = 'exel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.$root, e)
    }
  }
  toHTML() {
    return createTable()
  }
}
