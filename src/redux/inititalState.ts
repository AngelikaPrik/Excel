import { defaultTitle, defaultStyles } from '@constants'
import { IState } from '@core/models'
import { clone } from '@core/utils'

const defaultState: IState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  title: defaultTitle,
  openingDate: new Date().toJSON(),
}

const normilize = <T extends IState>(state: T): T => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export const normilizeInitialState = <T extends IState>(state: T): T => {
  return state ? normilize(state) : clone(defaultState)
}