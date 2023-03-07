import { defaultTitle, defaultStyles } from '@constants'
import { IModelState } from '@core/models'
import { clone } from '@core/utils'

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
