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
import { selectedCourseState } from '../../atoms/courses/selectedCourseAtom'
import useDeleteCourseMutation from '../../hooks/courses/useDeleteCourseMutation'

const StudentsTable = ({ students }: StudentsTableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const { handleDeleteCourse } = useDeleteCourseMutation('course')
  const [, setSelectedCourse] = useRecoilState(selectedCourseState)
  const [, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={students}
          paginator
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
            field="options"
            header="Opciones"
            body={(rowData) => {
              return (
                <div>
                  <Button
                    icon="pi pi-pencil"
                    iconPos="right"
                    label="Editar"
                    className="p-button-p-button-raised p-button-warning"
                    onClick={() => {
                      setSelectedCourse(rowData)
                      setShowUpdateDialog({
                        showUpdateDialog: true,
                        updateMode: UPDATE_MODES_ENUM.COURSE_UPDATE
                      })
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    iconPos="right"
                    label="Borrar"
                    className="p-button-p-button-raised p-button-danger"
                    onClick={() => {
                      setSelectedCourse(rowData)
                      handleDeleteCourse()
                      setDisplayBasic(false)
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
