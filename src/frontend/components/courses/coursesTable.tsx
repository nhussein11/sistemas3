import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import DialogError from './DialogError'
import NumberFormat from 'react-number-format'
import { CoursesTableProps } from '../../@types/frontend.types'
import TableHeader from './TableHeader'
import { useRecoilState } from 'recoil'
import {
  showUpdateDialogState,
  UPDATE_MODES_ENUM
} from '../../atoms/showUpdateDialogAtom'
import DialogNewCourse from './DialogNewCourse'
import DialogUpdateCourse from './DialogUpdateCourse'
import { selectedCourseState } from '../../atoms/courses/selectedCourseAtom'
import useDeleteCourseMutation from '../../hooks/courses/useDeleteCourseMutation'
import { isCourseCheckedState } from '../../atoms/courses/isCourseCheckedAtom'
import EnrollmentsDialog from './EnrollmentsDialog'
import { showEnrollmentsDialogState } from '../../atoms/courses/showEnrollmentsDialog'
const CoursesTable = ({ courses, isEnrollment }: CoursesTableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const { handleDeleteCourse } = useDeleteCourseMutation('course')
  const [, setSelectedCourse] = useRecoilState(selectedCourseState)
  const [isCourseChecked, setIsCourseChecked] =
    useRecoilState(isCourseCheckedState)
  const [, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  const [, setShowEnrollmentsDialog] = useRecoilState(
    showEnrollmentsDialogState
  )
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={courses}
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
            field="Descripcion"
            header="Descripcion"
            body={(rowData) => rowData.description}
            alignHeader={'center'}
          />
          <Column
            field="Precio"
            header="Precio"
            body={(rowData) => {
              return (
                <NumberFormat
                  value={rowData.price}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'$'}
                ></NumberFormat>
              )
            }}
            alignHeader={'center'}
          />
          <Column
            field="Carga Horaria"
            header="Carga Horaria"
            body={(rowData) => rowData.hoursQuantity}
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
                      onChange={() =>
                        setIsCourseChecked({
                          id: rowData.id,
                          checked: true
                        })
                      }
                      value={rowData.id}
                      checked={isCourseChecked.id === rowData.id}
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
                    className="p-button-p-button-raised p-button-danger"
                    onClick={() => {
                      handleDeleteCourse(rowData.id)
                    }}
                  />
                  <Button
                    icon="pi pi-eye"
                    iconPos="right"
                    className="p-button-p-button-raised p-button-info"
                    onClick={() => {
                      setSelectedCourse(rowData)
                      setShowEnrollmentsDialog(true)
                    }}
                  />
                </div>
              )
            }}
            alignHeader={'center'}
          />
        </DataTable>
      </div>
      <DialogNewCourse
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />
      <DialogUpdateCourse />
      <EnrollmentsDialog />

      <DialogError></DialogError>
    </div>
  )
}
export default CoursesTable
