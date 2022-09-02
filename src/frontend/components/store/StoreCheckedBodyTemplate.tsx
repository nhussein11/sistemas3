import React from 'react'
import { Checkbox } from 'primereact/checkbox'
import { defaultStore, selectedStoreState } from '../../atoms/selectedStoreAtom'
import { isStoreCheckedState } from '../../atoms/isStoreCheckedAtom'
import { StoreCheckedBodyTemplateProps } from '../../@types/frontend.types'
import { useRecoilState } from 'recoil'

const StoreCheckedBodyTemplate = ({ rowData }:StoreCheckedBodyTemplateProps) => {
  const [, setSelectedStore] = useRecoilState(selectedStoreState)
  const [isStoreChecked, setIsStoreChecked] =
    useRecoilState(isStoreCheckedState)
  const handleCheck = () => {
    if (isStoreChecked.id === rowData.id) {
      setIsStoreChecked({ id: '', checked: false })
      setSelectedStore(defaultStore)
      return
    }
    setIsStoreChecked({ id: rowData.id, checked: true })
    setSelectedStore(rowData)
  }
  return (
    <Checkbox
      onChange={() => handleCheck()}
      value={rowData.id}
      checked={isStoreChecked.id === rowData.id}
    ></Checkbox>
  )
}

export default StoreCheckedBodyTemplate
