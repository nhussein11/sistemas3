import React from 'react'
import { Dialog } from 'primereact/dialog'
import DialogFooter from './DialogFooter'
import { DialogNewCourseProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import useDialogNewStudentMutation from '../../hooks/students/useDialogNewStudentMutation'

const DialogNewStudent = ({
  displayBasic,
  closeDialog
}: DialogNewCourseProps) => {
  const {
    handleCreateNewCourse,
    studentName,
    studentSurname,
    studentIdentificationNumber
  } = useDialogNewStudentMutation('students')
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Producto"
      style={{ width: 'auto' }}
      footer={() => DialogFooter({ closeDialog, handleCreateNewCourse })}
      onHide={() => closeDialog()}
    >
      <div style={ { display: 'grid' } }>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">Nombre</label>
            <InputText
              {...studentName}
              name="productName"
              placeholder="nombre"
            />
          </div>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">apellido</label>
            <InputText
              {...studentSurname}
              name="productDescription"
              placeholder="descripción"
            />
          </div>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">DNI</label>
            <InputText
              {...studentIdentificationNumber}
              name="productPrice"
              placeholder="precio"
            />
          </div>
      </div>
    </Dialog>
  )
}

export default DialogNewStudent
