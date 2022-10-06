import { atom } from 'recoil'
export const defaultAmmount = {
  ammount: 0
}
export const ammountRecordAtomState = atom({
  key: 'ammount',
  default: defaultAmmount
})
