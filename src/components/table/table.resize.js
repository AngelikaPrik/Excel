import { $ } from '../../core/dom'

export function resizeHandler($root, e) {
  const resizeType = e.target.dataset.resize
  const $resizer = $(e.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const sideProp = resizeType === 'col' ? 'bottom' : 'right'
  let value

  $resizer.css({ opacity: 1, [sideProp]: '-2000px' })

  document.onmousemove = e => {
    if (resizeType === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({ right: -delta + 'px' })
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({ bottom: -delta + 'px' })
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (resizeType === 'col') {
      $parent.css({ width: value + 'px' })
      $root
        .findAll(`[data-col="${$parent.dataAttr.col}"]`)
        .forEach(el => (el.style.width = value + 'px'))
    } else {
      $parent.css({ height: value + 'px' })
    }

    $resizer.css({ opacity: 0, bottom: 0, right: 0 })
  }
}
