import { IData } from '@core/models'
import { ACTION } from './types'

export function changeTitle(data: object): IData {
  return {
    type: ACTION.CHANGE_TITLE,
    data,
  }
}

export function tableResize(data: object): IData {
  return {
    type: ACTION.TABLE_RESIZE,
    data,
  }
}

export function changeText(data: object): IData {
  return {
    type: ACTION.CHANGE_TEXT,
    data,
  }
}

export function changeStyles(data: object): IData {
  return {
    type: ACTION.CHANGE_STYLES,
    data,
  }
}

export function applyStyle(data: object): IData {
  return {
    type: ACTION.APPLY_STYLE,
    data,
  }
}

export function updateDate(data?: object): IData {
  return {
    type: ACTION.UPDATE_OPENING_DATE,
    data,
  }
}
