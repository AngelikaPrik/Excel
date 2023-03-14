import { IState, IData } from '@core/models'
import { ACTION } from './types'

export function rootReducer<T extends IState>(
  state: T,
  action: IData
): T {
  let field: keyof IState
  let val: any
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
      val = state[field as keyof IState] || {}

      action.data.ids.forEach((id: string) => {
        val[id] = { ...val[id], ...action.data.value }
      })
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      }

    case ACTION.CHANGE_TITLE:
      return { ...state, title: action.data }

    case ACTION.UPDATE_OPENING_DATE:
      return { ...state, openingDate: new Date().toJSON() }

    default:
      return state
  }
}

type StateKey = keyof IState

function value<T extends StateKey>(
  state: IState,
  field: T,
  action: IData
): IState[T] {
  const val: IState[T] = state[field] || ({} as IState[T])
  if (action.data && action.data.id) {
    val[action.data.id as keyof IState[T]] = action.data.value
  }
  return val
}
