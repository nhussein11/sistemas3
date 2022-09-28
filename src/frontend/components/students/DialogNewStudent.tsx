import React from 'react'
import { Dialog } from 'primereact/dialog'
import DialogFooter from './DialogFooter'
import { DialogNewCourseProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import useDialogNewCourseMutation from '../../hooks/courses/useDialogNewCourseMutation'

const DialogNewStudent = ({
  displayBasic,
  closeDialog
}: DialogNewCourseProps) => {
  const {
    handleCreateNewCourse,
    courseName,
    coursePrice,
    courseDescription,
    courseHours
  } = useDialogNewCourseMutation('courses')
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
              {...courseName}
              name="productName"
              placeholder="nombre"
            />
          </div>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">Descripción</label>
            <InputText
              {...courseDescription}
              name="productDescription"
              placeholder="descripción"
            />
          </div>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">Precio</label>
            <InputText
              {...coursePrice}
              name="productPrice"
              placeholder="precio"
            />
          </div>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">Carga Horaria</label>
            <InputText
              {...courseHours}
              name="productPrice"
              placeholder="precio"
            />
          </div>
      </div>
    </Dialog>
  )
}

export default DialogNewStudent
