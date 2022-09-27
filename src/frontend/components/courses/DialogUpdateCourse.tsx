import React from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { showUpdateDialogDefaultState } from '../../atoms/showUpdateDialogAtom'
import useDialogUpdateCourseMutation from '../../hooks/courses/useUpdateCourseMutation'

const DialogUpdateCourse = () => {
  const {
    handleUpateCourse,
    courseName,
    coursePrice,
    courseDescription,
    courseHours,
    showUpdateDialog,
    setShowUpdateDialog
  } = useDialogUpdateCourseMutation('courses')
  return (
    <Dialog
      visible={showUpdateDialog.showUpdateDialog}
      header="Actualizar Producto"
      style={{ width: 'auto' }}
      onHide={() => setShowUpdateDialog(showUpdateDialogDefaultState)}
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
              name="courseHours"
              placeholder="horas"
            />
          </div>
      </div>
      <div className="footer-button-updateDialog">
        <Button
          label="Guardar"
          className="p-button-raised p-button-success"
          icon="pi pi-check"
          onClick={handleUpateCourse}
          autoFocus
        />
      </div>
    </Dialog>
  )
}

export default DialogUpdateCourse
