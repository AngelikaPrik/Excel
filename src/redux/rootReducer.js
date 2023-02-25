import { ACTION } from './types'

export function rootReducer(state, action) {
  let field
  let val
  switch (action.type) {
    case ACTION.TABLE_RESIZE:
      field = action.data.resizeType === 'col' ? 'colState' : 'rowState'
      return { ...state, [field]: value(state, field, action) }

    case ACTION.CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      }

    case ACTION.CHANGE_STYLES:
      return { ...state, currentStyles: action.data }

    case ACTION.APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}

      action.data.ids.forEach(id => {
        val[id] = { ...val[id], ...action.data.value }
      })
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      }

    case ACTION.CHANGE_TITLE:
      return { ...state, title: action.data }

    default:
      return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
