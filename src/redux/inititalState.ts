import { defaultTitle, IStyles, defaultStyles } from '@constants'
import { clone } from '@core/utils'

export interface IModelState {
  rowState: object
  colState: object
  dataState: { [key: string]: string }
  stylesState: { [key: string]: { [key: string]: string } }
  currentStyles: IStyles
  currentText: string
  title: string
  openingDate: string
}

const defaultState: IModelState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  title: defaultTitle,
  openingDate: new Date().toJSON(),
}

const normilize = (state: IModelState): IModelState => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export const normilizeInitialState = (state: IModelState) => {
  return state ? normilize(state) : clone(defaultState)
}
