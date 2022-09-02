import React from 'react'
import { Checkbox } from 'primereact/checkbox'
import { defaultStock, selectedStockState } from '../../atoms/selectedStockAtom'
import { isStockCheckedState } from '../../atoms/isStockSelectedAtom'
import { StockCheckedBodyTemplateProps } from '../../@types/frontend.types'
import { useRecoilState } from 'recoil'

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
