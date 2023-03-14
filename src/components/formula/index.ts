import { $, Dom } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { IState } from '@core/models'

export class Formula extends ExcelComponent {
  static override className = 'excel__formula'

  constructor(
    $root: Dom,
    options: ConstructorParameters<typeof ExcelComponent>
  ) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    })
  }

  override toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  override init() {
    super.init()

    this.$formula = this.$root.find('#formula')

    this.$on('table:select', ($cell: Dom) => {
      this.$formula.text($cell.data.value)
    })
  }

  override storeChanged({ currentText }: IState) {
    this.$formula.text(currentText)
  }

  onInput(e: InputEvent) {
    this.$emit('formula:input', $(e.target as EventTarget).text())
  }

  onKeydown(e: KeyboardEvent) {
    const keys = ['Enter', 'Tab']

    if (keys.includes(e.key)) {
      e.preventDefault()
      this.$emit('formula:done')
    }
  }
}
