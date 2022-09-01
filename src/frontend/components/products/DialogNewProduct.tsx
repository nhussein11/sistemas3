import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import React, { useState } from 'react'
import { DialogNewProductProps } from '../../@types/frontend.types'
import useDialogNewProductMutation from '../../hooks/products/useDialogNewProductMutation'
import { CategoryEnum } from '@prisma/client'

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
    </Dialog>
  )
}

export default DialogNewProduct
