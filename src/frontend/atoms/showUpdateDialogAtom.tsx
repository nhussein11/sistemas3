import { atom } from 'recoil'
export const UPDATE_MODES_ENUM = {
  STOCK_UPDATE: 'stockUpdate',
  STOCK_MOVEMENT: 'stockMovement',
  PRODUCT_UPDATE: 'productUpdate',
  DEFAULT: 'default'

}
export const showUpdateDialogDefaultState = {
  showUpdateDialog: false,
  updateMode: UPDATE_MODES_ENUM.DEFAULT
}

export const showUpdateDialogState = atom({
  key: 'showUpdateDialogState',
  default: showUpdateDialogDefaultState
})
