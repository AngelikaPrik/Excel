import { Dom } from '@core/dom'
import { $ } from '@core/dom'

export function resizeHandler($root: Dom, event: MouseEvent) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const resizeType = $resizer.data.resize
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const sideProp = resizeType === 'col' ? 'bottom' : 'right'
    let value: number

    $resizer.css({ opacity: 1, [sideProp]: '-2000px' })

    document.onmousemove = e => {
      if (resizeType === 'col') {
        const delta = e.pageX - coords.right
        value = Math.ceil(coords.width + delta)
        $resizer.css({ right: -delta + 'px' })
      } else {
        const delta = e.pageY - coords.bottom
        value = Math.ceil(coords.height + delta)
        $resizer.css({ bottom: -delta + 'px' })
      }
      $root.css({ userSelect: 'none' })
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      if (resizeType === 'col') {
        $parent.css({ width: value + 'px' })
        $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el: HTMLDivElement) => {
            el.style.width = value + 'px'
          })
      } else {
        $parent.css({ height: value + 'px' })
      }

      resolve({
        value,
        resizeType,
        id: $parent.data[resizeType],
      })

      $resizer.css({ opacity: 0, bottom: 0, right: 0 })
      $root.css({ userSelect: 'auto' })
    }
  })
}
