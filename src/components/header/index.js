import { ExelComponent } from '@core/ExelComponent'

export class Header extends ExelComponent {
  static className = 'exel__header'

  constructor($root, options) {
	super($root, {
	  name: 'Header',
	  ...options
	})
 }

  toHTML() {
    return `
		<input type="text" class="input" value="Новая таблица" />
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
}
