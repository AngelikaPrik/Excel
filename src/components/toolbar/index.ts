import { IState } from '@core/models'
import { Dom } from '@core/dom'
import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { createToolbar } from './toolbar.template'
import { defaultStyles } from '@constants'
import { $ } from '@core/dom'

export class Toolbar extends ExcelStateComponent {
  static override className = 'excel__toolbar'
  constructor(
    $root: Dom,
    options: ConstructorParameters<typeof ExcelStateComponent>
  ) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    })
  }

  override prepare() {
    this.initState(defaultStyles)
  }

  override get template() {
    return createToolbar(this.state)
  }

  override toHTML() {
    return this.template
  }

  override storeChanged(changes: IState) {
    this.setState(changes.currentStyles)
  }

  onClick(event: PointerEvent) {
    const $target = $(event.target as EventTarget)

    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
