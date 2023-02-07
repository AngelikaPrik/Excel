import { ExelComponent } from '@core/ExelComponent'

export class Formula extends ExelComponent {
  static className = 'exel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    })
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(e) {
    console.log('onInput formula', e)
  }
}
