import { Button } from 'primereact/button'
import React from 'react'

const StockDialogFooter = ({ closeDialog, handleCreateNewStock }) => {
  const createStock = () => {
    handleCreateNewStock()
    closeDialog()
  }
  return (
    <div>
    <Button
      label="Cancelar"
      icon="pi pi-times"
      onClick={closeDialog}
      className="p-button-text"
    />
    <Button
      label="Guardar"
      icon="pi pi-check"
      onClick={createStock}
      autoFocus
    />
  </div>
  )
}

export default StockDialogFooter
