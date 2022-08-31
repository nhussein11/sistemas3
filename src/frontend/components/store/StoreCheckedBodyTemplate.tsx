import { Checkbox } from 'primereact/checkbox'
import React from 'react'

const StoreCheckedBodyTemplate = ({ rowData }) => {
  // brind selected store from recoil state
  // brind is selected store from recoil state
  const handleCheck = () => {
    // set selected store
    // set is selected store
  }
  return (
    <Checkbox
      onChange={() => handleCheck()}
      value={rowData.id}
      checked={false} // change this with comparison of selected store and row data
    ></Checkbox>
  )
}

export default StoreCheckedBodyTemplate
