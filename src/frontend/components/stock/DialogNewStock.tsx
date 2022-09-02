import React from 'react'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { DialogNewStockProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import useDialogNewStockMutation from '../../hooks/stock/useDialogNewStockMutation'
import { Store } from '@prisma/client'
import StockDialogFooter from './StockDialogFooter'

const DialogNewStock = ({ displayBasic, closeDialog }:DialogNewStockProps) => {
  const {
    handleCreateNewStock,
    quantity,
    minQuantity,
    storesQuery,
    changeStore,
    selectedStore,
    productsQuery,
    changeProduct,
    selectedProduct
  } = useDialogNewStockMutation('stocks')
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Stock"
      style={{ width: '50vw' }}
      footer={() => StockDialogFooter({ closeDialog, handleCreateNewStock })}
      onHide={() => closeDialog()}
    >
      <div className="form-container">
        <div className="field-form-container">
          <div>
            <label htmlFor="id">Cantidad</label>
            <InputText {...quantity} name="quantity" placeholder="quantity" />
          </div>
          <div>
            <label htmlFor="id">Cantidad minima</label>
            <InputText
              {...minQuantity}
              name="minQuantity"
              placeholder="minQuantity"
            />
          </div>
        </div>
        <div className="field-drop">
          <label htmlFor="id">Depositos</label>
          <Dropdown
            value={selectedStore.name}
            options={storesQuery?.data?.stores.map(
              (store: Store) => store.name
            )}
            onChange={(e) => changeStore(e.target.value)}
            placeholder="select a Store"
          />
        </div>
        <div className="field-drop">
          <label htmlFor="id">Productos</label>
          <Dropdown
            value={selectedProduct.name}
            options={productsQuery?.data?.products.map(
              (store: Store) => store.name
            )}
            onChange={(e) => changeProduct(e.target.value)}
            placeholder={'select product'}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default DialogNewStock
