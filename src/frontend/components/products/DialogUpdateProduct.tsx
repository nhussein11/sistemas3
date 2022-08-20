import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import useDialogUpdateProductMutation from '../../hooks/products/useDialogUpdateProductMutation'

const DialogUpdateProduct = () => {
  const {
    handleUpdateProduct,
    productName,
    productPrice,
    setProductName,
    setProductPrice,
    showUpdateDialog,
    setShowUpdateDialog
  } = useDialogUpdateProductMutation('products')

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
    </Dialog> // comentario
  )
}

export default DialogUpdateProduct
