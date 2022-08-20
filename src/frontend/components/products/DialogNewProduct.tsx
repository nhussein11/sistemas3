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
  const {
    handleCreateNewProduct,
    productName,
    productPrice,
    setProductName,
    setProductPrice
  } = useDialogNewProductMutation('products')
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
    </Dialog>
  )
}

export default DialogNewProduct
