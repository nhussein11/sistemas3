import React from 'react'
import { Button } from 'primereact/button'
import { DialogFooterStudentsProps } from '../../@types/frontend.types'

const DialogFooter = ({
  closeDialog,
  handleCreateNewStudent
}: DialogFooterStudentsProps) => {
  const createStudent = () => {
    handleCreateNewStudent()
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
        onClick={createStudent}
        autoFocus
      />
    </div>
  )
}

export default DialogFooter
