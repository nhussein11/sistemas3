import React from 'react'
import { Button } from 'primereact/button'
import { DialogFooterProps } from '../../@types/frontend.types'

const DialogFooter = ({ closeDialog, handleCreateNewProduct }:DialogFooterProps) => {
  const createProduct = () => {
    handleCreateNewProduct()
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
        className="p-button-raised p-button-success"
        icon="pi pi-check"
        onClick={createProduct}
        autoFocus
      />
    </div>
  )
}

export default DialogFooter
