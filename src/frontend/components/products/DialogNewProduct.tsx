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
          <div>
            <label htmlFor="id">Cantidad</label>
            <InputText {...productQuantity} name="productQuantity" placeholder='precio'/>
          </div>
          <div>
            <label htmlFor="id">Cantidad Mínima</label>
            <InputText {...productMinQuantity} name="productMinQuantity" placeholder='precio'/>
          </div>
          {/* COMIENZAN LOS DROPS */}
        </div>
        <div className='field-drop'>
          <div className='field-drop'>
            <label htmlFor="id">Categoría</label>
            <Dropdown value={category} options={CATEGORIES} onChange={(e) => setCategory(e.value)} placeholder={'select category'}/>
          </div>
          <div className='field-drop'>
            <label htmlFor="id">Store</label>
            <Dropdown value={selectedStore.name} options={storesQuery?.data?.stores.map((store: Store) => store.name)} onChange={(e) => changeStore(e.target.value)} placeholder="select a Store"/>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogNewProduct
