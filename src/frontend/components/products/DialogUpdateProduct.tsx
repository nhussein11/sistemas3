import React, { useState } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import useDialogUpdateProductMutation from '../../hooks/products/useDialogUpdateProductMutation'

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
        <div className='field-form-container'>
          <div>
            <label htmlFor="id">Nombre</label>
            <InputText {...productName} name="productName" placeholder='nombre'/>
          </div>
          <div>
            <label htmlFor="id">Descripción</label>
            <InputText {...productDescription} name="productDescription" placeholder='descripción'/>
          </div>
          <div>
            <label htmlFor="id">Precio</label>
            <InputText {...productPrice} name="productPrice" placeholder='precio'/>
          </div>
        </div>
        <div className='field-drop'>
          <label htmlFor="id">Categoría</label>
          <Dropdown value={productCategory} options={CATEGORIES} onChange={(e) => setCategory(e.value)} placeholder={category}/>
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
