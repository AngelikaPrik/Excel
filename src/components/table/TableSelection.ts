import { Dom } from '@core/dom'
export class TableSelection {
  static className = 'selected'
  group: Dom[]
  current: Dom

  constructor() {
    this.group = []
    this.current = null
  }

  select($el: Dom) {
    this.clear()
    $el.focus().addClass(TableSelection.className)
    this.group.push($el)
    this.current = $el
  }
  selectGroup($group: Dom[] = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  applyStyle(style: { [key: string]: string }) {
    this.group.forEach($el => $el.css(style))
  }
}
