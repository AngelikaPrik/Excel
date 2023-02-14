import { ExelComponent } from '@core/ExelComponent'

export class Formula extends ExelComponent {
  static className = 'exel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    })
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(e) {
    const text = e.target.textContent.trim()
    this.$emit('formula:input', text)
  }

  onKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.$emit('formula:done')
    }
  }
}
