import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import React, { useState } from 'react'
import { DialogNewProductProps } from '../../@types/frontend.types'
import useDialogNewProductMutation from '../../hooks/products/useDialogNewProductMutation'

import DialogFooter from './DialogFooter'

const DialogNewProduct = ({
  displayBasic,
  closeDialog
}: DialogNewProductProps) => {
  const { handleCreateNewProduct, productName, productPrice, productDescription, productCategory } =
    useDialogNewProductMutation('products')
  const [category, setCategory] = useState('IMPRESORA')
  const CATEGORIES = [{ name: 'IMPRESORA', code: 'IMPRESORA' }, { name: 'FILAMENTO', code: 'FILAMENTO' }]
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Producto"
      style={{ width: '50vw' }}
      footer={() => DialogFooter({ closeDialog, handleCreateNewProduct })}
      onHide={() => closeDialog()}
    >
      <div className="field-form-container">
        <span className="p-float-label">
          <InputText {...productName} name="productName" />
          <label htmlFor="in">Nombre</label>
        </span>
         <span className="p-float-label">
          <InputText {...productDescription} name="productDescription" />
          <label htmlFor="in">Description</label>
        </span>
        <Dropdown value={productCategory} options={CATEGORIES} onChange={(e) => setCategory(e.value)} placeholder={category}/>
        <span className="p-float-label">
          <InputText {...productPrice} name="productPrice" />
          <label htmlFor="in">Price</label>
        </span>
      </div>
    </Dialog>
  )
}

export default DialogNewProduct
