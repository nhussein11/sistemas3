import { Checkbox } from 'primereact/checkbox'
import React, { useState } from 'react'
import { SelectBodyTemplateProps } from '../@types/frontend.types'

const SelectBodyTemplate = ({
  rowData,
  setSelectedProduct,
  selectedProduct
}:SelectBodyTemplateProps) => {
  const handleCheck = () => {
    if (selectedProduct === rowData.id) {
      setSelectedProduct('')
      setIsChecked(false)
    } else {
      setSelectedProduct(rowData.id)
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
