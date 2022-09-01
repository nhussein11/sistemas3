import { Checkbox } from 'primereact/checkbox'
import React from 'react'
import { useRecoilState } from 'recoil'
import { StockCheckedBodyTemplateProps } from '../../@types/frontend.types'
import { isStockCheckedState } from '../../atoms/isStockSelectedAtom'
import { defaultStock, selectedStockState } from '../../atoms/selectedStockAtom'

const StockCheckedBodyTemplate = ({ rowData }:StockCheckedBodyTemplateProps) => {
  const [, setSelectedStock] = useRecoilState(selectedStockState)
  const [isStockChecked, setIsStockChecked] =
    useRecoilState(isStockCheckedState)
  const handleCheck = () => {
    if (isStockChecked.id === rowData.id) {
      setIsStockChecked({ id: '', checked: false })
      setSelectedStock(defaultStock)
      return
    }
    setIsStockChecked({ id: rowData.id, checked: true })
    setSelectedStock(rowData)
  }
  return (
    <Checkbox
      onChange={() => handleCheck()}
      value={rowData.id}
      checked={isStockChecked.id === rowData.id}
    ></Checkbox>
  )
}

export default StockCheckedBodyTemplate
