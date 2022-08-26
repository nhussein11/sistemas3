import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { DialogNewProductProps } from '../../@types/frontend.types'
import useDialogNewProductMutation from '../../hooks/products/useDialogNewProductMutation'

import DialogFooter from './DialogFooter'

const DialogNewProduct = ({
  displayBasic,
  closeDialog
}: DialogNewProductProps) => {
  const { handleCreateNewProduct, productName, productPrice, productDescription } =
    useDialogNewProductMutation('products')
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
          <InputText {...productPrice} name="productPrice" />
          <label htmlFor="in">Price</label>
        </span>
        <span className="p-float-label">
          <InputText {...productDescription} name="productDescription" />
          <label htmlFor="in">Description</label>
        </span>
      </div>
    </Dialog>
  )
}

export default DialogNewProduct
