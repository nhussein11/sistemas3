import { Button } from 'primereact/button'
import React from 'react'

const StoreDialogFooter = ({ closeDialog, handleCreateNewStore }) => {
  const createStore = () => {
    handleCreateNewStore()
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
        onClick={createStore}
        autoFocus
      />
    </div>
  )
}

export default StoreDialogFooter
