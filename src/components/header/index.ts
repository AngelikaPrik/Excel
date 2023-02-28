import { Dom } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'

import { defaultTitle } from '@constants'
import { debounce } from '@core/utils'
import { $ } from '@core/dom'
import { changeTitle } from '@redux/actions'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor(
    $root: Dom,
    options: ConstructorParameters<typeof ExcelComponent>
  ) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle

    return `
		<input type="text" class="input" value="${title}" />
			<div class="">
			<div class="button">
				<i class="material-icons">exit_to_app</i>
			</div>
			<div class="button">
				<i class="material-icons">delete</i>
			</div>
			</div>
		`
  }

  onInput(e: InputEvent) {
    const $target = $(e.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
