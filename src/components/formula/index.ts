import { IModelState } from './../../redux/inititalState'
import { $, Dom } from '../../core/dom'
import { ExcelComponent } from '../../core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

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

  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula')

    this.$on('table:select', ($cell: Dom) => {
      this.$formula.text($cell.data.value)
    })
  }

  storeChanged({ currentText }: IModelState) {
    this.$formula.text(currentText)
  }

  onInput(e: InputEvent) {
    this.$emit('formula:input', $(e.target).text())
  }

  onKeydown(e: KeyboardEvent) {
    const keys = ['Enter', 'Tab']

    if (keys.includes(e.key)) {
      e.preventDefault()
      this.$emit('formula:done')
    }
  }
}
