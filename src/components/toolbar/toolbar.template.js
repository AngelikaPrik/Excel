function toButton({ icon, active, value }) {
  const prefix = 'format_'
  const meta = `data-type='button' data-value='${JSON.stringify(value)}'`

  return `
  <div class="button ${active ? 'active' : ''}" ${meta}>
		<i class="material-icons" ${meta}>
		${prefix}${icon}
		</i>
	</div>
	`
}
export function createToolbar(s) {
  const buttons = [
    {
      icon: 'align_left',
      active: s['textAlign'] === 'left',
      value: { textAlign: 'left' },
    },
    {
      icon: 'align_center',
      active: s['textAlign'] === 'center',
      value: { textAlign: 'center' },
    },
    {
      icon: 'align_right',
      active: s['textAlign'] === 'right',
      value: { textAlign: 'right' },
    },
    {
      icon: 'bold',
      active: s['fontWeight'] === 'bold',
      value: { fontWeight: s['fontWeight'] === 'bold' ? 'normal' : 'bold' },
    },
    {
      icon: 'italic',
      active: s['fontStyle'] === 'italic',
      value: {
        fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      icon: 'underline',
      active: s['textDecoration'] === 'underline',
      value: {
        textDecoration:
          s['textDecoration'] === 'underline' ? 'none' : 'underline',
      },
    },
  ]

  return buttons.map(toButton).join('')
}
