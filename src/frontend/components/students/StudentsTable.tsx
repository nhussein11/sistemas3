import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import DialogError from './DialogError'
import { StudentsTableProps } from '../../@types/frontend.types'
import TableHeader from './TableHeader'
import { useRecoilState } from 'recoil'
import {
  showUpdateDialogState,
  UPDATE_MODES_ENUM
} from '../../atoms/showUpdateDialogAtom'
import DialogNewStudent from './DialogNewStudent'
import DialogUpdateStudent from './DialogUpdateStudent'
import { selectedStudentState } from '../../atoms/students/selectedStudentAtom'
import useDeleteStudentMutation from '../../hooks/students/useDeleteStudentMutation'
import { parseDate } from '../../services/records/parseDate'
import { selectedStudentsState } from '../../atoms/enrollments/selectedStudents'
import { isLoadState } from '../../atoms/isLoadState'
const StudentsTable = ({ students, isEnrollment }: StudentsTableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const { handleDeleteStudent } = useDeleteStudentMutation('students')
  const [, setSelectedStudent] = useRecoilState(selectedStudentState)
  const [, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  const [selectedStudents, setSelectedStudents] = useRecoilState(
    selectedStudentsState
  )
  const [loading] = useRecoilState(isLoadState)
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={students}
          paginator
          loading={loading}
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          responsiveLayout="scroll"
          header={<TableHeader setDisplayBasic={setDisplayBasic} />}
          emptyMessage="No se encontraron Productos"
        >
          <Column
            field="Nombre"
            header="Nombre"
            body={(rowData) => rowData.name}
            alignHeader={'center'}
          />
          <Column
            field="Apellido"
            header="Apellido"
            body={(rowData) => rowData.surname}
            alignHeader={'center'}
          />
          <Column
            field="DNI"
            header="DNI"
            body={(rowData) => rowData.identificationNumber}
            alignHeader={'center'}
          />
          <Column
            field="email"
            header="email"
            body={(rowData) => rowData.email}
            alignHeader={'center'}
          />
          <Column
            field="birth"
            header="birthDate"
            body={(rowData) => parseDate(rowData.birth)}
            alignHeader={'center'}
          />
          <Column
            field="phone"
            header="Telefono"
            body={(rowData) => rowData.phone}
            alignHeader={'center'}
          />
          <Column
            field="options"
            header="Opciones"
            body={(rowData) => {
              if (isEnrollment) {
                return (
                  <div>
                    <input
                      onChange={() => {
                        if (selectedStudents.studentIds.includes(rowData.id)) {
                          const filteredArray =
                            selectedStudents.studentIds.filter(
                              (id) => id !== rowData.id
                            )
                          setSelectedStudents((prev) => {
                            return { studentIds: filteredArray }
                          })
                          return
                        }
                        setSelectedStudents((prev) => {
                          return {
                            studentIds: [...prev.studentIds, rowData.id]
                          }
                        })
                      }}
                      value={rowData.id}
                      checked={selectedStudents.studentIds.includes(rowData.id)}
                      type="checkbox"
                      name="check"
                    />
                  </div>
                )
              }
              return (
                <div>
                  <Button
                    icon="pi pi-pencil"
                    iconPos="right"
                    className="p-button-p-button-raised p-button-warning"
                    onClick={() => {
                      setSelectedStudent(rowData)
                      setShowUpdateDialog({
                        showUpdateDialog: true,
                        updateMode: UPDATE_MODES_ENUM.STUDENT_UPDATE
                      })
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    iconPos="right"
                    className="p-button-p-button-raised p-button-danger"
                    onClick={() => {
                      handleDeleteStudent(rowData.id)
                    }}
                  />
                </div>
              )
            }}
            alignHeader={'center'}
          />
        </DataTable>
      </div>
      <DialogNewStudent
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />
      <DialogUpdateStudent />
      <DialogError></DialogError>
    </div>
  )
}
export default StudentsTable
