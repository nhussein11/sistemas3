import React from 'react'
import { Dialog } from 'primereact/dialog'
import { DialogNewStockProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import EnrollmentDialogFooter from './EnrollmentDialogFooter'
import StudentsTable from '../students/StudentsTable'
import CoursesTable from '../courses/coursesTable'
import useDialogNewEnrollmentMutation from '../../hooks/enrollments/useDialogNewEnrollmentMutation'

const DialogNewEnrollment = ({
  displayBasic,
  closeDialog
}: DialogNewStockProps) => {
  const {
    handleCreateNewEnrollment,
    studentsQuery,
    coursesQuery,
    academicYear
  } = useDialogNewEnrollmentMutation('enrollments')
  return (
    <Dialog
      visible={displayBasic}
      header="Nueva inscripcion"
      style={{ width: '50vw' }}
      footer={() =>
        EnrollmentDialogFooter({ closeDialog, handleCreateNewEnrollment })
      }
      onHide={() => closeDialog()}
    >
      <div className="form-container">
        <StudentsTable isEnrollment students={studentsQuery.data?.students} />
        <CoursesTable isEnrollment courses={coursesQuery.data?.courses} />
      </div>
      <div style={{ display: 'grid' }}>
        <label htmlFor="id">ciclo lectivo</label>
        <InputText
          {...academicYear}
          name="minQuantity"
          placeholder="minQuantity"
        />
      </div>
    </Dialog>
  )
}

export default DialogNewEnrollment
