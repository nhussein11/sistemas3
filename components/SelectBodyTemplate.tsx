import { Checkbox } from 'primereact/checkbox'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { SelectBodyTemplateProps } from '../@types/frontend.types'
import { selectedProductState } from '../atoms/selectedProductAtom'

const SelectBodyTemplate = ({ rowData }: SelectBodyTemplateProps) => {
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductState)
  const handleCheck = () => {
    if (selectedProduct.id === rowData.id) {
      setSelectedProduct({
        id: '',
        name: '',
        price: 0
      })
      setIsChecked(false)
    } else {
      setSelectedProduct(rowData)
      setIsChecked(true)
    }
  }
  console.log(selectedProduct)
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Checkbox
      onChange={() => handleCheck()}
      value={rowData.id}
      checked={isChecked}
    ></Checkbox>
  )
}

export default SelectBodyTemplate
