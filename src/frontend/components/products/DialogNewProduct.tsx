import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import React from 'react'
import { DialogNewProductProps } from '../../@types/frontend.types'
import useDialogNewProductMutation from '../../hooks/products/useDialogNewProductMutation'
import DialogFooter from './DialogFooter'
import { Store } from '../../../shared/schemas/store.type'

const DialogNewProduct = ({
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
    CATEGORIES,
    storesQuery,
    changeStore,
    selectedStore,
    productQuantity,
    productMinQuantity
  } = useDialogNewProductMutation('products')
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Producto"
      style={{ width: '50vw' }}
      footer={() => DialogFooter({ closeDialog, handleCreateNewProduct })}
      onHide={() => closeDialog()}
    >
      <div className="form-container">
        <div className="field-form-container">
          <span className="p-float-label">
            <InputText {...productName} name="productName" />
            <label htmlFor="in">Nombre</label>
          </span>
          <Dropdown
            value={category}
            options={CATEGORIES}
            onChange={(e) => {
              setCategory(e.value)
            }}
            placeholder={category}
          />
          <Dropdown
            value={selectedStore.name}
            options={storesQuery?.data?.stores.map(
              (store: Store) => store.name
            )}
            onChange={(e) => changeStore(e.target.value)}
            placeholder="select a Store"
          />
        </div>
        <div className="field-form-container">
          <span className="p-float-label">
            <InputText {...productDescription} name="productDescription" />
            <label htmlFor="in">Descripción</label>
          </span>
          <InputText {...productPrice} name="productPrice" />
          <InputText {...productQuantity} name="productQuantity" />
          <InputText {...productMinQuantity} name="productMinQuantity" />
        </div>
      </div>
    </Dialog>
  )
}

export default DialogNewProduct
