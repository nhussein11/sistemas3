import React from 'react'
import { Dialog } from 'primereact/dialog'
import DialogFooter from './DialogFooter'
import { Dropdown } from 'primereact/dropdown'
import { DialogNewProductProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import useDialogNewProductMutation from '../../hooks/products/useDialogNewProductMutation'

const DialogNewCourse = ({
  displayBasic,
  closeDialog
}: DialogNewProductProps) => {
  const {
    handleCreateNewProduct,
    productName,
    productPrice,
    productDescription,
    category,
    setCategory,
    CATEGORIES
  } = useDialogNewProductMutation('products')
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Producto"
      style={{ width: 'auto' }}
      footer={() => DialogFooter({ closeDialog, handleCreateNewProduct })}
      onHide={() => closeDialog()}
    >
      <div style={ { display: 'grid' } }>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">Nombre</label>
            <InputText
              {...productName}
              name="productName"
              placeholder="nombre"
            />
          </div>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">Descripción</label>
            <InputText
              {...productDescription}
              name="productDescription"
              placeholder="descripción"
            />
          </div>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">Precio</label>
            <InputText
              {...productPrice}
              name="productPrice"
              placeholder="precio"
            />
          </div>
          <div className="field-drop">
            <label htmlFor="id">Categoría</label>
            <Dropdown
              value={category}
              options={CATEGORIES}
              onChange={(e) => setCategory(e.value)}
              placeholder={'select category'}
            />
          </div>
      </div>
    </Dialog>
  )
}

export default DialogNewCourse
