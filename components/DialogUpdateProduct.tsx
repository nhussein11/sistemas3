import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React from 'react'

import useDialogUpdateProduct from '../hooks/useDialogUpdateProduct'

const DialogUpdateProduct = () => {
  const {
    handleUpdateProduct,
    productName,
    productPrice,
    setProductName,
    setProductPrice,
    showUpdateDialog,
    setShowUpdateDialog
  } = useDialogUpdateProduct()

  return (
    <Dialog
      visible={showUpdateDialog}
      header="Nuevo Producto"
      style={{ width: '50vw' }}
      onHide={() => setShowUpdateDialog(false)}
    >
      <div className="field-form-container">
        <span className="p-float-label">
          <InputText
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label htmlFor="in">Nombre</label>
        </span>
        <span className="p-float-label">
          <InputText
            value={productPrice}
            type="number"
            onChange={(e) => setProductPrice(Number(e.target.value).valueOf())}
          />
          <label htmlFor="in">Descripcion</label>
        </span>
      </div>
      <button onClick={handleUpdateProduct}>Update</button>
    </Dialog>
  )
}

export default DialogUpdateProduct
