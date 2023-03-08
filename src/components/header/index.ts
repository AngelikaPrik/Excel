import { Dom } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'

import { defaultTitle } from '@constants'
import { debounce } from '@core/utils'
import { $ } from '@core/dom'
import { changeTitle } from '@redux/actions'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor(
    $root: Dom,
    options: ConstructorParameters<typeof ExcelComponent>
  ) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  override prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  override toHTML() {
    const title = this.store.getState().title || defaultTitle

    return `
		<input type="text" class="input" value="${title}" />
			<div class="">
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
			</div>
		`
  }

  onInput(e: InputEvent) {
    const $target = $(e.target as EventTarget)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(e: PointerEvent) {
    const $target = $(e.target as EventTarget)
    if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    } else if ($target.data.button === 'remove') {
      const decision = confirm('Вы уверены, что хотите удалить данную таблицу?')

      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    }
  }
}
