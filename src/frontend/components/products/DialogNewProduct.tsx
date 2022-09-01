import React, { useState } from 'react'
import { CategoryEnum } from '@prisma/client'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { DialogNewProductProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import useDialogNewProductMutation from '../../hooks/products/useDialogNewProductMutation'

import DialogFooter from './DialogFooter'

const DialogNewProduct = ({
  displayBasic,
  closeDialog
}: DialogNewProductProps) => {
  const { handleCreateNewProduct, productName, productPrice, productDescription, productCategory } =
    useDialogNewProductMutation('products')
  const [category, setCategory] = useState('IMPRESORA')
  const CATEGORIES = [CategoryEnum.IMPRESORA, CategoryEnum.FILAMENTO]
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Producto"
      style={{ width: '50vw' }}
      footer={() => DialogFooter({ closeDialog, handleCreateNewProduct })}
      onHide={() => closeDialog()}
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
    </Dialog>
  )
}

export default DialogNewProduct
