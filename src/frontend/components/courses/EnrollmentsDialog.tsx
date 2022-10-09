import { Dialog } from 'primereact/dialog'
import React from 'react'
import useEnrollmentsDialog from '../../hooks/courses/useEnrollmentsDialog'
import EnrollmentsTable from '../enrollments/EnrollmentsTable'

const EnrollmentsDialog = () => {
  const { filteredEnrollments, showDialog, closeDialog } =
    useEnrollmentsDialog()
  return (
    <Dialog
      visible={showDialog}
      header="Matriculas"
      style={{ width: '50vw' }}
      onHide={closeDialog}
    >
      <div className="form-container">
        <EnrollmentsTable isDialog enrollments={filteredEnrollments || []} />
      </div>
    </Dialog>
  )
}

export default EnrollmentsDialog
