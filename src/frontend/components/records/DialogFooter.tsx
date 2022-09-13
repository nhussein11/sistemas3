import React from 'react'
import { Button } from 'primereact/button'
import { DialogFooterRecordProps } from '../../@types/frontend.types'

const DialogFooter = ({ closeDialog, handleCreateNewRecord }:DialogFooterRecordProps) => {
  const createRecord = () => {
    handleCreateNewRecord()
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
        onClick={createRecord}
        autoFocus
      />
    </div>
  )
}

export default DialogFooter
