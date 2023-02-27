import { ExcelComponent } from './ExcelComponent'

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args: ConstructorParameters<typeof ExcelComponent>) {
    super(...args)
  }

  get template() {
    return JSON.stringify(this.state, null, 2)
  }

  initState(initialState = {}) {
    this.state = { ...initialState }
  }

  setState(newState: object) {
    this.state = { ...this.state, ...newState }
    this.$root.html(this.template)
  }
}
