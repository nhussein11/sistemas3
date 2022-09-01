import { Checkbox } from 'primereact/checkbox'
import React from 'react'

const StockCheckedBodyTemplate = ({rowData}) => {
  const handleCheck = () => {}
  return (
    <Checkbox
      onChange={() => handleCheck()}
      value={rowData.id}
      checked={false} // change using global stock state
    ></Checkbox>
  )
}

export default StockCheckedBodyTemplate