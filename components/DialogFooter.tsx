import { Button } from 'primereact/button'
import React from 'react'

const DialogFooter = ({ closeDialog }) => {
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
        onClick={closeDialog}
        autoFocus
      />
    </div>
  )
}

export default DialogFooter
