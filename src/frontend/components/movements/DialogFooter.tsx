import React from 'react'
import { Button } from 'primereact/button'
import { DialogFooterMovementProps } from '../../@types/frontend.types'

const DialogFooter = ({ closeDialog, handleCreateNewMovement }:DialogFooterMovementProps) => {
  const createMovement = () => {
    handleCreateNewMovement()
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
        onClick={createMovement}
        autoFocus
      />
    </div>
  )
}

export default DialogFooter
