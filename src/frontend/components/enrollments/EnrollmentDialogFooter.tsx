import React from 'react'
import { Button } from 'primereact/button'
import { EnrollmentDialogFooterProps } from '../../@types/frontend.types'

const EnrollmentDialogFooter = ({ closeDialog, handleCreateNewEnrollment }:EnrollmentDialogFooterProps) => {
  const createEnrollment = () => {
    handleCreateNewEnrollment()
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
      onClick={createEnrollment}
      autoFocus
    />
  </div>
  )
}

export default EnrollmentDialogFooter
