import React, { useState } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import useDialogUpdateProductMutation from '../../hooks/products/useDialogUpdateProductMutation'
import { showUpdateDialogDefaultState } from '../../atoms/showUpdateDialogAtom'

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
      visible={showUpdateDialog.showUpdateDialog}
      header="Actualizar Producto"
      style={{ width: 'auto' }}
      onHide={() => setShowUpdateDialog(showUpdateDialogDefaultState)}
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
              value={productCategory}
              options={CATEGORIES}
              onChange={(e) => setCategory(e.value)}
              placeholder={category}
            />
          </div>
      </div>
      <div className="footer-button-updateDialog">
        <Button
          label="Guardar"
          className="p-button-raised p-button-success"
          icon="pi pi-check"
          onClick={handleUpdateProduct}
          autoFocus
        />
      </div>
    </Dialog>
  )
}

export default DialogUpdateProduct
