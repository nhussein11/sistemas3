import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import useDialogUpdateProductMutation from '../../hooks/products/useDialogUpdateProductMutation'
import { Button } from 'primereact/button'

const DialogUpdateProduct = () => {
  const {
    handleUpdateProduct,
    productName,
    productPrice,
    showUpdateDialog,
    setShowUpdateDialog
  } = useDialogUpdateProductMutation('products')

  return (
    <Dialog
      visible={showUpdateDialog}
      header="Actualizar Producto"
      style={{ width: '50vw' }}
      onHide={() => setShowUpdateDialog(false)}
    >
      <div className="field-form-container">
        <span className="p-float-label">
          <InputText
            {...productName}
          />
          <label htmlFor="in">Nombre</label>
        </span>
        <span className="p-float-label">
          <InputText
            {...productPrice}
          />
          <label htmlFor="in">Descripcion</label>
        </span>
      </div>
      <div className="footer-button-updateDialog">
        <Button
          label="Confirmar"
          icon="pi pi-check"
          onClick={handleUpdateProduct}
          autoFocus
        />
      </div>
    </Dialog>
  )
}

export default DialogUpdateProduct
