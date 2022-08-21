import React from 'react'
import { Checkbox } from 'primereact/checkbox'
import { useRecoilState } from 'recoil'
import { SelectBodyTemplateProps } from '../../@types/frontend.types'
import {
  defaultProduct,
  selectedProductState
} from '../../atoms/selectedProductAtom'
import { isProductCheckedState } from '../../atoms/isProductCheckedAtom'

const SelectBodyTemplate = ({ rowData }: SelectBodyTemplateProps) => {
  const [, setSelectedProduct] =
    useRecoilState(selectedProductState)
  const [isProductChecked, setIsProductChecked] = useRecoilState(
    isProductCheckedState
  )
  const handleCheck = () => {
    if (isProductChecked.id === rowData.id) {
      setIsProductChecked({ id: '', checked: false })
      setSelectedProduct(defaultProduct)
      return
    }
    setIsProductChecked({ id: rowData.id, checked: true })
    setSelectedProduct(rowData)
  }
  return (
    <Checkbox
      onChange={() => handleCheck()}
      value={rowData.id}
      checked={isProductChecked.id === rowData.id}
    ></Checkbox>
  )
}

export default SelectBodyTemplate
