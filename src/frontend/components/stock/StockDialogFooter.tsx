import React from 'react'
import { Button } from 'primereact/button'
import { StockDialogFooterProps } from '../../@types/frontend.types'

const StockDialogFooter = ({ closeDialog, handleCreateNewStock }:StockDialogFooterProps) => {
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
