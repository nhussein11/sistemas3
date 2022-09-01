import { Checkbox } from 'primereact/checkbox'
import React from 'react'
import { useRecoilState } from 'recoil'
import { StoreCheckedBodyTemplateProps } from '../../@types/frontend.types'
import { isStoreCheckedState } from '../../atoms/isStoreCheckedAtom'
import { defaultStore, selectedStoreState } from '../../atoms/selectedStoreAtom'

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
