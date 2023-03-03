import { IModelState } from '@core/models'
import { Dom } from '@core/dom'
import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { createToolbar } from './toolbar.template'
import { defaultStyles } from '@constants'
import { $ } from '@core/dom'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'
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

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes: IModelState) {
    this.setState(changes.currentStyles)
  }

  onClick(event: PointerEvent) {
    const $target = $(event.target)

    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
