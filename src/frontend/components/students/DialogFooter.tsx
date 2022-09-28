import React from 'react'
import { Button } from 'primereact/button'
import { DialogFooterCoursesProps } from '../../@types/frontend.types'

const DialogFooter = ({ closeDialog, handleCreateNewCourse }:DialogFooterCoursesProps) => {
  const createCourse = () => {
    handleCreateNewCourse()
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
        onClick={createCourse}
        autoFocus
      />
    </div>
  )
}

export default DialogFooter
