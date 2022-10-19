import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import DialogError from '../products/DialogError'
import DialogNewEnrollment from './DialogNewEnrollment'
import DialogUpdateEnrollment from './DialogUpdateEnrollment'
import { EnrollmentsTableProps } from '../../@types/frontend.types'
import EnrollmentsTableHeader from './EnrollmentsTableHeader'
import { findCourseName } from '../../services/enrollments/findCourseName'
import useCoursesQuery from '../../hooks/courses/useCoursesQuery'
import useStudentsQuery from '../../hooks/students/useStudentsQuery'
import { findStudentName } from '../../services/enrollments/findStudentName'
import useDeleteEnrollmentMutation from '../../hooks/enrollments/useDeleteEnrollmentMutation'
import { isLoadState } from '../../atoms/isLoadState'
import { useRecoilState } from 'recoil'
const EnrollmentsTable = ({ enrollments, isDialog }: EnrollmentsTableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const coursesQuery = useCoursesQuery('courses')
  const studentsQuery = useStudentsQuery('students')
  const { handleDeleteEnrollment } = useDeleteEnrollmentMutation('enrollments')
  const [loading] = useRecoilState(isLoadState)
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={enrollments}
          loading={loading}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          responsiveLayout="scroll"
          header={
            <EnrollmentsTableHeader
              isDialog={isDialog}
              setDisplayBasic={setDisplayBasic}
            />
          }
          emptyMessage="No se encontraron Productos"
        >
          <Column
            field="Course Name"
            header="Nombre Curso"
            body={(rowData) => findCourseName(rowData.courseId, coursesQuery)}
            alignHeader={'center'}
          />
          <Column
            field="StudentName"
            header="Nombre Alumno"
            body={(rowData) =>
              findStudentName(rowData.studentId, studentsQuery)
            }
            alignHeader={'center'}
          />
          <Column
            field="quantity"
            header="Ciclo Lectivo"
            body={(rowData) => rowData.academicYear}
            alignHeader={'center'}
          />
          {!isDialog && (
            <Column
              field="options"
              header="Opciones"
              body={(rowData) => {
                return (
                  <div>
                    <Button
                      icon="pi pi-pencil"
                      iconPos="right"
                      className="p-button-p-button-raised p-button-danger"
                      onClick={() => {
                        handleDeleteEnrollment(rowData.id)
                      }}
                    />
                  </div>
                )
              }}
              alignHeader={'center'}
            />
          )}
        </DataTable>
      </div>
      <DialogNewEnrollment
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />
      <DialogUpdateEnrollment />
      <DialogError></DialogError>
    </div>
  )
}

export default EnrollmentsTable
