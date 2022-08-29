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
  const CATEGORIES = [{ name: 'IMPRESORA', code: 'IMPRESORA' }, { name: 'FILAMENTO', code: 'FILAMENTO' }]
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
          <InputText {...productDescription} name="productDescription" />
          <label htmlFor="in">Description</label>
        </span>
        <Dropdown value={productCategory} options={CATEGORIES} onChange={(e) => setCategory(e.value)} placeholder={category}/>
        <span className="p-float-label">
          <InputText
            {...productPrice}
          />
          <label htmlFor="in">Price</label>
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
