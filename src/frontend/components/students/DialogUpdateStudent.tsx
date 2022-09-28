import React from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { showUpdateDialogDefaultState } from '../../atoms/showUpdateDialogAtom'
import useUpdateStudentMutation from '../../hooks/students/useUpdateStudentMutation'

const DialogUpdateStudent = () => {
  const {
    handleUpateStudent,
    studentName,
    studentSurname,
    studentIdentificationNumber,
    showUpdateDialog,
    setShowUpdateDialog
  } = useUpdateStudentMutation('students')
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
              {...studentName}
              name="productName"
              placeholder="nombre"
            />
          </div>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">Apellido</label>
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
      <div className="footer-button-updateDialog">
        <Button
          label="Guardar"
          className="p-button-raised p-button-success"
          icon="pi pi-check"
          onClick={handleUpateStudent}
          autoFocus
        />
      </div>
    </Dialog>
  )
}

export default DialogUpdateStudent
