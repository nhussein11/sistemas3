import { Checkbox } from 'primereact/checkbox'
import React from 'react'
import { useRecoilState } from 'recoil'
import { isStoreCheckedState } from '../../atoms/isStoreCheckedAtom'
import { defaultStore, selectedStoreState } from '../../atoms/selectedStoreAtom'

const StoreCheckedBodyTemplate = ({ rowData }) => {
  const [, setSelectedStore] = useRecoilState(selectedStoreState)
  const [isStoreChecked, setIsStoreChecked] =
    useRecoilState(isStoreCheckedState)
  // brind selected store from recoil state
  // brind is selected store from recoil state
  const handleCheck = () => {
    if (isStoreChecked.id === rowData.id) {
      setIsStoreChecked({ id: '', checked: false })
      setSelectedStore(defaultStore)
      return
    }
    setIsStoreChecked({ id: rowData.id, checked: true })
    setSelectedStore(rowData)
  }
  // set selected store
  // set is selected store
  return (
    <Checkbox
      onChange={() => handleCheck()}
      value={rowData.id}
      checked={isStoreChecked.id === rowData.id} // change this with comparison of selected store and row data
    ></Checkbox>
  )
}

export default StoreCheckedBodyTemplate
