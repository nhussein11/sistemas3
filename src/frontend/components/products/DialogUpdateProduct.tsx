import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import useDialogUpdateProductMutation from '../../hooks/products/useDialogUpdateProductMutation'
import { Button } from 'primereact/button'

const DialogUpdateProduct = () => {
  const {
    handleUpdateProduct,
    productName,
    productPrice,
    productDescription,
    productCategory,
    showUpdateDialog,
    setShowUpdateDialog
  } = useDialogUpdateProductMutation('products')
  const [category, setCategory] = useState('IMPRESORA')
  const CATEGORIES = ['IMPRESORA', 'FILAMENTO']
  return (
    <Dialog
      visible={showUpdateDialog}
      header="Actualizar Producto"
      style={{ width: '50vw' }}
      onHide={() => setShowUpdateDialog(false)}
    >
      <div className='form-container'>
        <div className="field-form-container">
          <span className="p-float-label">
            <InputText {...productName} name="productName" />
            <label htmlFor="in">Nombre</label>
          </span>
          <Dropdown value={productCategory} options={CATEGORIES} onChange={(e) => setCategory(e.value)} placeholder={category}/>
        </div>
        <div className='field-form-container'>
          <span className="p-float-label">
            <InputText {...productDescription} name="productDescription" />
            <label htmlFor="in">Descripción</label>
          </span>
          <InputText {...productPrice} name="productPrice" />
        </div>
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
