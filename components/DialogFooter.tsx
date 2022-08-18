import { Button } from 'primereact/button'
import React from 'react'

const DialogFooter = ({ closeDialog, handleCreateNewProduct }) => {
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
        icon="pi pi-check"
        onClick={createProduct}
        autoFocus
      />
    </div>
  )
}

export default DialogFooter
