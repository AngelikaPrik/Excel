import { Dom } from '@core/dom'
import { defaultStyles } from '@constants'
import { ExcelComponent } from '@core/ExcelComponent'
import { isCell, matrix, nextSelector, shouldResize } from './table.functions'
import { resizeHandler } from './table.resize'
import { createTable } from './table.template'
import { TableSelection } from './TableSelection'
import { $ } from '@core/dom'
import * as actions from '@redux/actions'
import { parse } from '@core/parse'
import { IStyles } from '@core/models'

export class Table extends ExcelComponent {
  static override className = 'excel__table'

  constructor(
    $root: Dom,
    options: ConstructorParameters<typeof ExcelComponent>
  ) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }
  override toHTML() {
    return createTable(30, this.store.getState())
  }

  override prepare() {
    this.selection = new TableSelection()
  }

  override init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', (value: string) => {
      this.selection.current.attr('data-value', value).text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', (value: IStyles) => {
      this.selection.applyStyle(value)
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds,
        })
      )
    })
  }

  selectCell($cell: Dom) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)

    const styles: IStyles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event: MouseEvent) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data as {}))
    } catch (error) {
      if (error instanceof Error) {
        console.warn('Resize error ', error.message)
      }
    }
  }

  onMousedown(event: MouseEvent) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target as EventTarget)

      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id =>
          this.$root.find(`[data-id="${id}"]`)
        )
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event: KeyboardEvent) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ]

    const { key } = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextInStore(value: string) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    )
  }

  onInput(e: InputEvent) {
    this.updateTextInStore($(e.target as EventTarget).text())
  }
}
